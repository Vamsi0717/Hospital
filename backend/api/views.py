import logging
import random
from datetime import timedelta

from django.core import signing
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from .tasks import schedule_auto_confirm

logger = logging.getLogger(__name__)

# Salt namespaces the signed token so it can't be reused for anything else
# this project might sign later; max_age (in AppointmentListCreateView.create)
# is how long a verified OTP stays usable for booking.
OTP_TOKEN_SALT = "api.otp-verification"
OTP_VALID_MINUTES = 5
OTP_TOKEN_MAX_AGE_SECONDS = 15 * 60


def _flatten_errors(error_detail):
    """Turn DRF's {field: [msg, ...]} error dict into a flat list of strings."""
    details = []
    for field, messages in error_detail.items():
        for message in messages:
            details.append(f"{field}: {message}" if field != "non_field_errors" else str(message))
    return details

from .models import Appointment, Doctor, HealthPackage, Hospital, OTPVerification
from .serializers import (
    AppointmentSerializer,
    AppointmentStatusSerializer,
    DoctorSerializer,
    HealthPackageSerializer,
    HospitalSerializer,
    OTPSendSerializer,
    OTPVerifySerializer,
)


#  Doctors
class DoctorListView(generics.ListCreateAPIView):
    """
    GET  /api/doctors/  (optional ?specialty= & ?hospital= filters) — list
    POST /api/doctors/  — create a new doctor
    """

    serializer_class = DoctorSerializer

    def get_queryset(self):
        queryset = Doctor.objects.all()
        specialty = self.request.query_params.get("specialty")
        hospital = self.request.query_params.get("hospital")

        if specialty:
            queryset = queryset.filter(specialty__iexact=specialty)
        if hospital:
            queryset = queryset.filter(hospital__iexact=hospital)

        return queryset


class DoctorDetailView(generics.RetrieveAPIView):
    """GET /api/doctors/<id>/"""

    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer


#  Hospitals 

class HospitalListView(generics.ListCreateAPIView):
    """
    GET  /api/hospitals/  (optional ?location= filter) — list
    POST /api/hospitals/  — create a new hospital
    """
    serializer_class = HospitalSerializer

    def get_queryset(self):
        queryset = Hospital.objects.all()
        location = self.request.query_params.get("location")

        if location:
            queryset = queryset.filter(location__icontains=location)

        return queryset


class HospitalDetailView(generics.RetrieveAPIView):
    """GET /api/hospitals/<id>/"""

    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer


# Health Packages 

class HealthPackageListView(generics.ListCreateAPIView):
    """
    GET  /api/health-packages/ — list
    POST /api/health-packages/ — create a new health package
    """

    queryset = HealthPackage.objects.all()
    serializer_class = HealthPackageSerializer


class HealthPackageDetailView(generics.RetrieveAPIView):
    """GET /api/health-packages/<id>/"""

    queryset = HealthPackage.objects.all()
    serializer_class = HealthPackageSerializer


# Appointments 

class AppointmentListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/appointments/  (optional ?status= filter) — list all
    POST /api/appointments/  — matches bookAppointment(data) in the frontend
    """

    serializer_class = AppointmentSerializer

    def get_queryset(self):
        queryset = Appointment.objects.all()
        status_param = self.request.query_params.get("status")

        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            return Response(
                {
                    "error": "Validation failed",
                    "details": _flatten_errors(serializer.errors),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = serializer.validated_data.get("email", "")
        otp_token = serializer.validated_data.get("otp_token", "")

        try:
            payload = signing.loads(
                otp_token, salt=OTP_TOKEN_SALT, max_age=OTP_TOKEN_MAX_AGE_SECONDS
            )
        except signing.BadSignature:
            payload = None

        if not payload or payload.get("email", "").lower() != email.lower():
            return Response(
                {
                    "error": "Validation failed",
                    "details": ["email: Please verify this email with an OTP before booking."],
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        appointment = serializer.save()

        schedule_auto_confirm(appointment.id, 10)

        return Response(
            {
                "message": "Appointment request submitted successfully!",
                "appointment": self.get_serializer(appointment).data,
            },
            status=status.HTTP_201_CREATED,
        )


class AppointmentDetailView(generics.RetrieveAPIView):
    """GET /api/appointments/<id>/"""

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class AppointmentStatusUpdateView(APIView):
    """PATCH /api/appointments/<id>/status/ — confirm/cancel an appointment"""

    def patch(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return Response(
                {"error": "Appointment not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = AppointmentStatusSerializer(
            appointment, data=request.data, partial=True
        )
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            return Response(
                {
                    "error": "Validation failed",
                    "details": _flatten_errors(serializer.errors),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()

        return Response(AppointmentSerializer(appointment).data)


# OTP verification

class OTPSendView(APIView):
    """
    POST /api/otp/send/  body: {"email": "..."}
    Generates a 6-digit code and prints it to the Django server terminal
    (no email/SMS provider needed in dev).
    """

    def post(self, request):
        serializer = OTPSendSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            return Response(
                {"error": "Validation failed", "details": _flatten_errors(serializer.errors)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = serializer.validated_data["email"]

        # Invalidate any earlier unverified codes for this email.
        OTPVerification.objects.filter(email__iexact=email, is_verified=False).delete()

        code = f"{random.randint(0, 999999):06d}"
        OTPVerification.objects.create(
            email=email,
            code=code,
            expires_at=timezone.now() + timedelta(minutes=OTP_VALID_MINUTES),
        )

        banner = "=" * 50
        print(f"\n{banner}\nOTP for {email}: {code}\n(valid for {OTP_VALID_MINUTES} minutes)\n{banner}\n")
        logger.info("OTP for %s: %s", email, code)

        return Response(
            {"message": f"OTP sent. Check the Django server terminal (valid {OTP_VALID_MINUTES} min)."},
            status=status.HTTP_200_OK,
        )


class OTPVerifyView(APIView):
    """
    POST /api/otp/verify/  body: {"email": "...", "code": "123456"}
    Returns a short-lived signed token to include as `otp_token` when
    creating the appointment.
    """

    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            return Response(
                {"error": "Validation failed", "details": _flatten_errors(serializer.errors)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = serializer.validated_data["email"]
        code = serializer.validated_data["code"]

        otp = (
            OTPVerification.objects.filter(email__iexact=email, is_verified=False)
            .order_by("-created_at")
            .first()
        )

        if not otp or otp.is_expired:
            return Response(
                {"error": "Validation failed", "details": ["code: No active OTP found. Please request a new one."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if otp.code != code:
            return Response(
                {"error": "Validation failed", "details": ["code: Incorrect OTP."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        otp.is_verified = True
        otp.save(update_fields=["is_verified"])

        token = signing.dumps({"email": email}, salt=OTP_TOKEN_SALT)

        return Response({"message": "Email verified.", "otp_token": token}, status=status.HTTP_200_OK)


# Health check

class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "ok"})
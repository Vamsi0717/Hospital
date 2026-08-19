from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from .tasks import schedule_auto_confirm

def _flatten_errors(error_detail):
    """Turn DRF's {field: [msg, ...]} error dict into a flat list of strings."""
    details = []
    for field, messages in error_detail.items():
        for message in messages:
            details.append(f"{field}: {message}" if field != "non_field_errors" else str(message))
    return details

from .models import Appointment, Doctor, HealthPackage, Hospital
from .serializers import (
    AppointmentSerializer,
    AppointmentStatusSerializer,
    DoctorSerializer,
    HealthPackageSerializer,
    HospitalSerializer,
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


# Health check

class HealthCheckView(APIView):
    def get(self, request):
        return Response({"status": "ok"})

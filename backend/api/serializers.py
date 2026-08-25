from rest_framework import serializers

from .models import Appointment, Doctor, HealthPackage, Hospital, OTPVerification


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "name", "specialty", "experience", "hospital", "image"]


class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ["id", "name", "location", "description", "image"]


class HealthPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthPackage
        fields = ["id", "name", "description", "price", "tests"]


class AppointmentSerializer(serializers.ModelSerializer):
    # Not a model field — the signed token returned by /api/otp/verify/,
    # proving the email on this booking was OTP-verified. Checked (and
    # stripped) in AppointmentListCreateView.create(), never persisted.
    otp_token = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "doctor",
            "hospital",
            "date",
            "time",
            "message",
            "status",
            "created_at",
            "otp_token",
        ]
        read_only_fields = ["id", "status", "created_at"]

    def create(self, validated_data):
        validated_data.pop("otp_token", None)
        return super().create(validated_data)


class AppointmentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ["status"]


class OTPSendSerializer(serializers.Serializer):
    email = serializers.EmailField()


class OTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6, min_length=4)
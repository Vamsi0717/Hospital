from django.contrib import admin

from .models import Appointment, Doctor, HealthPackage, Hospital, OTPVerification


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "specialty", "hospital", "experience")
    search_fields = ("name", "specialty", "hospital")


@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "location")
    search_fields = ("name", "location")


@admin.register(HealthPackage)
class HealthPackageAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price")
    search_fields = ("name",)


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "doctor", "hospital", "date", "time", "status", "created_at")
    list_filter = ("status", "hospital", "doctor")
    search_fields = ("name", "email", "phone")


@admin.register(OTPVerification)
class OTPVerificationAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "is_verified", "created_at", "expires_at")
    list_filter = ("is_verified",)
    search_fields = ("email",)
    readonly_fields = ("code", "created_at")
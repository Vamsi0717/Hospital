from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone


class Doctor(models.Model):
    name = models.CharField(max_length=150)
    specialty = models.CharField(max_length=100)
    experience = models.CharField(max_length=100, blank=True)
    hospital = models.CharField(max_length=150)
    image = models.CharField(max_length=500, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name


class Hospital(models.Model):
    name = models.CharField(max_length=150)
    location = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    image = models.CharField(max_length=500, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name


class HealthPackage(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    price = models.PositiveIntegerField()
    tests = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name


class Appointment(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        CONFIRMED = "confirmed", "Confirmed"
        CANCELLED = "cancelled", "Cancelled"

    phone_validator = RegexValidator(
        regex=r"^[0-9+\-\s()]{7,20}$",
        message="Enter a valid phone number.",
    )

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, validators=[phone_validator])
    doctor = models.CharField(max_length=150)
    hospital = models.CharField(max_length=150)
    date = models.DateField()
    time = models.TimeField()
    message = models.TextField(blank=True, default="")
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.doctor} ({self.date})"


class OTPVerification(models.Model):
    """One-time password issued to an email before it can book an appointment."""

    email = models.EmailField()
    code = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.email} - {self.code} ({'verified' if self.is_verified else 'pending'})"

    @property
    def is_expired(self):
        return timezone.now() > self.expires_at
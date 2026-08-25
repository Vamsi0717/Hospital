from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.HealthCheckView.as_view(), name="health-check"),

    path("otp/send/", views.OTPSendView.as_view(), name="otp-send"),
    path("otp/verify/", views.OTPVerifyView.as_view(), name="otp-verify"),

    path("doctors/", views.DoctorListView.as_view(), name="doctor-list"),
    path("doctors/<int:pk>/", views.DoctorDetailView.as_view(), name="doctor-detail"),

    path("hospitals/", views.HospitalListView.as_view(), name="hospital-list"),
    path("hospitals/<int:pk>/", views.HospitalDetailView.as_view(), name="hospital-detail"),

    path("health-packages/", views.HealthPackageListView.as_view(), name="health-package-list"),
    path("health-packages/<int:pk>/", views.HealthPackageDetailView.as_view(), name="health-package-detail"),

    path("appointments/", views.AppointmentListCreateView.as_view(), name="appointment-list-create"),
    path("appointments/<int:pk>/", views.AppointmentDetailView.as_view(), name="appointment-detail"),
    path("appointments/<int:pk>/status/", views.AppointmentStatusUpdateView.as_view(), name="appointment-status-update"),
]
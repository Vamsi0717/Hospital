import logging
import threading

logger = logging.getLogger(__name__)


def _auto_confirm(appointment_id):
    from django.db import close_old_connections
    from .models import Appointment

    close_old_connections()
    try:
        appointment = Appointment.objects.get(pk=appointment_id)
    except Appointment.DoesNotExist:
        return

    # Only flip if it's still pending — don't override a manual cancellation
    if appointment.status == Appointment.Status.PENDING:
        appointment.status = Appointment.Status.CONFIRMED
        appointment.save(update_fields=["status"])
        logger.info("Auto-confirmed appointment %s", appointment_id)

    close_old_connections()


def schedule_auto_confirm(appointment_id, delay_seconds=10):
    timer = threading.Timer(delay_seconds, _auto_confirm, args=[appointment_id])
    timer.daemon = True
    timer.start()
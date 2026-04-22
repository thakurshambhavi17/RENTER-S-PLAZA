from rest_framework import viewsets, permissions
from .models import Booking
from .serializers import BookingSerializer

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'owner':
            return Booking.objects.filter(property__owner=user).order_by('-created_at')
        return Booking.objects.filter(user=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

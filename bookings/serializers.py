from rest_framework import serializers
from .models import Booking
from properties.serializers import PropertySerializer
from users.serializers import UserSerializer
from properties.models import Property

class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    property_details = PropertySerializer(source='property', read_only=True)
    property_id = serializers.PrimaryKeyRelatedField(
        queryset=Property.objects.all(), source='property', write_only=True
    )

    class Meta:
        model = Booking
        fields = '__all__'

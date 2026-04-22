from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Property, SavedProperty, Review
from .serializers import PropertySerializer, SavedPropertySerializer, ReviewSerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('-created_at')
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['property_type', 'is_furnished', 'pet_friendly', 'has_parking', 'bedrooms', 'location']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['price', 'created_at']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class SavedPropertyViewSet(viewsets.ModelViewSet):
    serializer_class = SavedPropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedProperty.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        property_id = self.request.query_params.get("property")
        if property_id:
            return Review.objects.filter(property_id=property_id).order_by("-created_at")
        return Review.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

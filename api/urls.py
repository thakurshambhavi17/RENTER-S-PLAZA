from django.urls import path, include
from rest_framework.routers import DefaultRouter
from properties.views import PropertyViewSet, SavedPropertyViewSet, ReviewViewSet
from bookings.views import BookingViewSet
from users.views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'saved-properties', SavedPropertyViewSet, basename="savedproperty")
router.register(r'reviews', ReviewViewSet, basename="review")
router.register(r'bookings', BookingViewSet, basename="booking")

urlpatterns = [
    path('', include(router.urls)),
    path('users/register/', RegisterView.as_view(), name='register'),
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
<<<<<<< HEAD
]
=======
]
>>>>>>> 9e604fe0a17c65c0b9f9e7b8bd3e2163cb433000

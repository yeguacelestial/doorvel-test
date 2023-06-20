from doorvel_backend.core.api.views import ZipCodeViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'zip-code', ZipCodeViewSet, basename="zip-code")

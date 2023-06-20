from rest_framework import viewsets
from core.models import ZipCode
from core.api.serializers import ZipCodeSerializer


class ZipCodeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ZipCode.objects.all()  # Replace MyModel with your actual model name
    serializer_class = (
        ZipCodeSerializer  # Replace MyModelSerializer with your serializer class name
    )

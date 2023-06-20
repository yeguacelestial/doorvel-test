from rest_framework import serializers
from core.models import ZipCode


class ZipCodeSerializer(serializers.ReadOnlyModelSerializer):
    class Meta:
        model = ZipCode
        fields = "__all__"

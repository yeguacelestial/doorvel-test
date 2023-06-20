from rest_framework import viewsets
from rest_framework.response import Response
from core.models import ZipCode
from core.api.serializers import ZipCodeSerializer

from utils.zip_codes import filter_zip_codes, create_instance_from_df

import pandas as pd


class ZipCodeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ZipCode.objects.all()
    serializer_class = ZipCodeSerializer

    def retrieve(self, request, pk=None):
        zip_code = pk

        if ZipCode.objects.filter(zip_code=pk).exists():
            instance = ZipCode.objects.first(zip_code=pk)

        else:
            dataframe = filter_zip_codes(zip_code)
            instance = create_instance_from_df(dataframe)

        return Response(dataframe.to_dict(orient="records"))
        # serializer = self.get_serializer(instance)
        # return Response(serializer.data)


zip_code_view = ZipCodeViewSet.as_view({"get": "retrieve"})

from rest_framework import viewsets
from rest_framework.response import Response
from core.models import ZipCode, Settlement
from core.api.serializers import ZipCodeSerializer

from utils.zip_codes import filter_zip_codes, create_instance_from_df

import pandas as pd


class ZipCodeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ZipCode.objects.all()
    serializer_class = ZipCodeSerializer

    def retrieve(self, request, pk=None):
        zip_code = pk

        if ZipCode.objects.filter(zip_code=pk).exists():
            instance = ZipCode.objects.filter(zip_code=pk).first()

        else:
            dataframe = filter_zip_codes(zip_code)
            instance = create_instance_from_df(zip_code, dataframe)

        # return Response(dataframe.to_dict(orient="records"))
        serializer = self.get_serializer(instance)
        # return Response(serializer.data)
        return Response(
            {
                "zip_code": instance.zip_code,
                "locality": instance.locality,
                "federal_entity": {
                    "key": instance.federal_entity.key,
                    "name": instance.federal_entity.name,
                    "code": instance.federal_entity.code,
                },
                "municipality": {
                    "key": instance.municipality.key,
                    "name": instance.municipality.name,
                },
                "settlements": []
                # "settlements": Settlement.objects.filter(zip_code=zip_code),
            }
        )


zip_code_view = ZipCodeViewSet.as_view({"get": "retrieve"})

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

from doorvel_backend.utils.zip_codes import filter_zip_codes

import pandas as pd


class ZipCodeViewSet(ViewSet):
    def retrieve(self, request, pk=None):
        zip_code = pk
        dataframe = filter_zip_codes(zip_code)

        # TODO: Return response formatted
        return Response(dataframe)

zip_code_view = ZipCodeViewSet.as_view({"get": "retrieve"})


# def iterate_zip_codes():
#     for index, row in df.iterrows():
#         zip_code = row["d_codigo"]
#         locality = row["d_ciudad"]

#         federal_entity_key = int(row["c_tipo_asenta"])  # int
#         federal_entity_name = row["d_estado"]
#         federal_entity_code = row["c_estado"]

#         settlement_key = int(row["id_asenta_cpcons"])  # key
#         settlement_name = row["d_asenta"]
#         settlement_zone_type = row["d_zona"]

#         settlement_type_name = row["d_tipo_asenta"]

#         municipality_key = row["c_mnpio"]
#         municipality_name = row["D_mnpio"]


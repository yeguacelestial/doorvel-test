import io
import zipfile
from contextlib import closing

import pandas
import requests

from core.models import FederalEntity, SettlementType, Settlement, Municipality, ZipCode


def filter_zip_codes(zip_code: str):
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        # 'Accept-Encoding': 'gzip, deflate, br',
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://www.correosdemexico.gob.mx",
        "Connection": "keep-alive",
        "Referer": "https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/CodigoPostal_Exportar.aspx",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
    }

    data = {
        "__EVENTTARGET": "",
        "__EVENTARGUMENT": "",
        "__LASTFOCUS": "",
        "__VIEWSTATE": "/wEPDwUINzcwOTQyOTgPZBYCAgEPZBYCAgEPZBYGAgMPDxYCHgRUZXh0BTjDmmx0aW1hIEFjdHVhbGl6YWNpw7NuIGRlIEluZm9ybWFjacOzbjogSnVuaW8gMTggZGUgMjAyM2RkAgcPEA8WBh4NRGF0YVRleHRGaWVsZAUDRWRvHg5EYXRhVmFsdWVGaWVsZAUFSWRFZG8eC18hRGF0YUJvdW5kZ2QQFSEjLS0tLS0tLS0tLSBUICBvICBkICBvICBzIC0tLS0tLS0tLS0OQWd1YXNjYWxpZW50ZXMPQmFqYSBDYWxpZm9ybmlhE0JhamEgQ2FsaWZvcm5pYSBTdXIIQ2FtcGVjaGUUQ29haHVpbGEgZGUgWmFyYWdvemEGQ29saW1hB0NoaWFwYXMJQ2hpaHVhaHVhEUNpdWRhZCBkZSBNw6l4aWNvB0R1cmFuZ28KR3VhbmFqdWF0bwhHdWVycmVybwdIaWRhbGdvB0phbGlzY28HTcOpeGljbxRNaWNob2Fjw6FuIGRlIE9jYW1wbwdNb3JlbG9zB05heWFyaXQLTnVldm8gTGXDs24GT2F4YWNhBlB1ZWJsYQpRdWVyw6l0YXJvDFF1aW50YW5hIFJvbxBTYW4gTHVpcyBQb3Rvc8OtB1NpbmFsb2EGU29ub3JhB1RhYmFzY28KVGFtYXVsaXBhcwhUbGF4Y2FsYR9WZXJhY3J1eiBkZSBJZ25hY2lvIGRlIGxhIExsYXZlCFl1Y2F0w6FuCVphY2F0ZWNhcxUhAjAwAjAxAjAyAjAzAjA0AjA1AjA2AjA3AjA4AjA5AjEwAjExAjEyAjEzAjE0AjE1AjE2AjE3AjE4AjE5AjIwAjIxAjIyAjIzAjI0AjI1AjI2AjI3AjI4AjI5AjMwAjMxAjMyFCsDIWdnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2RkAh0PPCsACwBkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBQtidG5EZXNjYXJnYTFfWfoHDXec6ulGQrt6SL9el36z",
        "__VIEWSTATEGENERATOR": "BE1A6D2E",
        "__EVENTVALIDATION": "/wEWKALmpYrfAgLG/OLvBgLWk4iCCgLWk4SCCgLWk4CCCgLWk7yCCgLWk7iCCgLWk7SCCgLWk7CCCgLWk6yCCgLWk+iBCgLWk+SBCgLJk4iCCgLJk4SCCgLJk4CCCgLJk7yCCgLJk7iCCgLJk7SCCgLJk7CCCgLJk6yCCgLJk+iBCgLJk+SBCgLIk4iCCgLIk4SCCgLIk4CCCgLIk7yCCgLIk7iCCgLIk7SCCgLIk7CCCgLIk6yCCgLIk+iBCgLIk+SBCgLLk4iCCgLLk4SCCgLLk4CCCgLL+uTWBALa4Za4AgK+qOyRAQLI56b6CwL1/KjtBbMVuBj3gDOa7NMDNA0AmKMaTED4",
        "cboEdo": "00",
        "rblTipo": "txt",
        "btnDescarga.x": "61",
        "btnDescarga.y": "9",
    }

    print("[*] Downloading file...")
    response = requests.post(
        "https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/CodigoPostal_Exportar.aspx",
        headers=headers,
        data=data,
    )

    print("[*] Reading text file from ZIP...")
    with closing(response), zipfile.ZipFile(io.BytesIO(response.content)) as archive:
        txt_file = archive.read(archive.infolist()[0])

        txt_file = txt_file.decode("latin-1")
        csv_tables = txt_file[245:]

        csvStringIO = io.StringIO(csv_tables)

        print("[*] Text to dataframe...")
        df = pandas.read_csv(csvStringIO, sep="|", header=None, low_memory=False)

    # first row as columns
    df = df.rename(columns=df.iloc[0])

    # remove header row
    df = df.drop(df.index[0])
    df = df.fillna("")

    print(f"[*] Filter records with zip code {zip_code}")
    filtered_df = df[df["d_codigo"].values == zip_code]

    print(filtered_df.to_string())

    return filtered_df


def create_instance_from_df(zip_code, dataframe):
    # Iterate and create ZipĆode instances
    for index, row in dataframe.iterrows():
        zip_code = row["d_codigo"]
        locality = row["d_ciudad"]

        federal_entity_key = int(row["c_tipo_asenta"])  # int
        federal_entity_name = row["d_estado"]
        federal_entity_code = row["c_estado"]
        federal_entity = FederalEntity.objects.get_or_create(
            key=federal_entity_key, name=federal_entity_name, code=federal_entity_code
        )[0]

        settlement_type_name = row["d_tipo_asenta"]
        settlement_type = SettlementType.objects.get_or_create(
            name=settlement_type_name
        )[0]

        settlement_key = int(row["id_asenta_cpcons"])  # int
        settlement_name = row["d_asenta"]
        settlement_zone_type = row["d_zona"]
        settlements = Settlement.objects.get_or_create(
            key=settlement_key,
            name=settlement_name,
            zone_type=settlement_zone_type,
            _type=settlement_type,
        )

        municipality_key = row["c_mnpio"]
        municipality_name = row["D_mnpio"]
        municipality = Municipality.objects.get_or_create(
            key=municipality_key, name=municipality_name
        )[0]

        ZipCode.objects.get_or_create(
            zip_code=zip_code,
            locality=locality,
            federal_entity=federal_entity,
            # settlements=Settlement.objects.filter(key=settlement_key)[0],
            municipality=municipality,
        )

    return ZipCode.objects.filter(zip_code=zip_code).first()

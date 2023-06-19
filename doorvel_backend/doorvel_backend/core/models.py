from django.db import models


class FederalEntity(models.Model):
    key = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, null=False, default="")
    code = models.CharField(max_length=255, null=False, default="")


class SettlementType(models.Model):
    key = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, null=False, default="")
    zone_type = models.CharField(max_length=255, null=False, default="")


class Settlement(models.Model):
    key = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, null=False, default="")
    zone_type = models.CharField(max_length=255, null=False, default="")


class Municipality(models.Model):
    key = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, null=False, default="")


class ZipCode(models.Model):
    zip_code = models.CharField(
        primary_key=True, max_length=255, null=False, default=""
    )
    locality = models.CharField(max_length=255, null=False, default="")
    federal_entity = models.ForeignKey(FederalEntity, on_delete=models.CASCADE)
    settlements = models.ManyToManyField(Settlement)
    municipality = models.ForeignKey(Municipality, on_delete=models.CASCADE)

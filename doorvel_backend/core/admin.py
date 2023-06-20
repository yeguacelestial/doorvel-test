from django.contrib import admin

from core.models import FederalEntity, SettlementType, Settlement, Municipality, ZipCode

admin.site.register(FederalEntity)
admin.site.register(SettlementType)
admin.site.register(Settlement)
admin.site.register(Municipality)
admin.site.register(ZipCode)

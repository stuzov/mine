from django.contrib import admin
from .models import DumpTruckModel, DumpTruck, OreStorage, OreCargoTruckRoute


@admin.register(DumpTruckModel)
class DumpTruckModelAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "tonnage",
    )


@admin.register(DumpTruck)
class DumpTruckAdmin(admin.ModelAdmin):
    list_display = (
        "model",
        "board_number",
    )
    list_filter = ("model",)


@admin.register(OreStorage)
class OreStorageAdmin(admin.ModelAdmin):
    list_display = ("name", "payload", "sio2_substance", "fe_substance")


@admin.register(OreCargoTruckRoute)
class OreCargoTruckRouteAdmin(admin.ModelAdmin):
    list_display = (
        "truck",
        "discharge_x",
        "discharge_y",
        "discharge_datetime",
        "target_storage",
        "payload",
        "sio2_substance",
        "fe_substance",
    )

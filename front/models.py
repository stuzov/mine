from shapely.wkt import loads
from shapely.geometry import Polygon, Point
from django.utils import timezone
from django.db import models


class DumpTruckModel(models.Model):
    """
    Модель самосвала
    """

    name = models.CharField(
        "Название модели", max_length=250, default="Модель 1"
    )

    tonnage = models.PositiveSmallIntegerField(
        "Грузоподъёмность (т)", default=100
    )

    class Meta:
        app_label = "front"
        verbose_name = "Модель самосвала"
        verbose_name_plural = "Модели самосвалов"

    def __str__(self):
        return f"{self.name} - {self.tonnage}"


DEFAULT_DT_MODEL_ID = 1


class DumpTruck(models.Model):
    """
    Самосвал
    """

    model = models.ForeignKey(
        DumpTruckModel, default=DEFAULT_DT_MODEL_ID, on_delete=models.CASCADE
    )
    board_number = models.CharField(
        "Бортовой номер", max_length=50, default="100"
    )

    class Meta:
        app_label = "front"
        verbose_name = "Самосвал"
        verbose_name_plural = "Самосвалы"

    def __str__(self):
        return f"{self.board_number} ({self.model.name})"


class OreCargoMixin(models.Model):

    payload = models.PositiveSmallIntegerField("Загрузка (т)", default=0)
    sio2_substance = models.PositiveSmallIntegerField(
        "Cодержание кремния (%)", default=40
    )
    fe_substance = models.PositiveSmallIntegerField(
        "Cодержание железа (%)",
    )

    class Meta:
        abstract = True


class OreStorage(OreCargoMixin):
    """
    Склад с рудой
    """

    name = models.CharField(
        "Название склада", max_length=250, default="Склад 1"
    )
    geometry = models.TextField("Геометрия склада в формате WKT")

    class Meta:
        app_label = "front"
        verbose_name = "Склад"
        verbose_name_plural = "Склады"

    def __str__(self):
        return self.name

    def calc_ore_composition(self, route):
        """Считаем состав руды  на складе после разгрузки"""
        weight_sio2_route = route.payload * route.sio2_substance / 100
        weight_fe_route = route.payload * route.fe_substance / 100

        weight_sio2_storage = self.payload * self.sio2_substance / 100
        weight_fe_storage = self.payload * self.fe_substance / 100

        total_weight = self.payload + route.payload

        result_weigh_sio2 = weight_sio2_storage + weight_sio2_route
        result_weigh_fe = weight_fe_storage + weight_fe_route

        self.sio2_substance = result_weigh_sio2 * 100 / total_weight
        self.fe_substance = result_weigh_fe * 100 / total_weight
        self.payload = total_weight
        self.save()

        return


DEFAULT_TRUCK_ID = 1
DEFAULT_ORE_STORAGE_ID = 1


class OreCargoTruckRoute(OreCargoMixin):
    """
    Рейс c грузом руды
    """

    truck = models.ForeignKey(
        DumpTruck,
        verbose_name="Самосвал",
        default=DEFAULT_TRUCK_ID,
        on_delete=models.CASCADE,
    )

    discharge_x = models.PositiveSmallIntegerField(
        "Х координата разгрузки", null=True, blank=True
    )
    discharge_y = models.PositiveSmallIntegerField(
        "Y координата разгрузки", null=True, blank=True
    )
    discharge_datetime = models.DateTimeField(
        "Дата и время разгрузки", null=True, blank=True
    )
    target_storage = models.ForeignKey(
        OreStorage,
        verbose_name="Целевой склад",
        default=DEFAULT_ORE_STORAGE_ID,
        on_delete=models.CASCADE,
    )

    class Meta:
        app_label = "front"
        verbose_name = "Рейс с грузом руды"
        verbose_name_plural = "Рейсы с грузом руды"

    def __str__(self):
        return f"{self.truck.board_number} ({self.truck.model.name})"

    def get_overload(self):
        overload = 100 - self.payload * 100 / self.truck.model.tonnage
        if overload <= 0:
            return None
        return round(overload, 2)

    def is_hit_to_target(self):
        """Проверяем, попала ли разгрузка в полигон"""
        poly: Polygon = loads(self.target_storage.geometry)
        point: Point = Point(self.discharge_x, self.discharge_y)
        return poly.contains(point)

    def do_dump(self, x, y):
        """Расчёт процесса разгрузки"""
        print("Dumping")
        self.discharge_datetime = timezone.now()
        self.discharge_x = x
        self.discharge_y = y
        self.save()

        if self.is_hit_to_target():
            self.target_storage.calc_ore_composition(self)
            return True
        else:
            return False

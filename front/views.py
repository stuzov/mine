from django.views.generic import TemplateView, RedirectView
from django.shortcuts import get_object_or_404
from front.models import OreCargoTruckRoute, OreStorage
from django.contrib import messages

from django import http


class IndexView(TemplateView):
    """ """

    template_name = "index.html"

    def get(self, request, *args, **kwargs):

        context = self.get_context_data(**kwargs)
        context["routes"] = OreCargoTruckRoute.objects.all().select_related(
            "truck"
        )
        context["storage"] = OreStorage.objects.all()[0]
        context["success_dump"] = request.GET.get("success")

        return self.render_to_response(context)


class DumpingView(TemplateView):
    """ """

    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        return http.HttpResponseNotAllowed

    def post(self, request, *args, **kwargs):
        """По идее надо использовать Django forms для обработки и валидации post данных
        Но сечайс это опустим ;)
        """
        coords = request.POST.get("coords")
        route = get_object_or_404(OreCargoTruckRoute, pk=kwargs.get("routeid"))
        x, y = coords.split()
        if route.do_dump(int(x), int(y)):
            messages.add_message(
                request,
                messages.INFO,
                f"Разгрузка #{route.truck.board_number} попала в полигон.",
            )
            success = "?success=1"
        else:
            messages.add_message(
                request,
                messages.INFO,
                f"Разгрузка #{route.truck.board_number} не попала в полигон.",
            )
            success = ""
        return http.HttpResponseRedirect(f"/{success}")

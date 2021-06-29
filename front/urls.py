"""avtogid URL Configuration
"""

from django.urls import path, include
from .views import *

urlpatterns = [

    path('', IndexView.as_view(), name='main'),
    path('duming/', IndexView.as_view(), name='main'),
    path('dumping/<int:routeid>/', DumpingView.as_view(), name='dumping'),


]



from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('scan/', views.capture_packet, name='capture_packet'),
    ]
    #  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

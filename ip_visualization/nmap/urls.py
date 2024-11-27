from django.urls import path
from . import views
app_name = 'nmap'  # Add this line at the top of the file

urlpatterns = [
    path('', views.index, name='nmap_home'),
    path('scan/', views.scan, name='scan'),
]

from django.urls import path
from . import views

urlpatterns = [
    path('', views.password_generator_view, name='password_generator'),
]

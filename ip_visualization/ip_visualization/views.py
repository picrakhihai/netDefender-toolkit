# ip_visualization/views.py
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')  # Make sure you have home.html in your templates directory

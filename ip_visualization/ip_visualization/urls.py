from django.contrib import admin
from django.urls import path, include
from . import views  # Import views from the current app
from django.conf import settings  # Import settings
from django.conf.urls.static import static  # Import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),  # This will show the home page at root
    path('scanner/', include('scanner.urls')),
    path('password_generator/', include('password_generator.urls')),  # Point to Password Generator app
    path('nmap/', include('nmap.urls')),  # Include the nmap app URLs
    # path('my_ip_visualization/', include('my_ip_visualization.urls')),  # Include the app's URL
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # Serve static files

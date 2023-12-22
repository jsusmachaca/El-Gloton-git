from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.home.urls')),
    path('user/', include('apps.dashboard.urls')),
    path('authentication/', include('apps.authentication.urls')),
    path('panel/', include('apps.administration.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "El Glotón"
admin.site.site_title = "El Glotón"
admin.site.index_title = 'Bienvenido a "El Glotón"'
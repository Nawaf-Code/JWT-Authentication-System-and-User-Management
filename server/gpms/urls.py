from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/jwt/create', TemplateView.as_view(template_name='index.html')),
    path('', include('accounts.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
]

#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
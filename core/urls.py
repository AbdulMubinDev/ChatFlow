from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.CustomLoginView.as_view(), name='login'),
    path('register/', views.CustomSignupView.as_view(), name='register'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('rooms/<slug:room_code>/', views.room_detail, name='room_detail'),
    path('logout/', views.logout_view, name='logout'),
]
"""visual_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from visual_web.views import *
from visual_web.getPageData import *

urlpatterns = [
    # 登录及页面跳转
    path('', login),
    path('login/', checkUser),
    path('index/', index),

    # api接口
    path('api1/', api1),
    path('api2/', api2),
    path('api3/', api3),
    path('api4/', api4),
    path('api5/', api5),
    path('api6/', api6),
    path('api7/', api7),
    path('api8/', api8),
]



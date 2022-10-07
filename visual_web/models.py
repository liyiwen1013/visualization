# from django.db import models

# Create your models here.

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AreaChina(models.Model):
    code = models.CharField(primary_key=True, max_length=10)
    parentcode = models.CharField(db_column='parentCode', max_length=10, blank=True, null=True)  # Field name made lowercase.
    level = models.CharField(max_length=1, blank=True, null=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'area_china'


class CovidData(models.Model):
    province_code = models.CharField(max_length=20, blank=True, null=True)
    province_name = models.CharField(max_length=255, blank=True, null=True)
    city_code = models.CharField(max_length=20, blank=True, null=True)
    city_name = models.CharField(max_length=255, blank=True, null=True)
    confirmed_add = models.IntegerField()
    confirmed_count = models.IntegerField(blank=True, null=True)
    cured_count = models.IntegerField(blank=True, null=True)
    dead_count = models.IntegerField(blank=True, null=True)
    update_time = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'covid_data'


class MigrateData(models.Model):
    source_province_code = models.CharField(max_length=20, blank=True, null=True)
    source_province_name = models.CharField(max_length=255, blank=True, null=True)
    target_province_code = models.CharField(max_length=20, blank=True, null=True)
    target_province_name = models.CharField(max_length=255, blank=True, null=True)
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'migrate_data'


class NewsInfo(models.Model):
    publish_time = models.DateTimeField(blank=True, null=True)
    news_title = models.CharField(max_length=1000, blank=True, null=True)
    news_summary = models.CharField(max_length=2000, blank=True, null=True)
    news_source = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'news_info'


class UserInfo(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_info'

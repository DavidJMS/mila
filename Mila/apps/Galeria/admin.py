from django.contrib import admin
from .models import *

class ImageAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')

# Register your models here.
admin.site.register(Image)
admin.site.register(Category)
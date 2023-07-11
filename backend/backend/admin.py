from django.contrib import admin
from .models import Artist


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ['name', 'correct_answer', 'incorrect_answer']
    search_fields = ['name']

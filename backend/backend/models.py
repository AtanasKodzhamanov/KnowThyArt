from django.db import models

from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=200, blank=True, default="")
    img_1 = models.URLField(max_length=200, blank=True, default="")
    img_2 = models.URLField(max_length=200, blank=True, default="")
    img_3 = models.URLField(max_length=200, blank=True, default="")
    story = models.TextField(blank=True, default="")
    artist_painting_1 = models.URLField(max_length=200, blank=True, default="")
    artist_painting_2 = models.URLField(max_length=200, blank=True, default="")
    artist_painting_3 = models.URLField(max_length=200, blank=True, default="")
    artist_painting_1_title = models.CharField(
        max_length=200, blank=True, default="")
    artist_painting_2_title = models.CharField(
        max_length=200, blank=True, default="")
    artist_painting_3_title = models.CharField(
        max_length=200, blank=True, default="")
    correct_answer = models.IntegerField(default=0)
    incorrect_answer = models.IntegerField(default=0)

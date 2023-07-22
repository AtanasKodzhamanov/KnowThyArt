from django.db import models

from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=200, blank=True, default="")
    img_1 = models.URLField(max_length=200, blank=True, default="")
    img_2 = models.URLField(max_length=200, blank=True, default="")
    img_3 = models.URLField(max_length=200, blank=True, default="")
    portrait = models.URLField(max_length=200, blank=True, default="")
    famous_work = models.CharField(max_length=200, blank=True, default="")
    story = models.TextField(blank=True, default="")
    correct_answer = models.IntegerField(default=2)
    incorrect_answer = models.IntegerField(default=5)

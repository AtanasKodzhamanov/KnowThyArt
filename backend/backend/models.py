from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=200)
    img_1 = models.URLField(max_length=200)
    img_2 = models.URLField(max_length=200)
    img_3 = models.URLField(max_length=200)
    story = models.TextField()
    artist_painting_1 = models.URLField(max_length=200)
    artist_painting_2 = models.URLField(max_length=200)
    artist_painting_3 = models.URLField(max_length=200)
    artist_painting_1_title = models.CharField(max_length=200)
    artist_painting_2_title = models.CharField(max_length=200)
    artist_painting_3_title = models.CharField(max_length=200)
    correct_answer = models.IntegerField(default=0)
    incorrect_answer = models.IntegerField(default=0)

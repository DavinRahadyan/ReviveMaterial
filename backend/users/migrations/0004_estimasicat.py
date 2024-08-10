# Generated by Django 5.0.6 on 2024-06-02 07:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_estimasidinding'),
    ]

    operations = [
        migrations.CreateModel(
            name='EstimasiCat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('length', models.FloatField()),
                ('width', models.FloatField()),
                ('doorSize', models.FloatField()),
                ('windowsSize', models.FloatField()),
                ('pricePerLiter', models.FloatField()),
                ('color', models.CharField(max_length=50)),
                ('qty', models.IntegerField()),
                ('price', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

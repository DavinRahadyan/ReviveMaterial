from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token
from .models import EstimasiLantai, EstimasiSemenLantai, EstimasiPondasi, EstimasiDinding, EstimasiCat

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone=validated_data['phone']
        )
        Token.objects.create(user=user)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class EstimasiLantaiSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstimasiLantai
        fields = ['id', 'length', 'width', 'type', 'tileSize', 'pricePerPak', 'qty', 'price', 'created_at']

class EstimasiSemenLantaiSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstimasiSemenLantai
        fields = ['id', 'length', 'width', 'weight', 'qty', 'price', 'created_at']

class EstimasiPondasiSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstimasiPondasi
        fields = ['id', 'length', 'width', 'weight', 'qty', 'price', 'created_at']


class EstimasiDindingSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstimasiDinding
        fields = ['id', 'length', 'width', 'type', 'tileSize', 'pricePerPak', 'qty', 'price', 'created_at']

class EstimasiCatSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstimasiCat
        fields = ['id', 'length', 'width', 'doorSize', 'windowsSize', 'pricePerLiter', 'color', 'qty', 'price', 'created_at']


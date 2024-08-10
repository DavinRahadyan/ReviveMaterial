from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import User, EstimasiLantai, EstimasiSemenLantai, EstimasiLantai, EstimasiPondasi, EstimasiDinding, EstimasiCat
from .serializers import UserSerializer, LoginSerializer, EstimasiLantaiSerializer, EstimasiSemenLantaiSerializer, EstimasiPondasiSerializer, EstimasiDindingSerializer, EstimasiCatSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class SaveEstimasiLantai(generics.CreateAPIView):
    queryset = EstimasiLantai.objects.all()
    serializer_class = EstimasiLantaiSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ListEstimasiLantai(generics.ListAPIView):
    serializer_class = EstimasiLantaiSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return EstimasiLantai.objects.filter(user=self.request.user)

class DeleteEstimasiLantai(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id, format=None):
        try:
            estimasi = EstimasiLantai.objects.get(id=id, user=request.user)
            estimasi.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except EstimasiLantai.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class SaveEstimasiSemenLantai(generics.CreateAPIView):
    queryset = EstimasiSemenLantai.objects.all()
    serializer_class = EstimasiSemenLantaiSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ListEstimasiSemenLantai(generics.ListAPIView):
    serializer_class = EstimasiSemenLantaiSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return EstimasiSemenLantai.objects.filter(user=self.request.user)

class DeleteEstimasiSemenLantai(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id, format=None):
        try:
            estimasi = EstimasiSemenLantai.objects.get(id=id, user=request.user)
            estimasi.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except EstimasiSemenLantai.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class SaveEstimasiPondasi(generics.CreateAPIView):
    queryset = EstimasiPondasi.objects.all()
    serializer_class = EstimasiPondasiSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ListEstimasiPondasi(generics.ListAPIView):
    serializer_class = EstimasiPondasiSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return EstimasiPondasi.objects.filter(user=self.request.user)

class DeleteEstimasiPondasi(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id, format=None):
        try:
            estimasi = EstimasiPondasi.objects.get(id=id)
            estimasi.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except EstimasiPondasi.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class SaveEstimasiDinding(generics.CreateAPIView):
    queryset = EstimasiDinding.objects.all()
    serializer_class = EstimasiDindingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ListEstimasiDinding(generics.ListAPIView):
    serializer_class = EstimasiDindingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return EstimasiDinding.objects.filter(user=self.request.user)

class DeleteEstimasiDinding(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id, format=None):
        try:
            estimasi = EstimasiDinding.objects.get(id=id)
            estimasi.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except EstimasiDinding.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class SaveEstimasiCat(generics.CreateAPIView):
    queryset = EstimasiCat.objects.all()
    serializer_class = EstimasiCatSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ListEstimasiCat(generics.ListAPIView):
    serializer_class = EstimasiCatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return EstimasiCat.objects.filter(user=self.request.user)

class DeleteEstimasiCat(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id, format=None):
        try:
            estimasi = EstimasiCat.objects.get(id=id, user=request.user)
            estimasi.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except EstimasiCat.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
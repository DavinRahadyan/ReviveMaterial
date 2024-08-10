from django.urls import path
from .views import UserCreate, LoginView, UserList, SaveEstimasiLantai, ListEstimasiLantai, SaveEstimasiSemenLantai, ListEstimasiSemenLantai, DeleteEstimasiSemenLantai, DeleteEstimasiLantai, SaveEstimasiPondasi, ListEstimasiPondasi, DeleteEstimasiPondasi, SaveEstimasiDinding, ListEstimasiDinding, DeleteEstimasiDinding, SaveEstimasiCat, ListEstimasiCat, DeleteEstimasiCat

urlpatterns = [
    path('register/', UserCreate.as_view(), name='user-create'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UserList.as_view(), name='user-list'),
    path('save_estimasi_lantai/', SaveEstimasiLantai.as_view(), name='save-estimasi-lantai'),
    path('list_estimasi_lantai/', ListEstimasiLantai.as_view(), name='list-estimasi-lantai'),
    path('delete_estimasi_lantai/<int:id>/', DeleteEstimasiLantai.as_view(), name='delete-estimasi-lantai'),
    path('save_estimasi_semen_lantai/', SaveEstimasiSemenLantai.as_view(), name='save-estimasi-semen-lantai'),
    path('list_estimasi_semen_lantai/', ListEstimasiSemenLantai.as_view(), name='list-estimasi-semen-lantai'),
    path('delete_estimasi_semen_lantai/<int:id>/', DeleteEstimasiSemenLantai.as_view(), name='delete_estimasi_semen_lantai'),
    path('save_estimasi_pondasi/', SaveEstimasiPondasi.as_view(), name='save-estimasi-pondasi'),
    path('list_estimasi_pondasi/', ListEstimasiPondasi.as_view(), name='list-estimasi-pondasi'),
    path('delete_estimasi_pondasi/<int:id>/', DeleteEstimasiPondasi.as_view(), name='delete-estimasi-pondasi'),
    path('save_estimasi_dinding/', SaveEstimasiDinding.as_view(), name='save-estimasi-dinding'),
    path('list_estimasi_dinding/', ListEstimasiDinding.as_view(), name='list-estimasi-dinding'),
    path('delete_estimasi_dinding/<int:id>/', DeleteEstimasiDinding.as_view(), name='delete-estimasi-dinding'),
    path('save_estimasi_cat/', SaveEstimasiCat.as_view(), name='save-estimasi-cat'),
    path('list_estimasi_cat/', ListEstimasiCat.as_view(), name='list-estimasi-cat'),
    path('delete_estimasi_cat/<int:id>/', DeleteEstimasiCat.as_view(), name='delete-estimasi-cat'),
]

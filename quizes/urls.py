from django.urls import path
from .views import (
    QuizListView,
    quiz_view,
    quiz_data_view
)


urlpatterns = [
    path('',QuizListView.as_view(),name="main-view"),
    path('<int:pk>/',quiz_view,name="quiz-view"),
    path('<int:pk>/data/',quiz_data_view,name="quiz-data-view"),
]

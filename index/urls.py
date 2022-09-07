from django.urls import path
from index import views

urlpatterns = [
    path('login/', views.login),
    path('register/', views.register),
    path('getUserInfo/', views.get_user_info),
    path('uploadAlbum/', views.upload_album),
    path('getAllAlbum/', views.get_all_album),
    path('addCollection/', views.add_collection),
    path('delCollection/', views.delete_collection),
    path('getCollection/', views.get_collection),
    path('getUploadAlbum/', views.get_upload_album),
    path('updateAlbum/', views.update_album),
    path('getAnAlbum/', views.get_an_album),
    path('sendComment/', views.send_comment),
    path('getComments/', views.get_comments),
    path('updateCommentLike/', views.update_comment_like),
    path('replyCommit/', views.reply_comment),
    path('updateTrackDuration/', views.update_track_duration),
    path('getTrackLastPlayTime/', views.get_track_last_play_time),
    path('updateTrackLastPlayTime/', views.update_track_last_play_time),
    path('getAuthCode/', views.send_sms_code),
    path('updatePassword/', views.update_password)
]

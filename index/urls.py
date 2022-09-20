from django.urls import path
from index import views

urlpatterns = [
    # 用户的登录注册url
    path('login/', views.login),
    path('register/', views.register),
    path('getUserInfo/', views.get_user_info),
    path('getAuthCode/', views.send_sms_code),
    path('updatePassword/', views.update_password),
    # 专辑相关url
    path('uploadAlbum/', views.upload_album),
    path('getAllAlbum/', views.get_all_album),
    path('getAllAlbumName/', views.get_all_album_name),
    path('getUploadAlbum/', views.get_upload_album),
    path('updateAlbum/', views.update_album),
    path('getAnAlbum/', views.get_an_album),
    path('isAlbumGetInfo/', views.is_album_get_info),
    path('setAlbumGetState/', views.set_album_get_state),
    # 收藏相关url
    path('addCollection/', views.add_collection),
    path('delCollection/', views.delete_collection),
    path('getCollection/', views.get_collection),
    # 评论相关url
    path('sendComment/', views.send_comment),
    path('getComments/', views.get_comments),
    path('updateCommentLike/', views.update_comment_like),
    path('updateReplyLike/', views.update_reply_like),
    path('replyCommit/', views.reply_comment),
    # 歌曲相关url
    path('getTracks/', views.get_tracks),
    path('updateTrack/', views.update_track),
    path('getTrackLastPlayTime/', views.get_track_last_play_time),
    path('updateTrackLastPlayTime/', views.update_track_last_play_time),
    path('updateTrackMusicUrl/', views.update_track_music_url),
    # 歌手相关url
    path('getAllArtist/', views.get_all_artist),
]

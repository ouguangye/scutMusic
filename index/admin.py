from django.contrib import admin
from index.models import UserInfo, Album, Track, Artist, Collection, Comment, Reply

title = '华工静听'

admin.site.site_header = title  # 设置header
admin.site.site_title = title   # 设置title
admin.site.index_title = title


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ['albumName', 'artist', 'uploader', 'latestPlayTime', 'intro', 'uploadState']
    list_display_links = ['albumName']
    search_fields = ['albumName']
    list_editable = ['uploadState']
    list_filter = ['uploadState']


admin.site.register([UserInfo, Track, Artist, Collection, Comment, Reply])

import random
from django.db.models import Max
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from index.models import UserInfo, Artist, Album, Track, Collection, Comment, Reply
from django.utils import timezone
from django.core.mail import send_mail


'''
    用户的登录、注册、获取用户信息
'''


@require_http_methods(["POST"])
def login(request):
    response = {}
    try:
        username = request.GET.get('username')
        password = request.GET.get('password')
        print(username, password)

        user = UserInfo.objects.filter(username=username, password=password)
        if not user:
            response['msg'] = 'Account and password are incorrect.'
            response['err_num'] = 0
        else:
            user = list(user.values())[0]

            # token = request.META.get('HTTP_AUTHORIZATION')
            # if not token:
            #     token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

            response['result'] = {'userId': user.get('id'), 'username': user.get('username'),
                                  "avatarImage": user.get('avatarImage')}
            response['msg'] = 'success'
            response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
    print(response)
    return JsonResponse(response)


@require_http_methods(["GET"])
def get_user_info(request):
    response = {}
    try:
        token = request.GET.get('token')
        user = UserInfo.objects.get(username=token)
        response['result'] = {'userId': user.id, 'username': user.username,
                              "avatarImage": user.avatarImage}
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
    # print(response)
    return JsonResponse(response)


@require_http_methods(["POST"])
def register(request):
    response = {}
    try:
        username = request.GET.get('username')

        user = UserInfo.objects.filter(username=username)
        if user:
            response['msg'] = '该用户名已经被注册过了！！！ 请更换用户名'
            response['err_num'] = 2
            return JsonResponse(response)

        password = request.GET.get('password')
        email = request.GET.get('email')
        avatar_image = request.GET.get('avatarImage')
        UserInfo.objects.create(username=username, password=password, email=email, avatarImage=avatar_image)
        response['msg'] = 'success'
        response['err_num'] = 0

    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1

    return JsonResponse(response)


@require_http_methods(["POST"])
def update_password(request):
    response = {}
    try:
        username = request.GET.get('username')
        password = request.GET.get('password')
        user_object = UserInfo.objects.get(username=username)
        user_object.password = password
        user_object.save()
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


'''
    专辑的上传、获取专辑信息、对于不同状态下的专辑的获取
'''


@require_http_methods(["POST"])
def upload_album(request):
    response = {}
    try:
        username = request.POST.get('username')
        album_name = request.POST.get('name')
        album_image = request.POST.get('imageUrl')
        artist = request.POST.get('artist')
        desc = request.POST.get('desc')
        num = int(request.POST.get('num'))

        tracks = []
        for i in range(num):
            t = request.POST.get('dynamicTags[%s]' % i)
            if not t:
                break
            tracks.append(t)
        print(tracks)

        user_object = UserInfo.objects.get(username=username)
        artist_object = Artist.objects.get_or_create(artistName=artist)[0]
        album_object = Album.objects.create(albumName=album_name, albumImage=album_image, artist=artist_object,
                                            intro=desc, uploader=user_object)

        for t in tracks:
            Track.objects.create(trackName=t, album=album_object)

        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1

    return JsonResponse(response)


@require_http_methods(["POST"])
def update_album(request):
    response = {}
    try:
        album_id = request.POST.get('id')
        album_name = request.POST.get('name')
        album_image = request.POST.get('imageUrl')
        artist = request.POST.get('artist')
        desc = request.POST.get('desc')
        num = int(request.POST.get('num'))

        tracks = []
        for i in range(num):
            t = request.POST.get('dynamicTags[%s]' % i)
            if not t:
                break
            tracks.append(t)
        print(tracks)

        artist_object = Artist.objects.get_or_create(artistName=artist)[0]
        album_objects = Album.objects.filter(albumId=album_id)
        album_objects.update(albumName=album_name, albumImage=album_image, artist=artist_object,
                             intro=desc, uploadState='1')

        old_tracks = [x['trackName'] for x in album_objects[0].track_set.all().values('trackName')]

        # 比较旧的track列表 和 新track列表， 如果新track不包含，那么则删除。 如果新track列表有新的歌曲，那么旧添加
        for t in old_tracks:
            if t in tracks:
                tracks.remove(t)
                continue
            else:
                Track.objects.get(trackName=t).delete()
        for t in tracks:
            Track.objects.create(trackName=t, album=album_objects[0])

        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def get_all_album(request):
    response = {}
    try:
        album_list = Album.objects.filter(uploadState='2')
        username = request.GET.get('username')
        user_object = UserInfo.objects.get(username=username)
        collection = Collection.objects.get_or_create(user=user_object)[0]
        # collection = user_object.collection
        if len(album_list) != 0:
            response['msg'] = 'success'
            response['err_num'] = 0
            res_list = []
            for albumItem in list(album_list):
                is_collected = collection.album.filter(albumId=albumItem.albumId).exists()
                res_list.append({'albumId': albumItem.albumId, 'albumName': albumItem.albumName,
                                 'albumImage': albumItem.albumImage, 'artist': albumItem.artist.artistName,
                                 'isCollected': is_collected})
            response['result'] = res_list
        else:
            response['msg'] = 'list is null'
            response['err_num'] = 0
        # print("get_all_album: ", response["result"])
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def get_upload_album(request):
    response = {}
    try:
        lists = []
        username = request.GET.get('username')
        user_object = UserInfo.objects.get(username=username)
        album_user_list = Album.objects.filter(uploader=user_object)
        for i in range(3):
            album_list = album_user_list.filter(uploadState=str(i))
            if len(album_list) != 0:
                res_list = []
                for albumItem in list(album_list):
                    track_list = albumItem.track_set.all().exclude(latestPlayTime__isnull=True)
                    if track_list.exists():
                        res = track_list.aggregate(maxTime=Max('latestPlayTime'))
                        albumItem.latestPlayTime = res['maxTime']
                        albumItem.save()
                    res_list.append({'albumId': albumItem.albumId, 'albumName': albumItem.albumName,
                                     'albumImage': albumItem.albumImage, 'artist': albumItem.artist.artistName,
                                     'last_time': albumItem.latestPlayTime.strftime("%Y-%m-%d %H:%M")})
                lists.append(res_list)
            else:
                lists.append([])
        response['msg'] = 'success'
        response['err_num'] = 0
        response['result'] = lists
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def get_an_album(request):
    response = {}
    try:
        album_id = request.GET.get('albumId')
        album = Album.objects.get(albumId=album_id)
        tracks = [x['trackName'] for x in album.track_set.all().values('trackName')]
        print(tracks)
        response['result'] = {'id': album.albumId, 'name': album.albumName, 'artist': album.artist.artistName,
                              'imageUrl': album.albumImage,
                              'desc': album.intro, 'dynamicTags': tracks}
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))
    # print(response)
    return JsonResponse(response)


@require_http_methods(["GET"])
def is_album_get_info(request):
    response = {}
    try:
        album_id = request.GET.get('albumId')
        album = Album.objects.get(albumId=album_id)
        response['result'] = album.isGetInfoForTracks
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))
    return JsonResponse(response)


@require_http_methods(["GET"])
def set_album_get_state(request):
    response = {}
    try:
        album_id = request.GET.get('albumId')
        album = Album.objects.get(albumId=album_id)
        album.isGetInfoForTracks = True
        album.save()
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))
    return JsonResponse(response)


'''
    歌曲的更新和获取
'''


@require_http_methods(["GET"])
def update_track(request):
    response = {}
    try:
        track_name = request.GET.get('trackName')
        duration = request.GET.get('duration')
        artist = request.GET.get('artist')
        music_id = request.GET.get('musicId')
        track = Track.objects.get(trackName=track_name)
        track.duration = duration
        track.artist = artist
        track.musicId = music_id
        track.save()
        response['msg'] = 'success'
        response['err_num'] = 0

    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def update_track_music_url(request):
    response = {}
    try:
        track_name = request.GET.get('trackName')
        music_id = request.GET.get('musicId')
        track = Track.objects.get(trackName=track_name)
        track.musicId = music_id
        track.save()
        response['msg'] = 'success'
        response['err_num'] = 0

    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def get_track_last_play_time(request):
    response = {}
    try:
        track_name = request.GET.get('trackName')
        track = Track.objects.get(trackName=track_name)
        if track.latestPlayTime:
            response['result'] = track.latestPlayTime.strftime("%Y-%m-%d %H:%M")
        else:
            response['result'] = timezone.now().strftime("%Y-%m-%d %H:%M")
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def update_track_last_play_time(request):
    response = {}
    try:
        track_name = request.GET.get('trackName')
        track = Track.objects.get(trackName=track_name)
        track.latestPlayTime = timezone.now()
        track.save()
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def get_tracks(request):
    response = {}
    try:
        album_id = request.GET.get('albumId')
        album = Album.objects.get(albumId=album_id)
        my_list = []
        for t in album.track_set.all():
            if t.latestPlayTime:
                time = t.latestPlayTime.strftime("%Y-%m-%d %H:%M")
            else:
                time = timezone.now().strftime("%Y-%m-%d %H:%M")
            my_list.append({'name': t.trackName, 'artists': t.artist,
                            'duration': t.duration, 'lastPlayTime': time,
                            'id': t.musicId})
        response['result'] = my_list
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


'''
    收藏的添加、删除、获取全部收藏信息
'''


@require_http_methods(["GET"])
def add_collection(request):
    response = {}
    try:
        album_id = request.GET.get('albumId')
        username = request.GET.get('username')
        album_object = Album.objects.get(albumId=album_id)
        user_object = UserInfo.objects.get(username=username)
        collection = Collection.objects.get_or_create(user=user_object)[0]
        collection.album.add(album_object)
        response['msg'] = 'success'
        response['err_num'] = 0

    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def delete_collection(request):
    response = {}
    try:
        username = request.GET.get('username')
        album_id = request.GET.get('albumId')
        user_object = UserInfo.objects.get(username=username)
        album_object = Album.objects.get(albumId=album_id)
        collection = Collection.objects.get(user=user_object)
        collection.album.remove(album_object)
        response['msg'] = 'success'
        response['err_num'] = 0

    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def get_collection(request):
    response = {}
    try:
        username = request.GET.get('username')
        user_object = UserInfo.objects.get(username=username)
        collections = Collection.objects.get(user=user_object)
        mylist = []
        for album in collections.album.all():
            track_list = album.track_set.all().exclude(latestPlayTime__isnull=True)
            if track_list.exists():
                res = track_list.aggregate(maxTime=Max('latestPlayTime'))
                album.latestPlayTime = res['maxTime']
                album.save()
            mylist.append({'albumId': album.albumId, 'albumImage': album.albumImage, 'albumName': album.albumName,
                           'artist': album.artist.artistName,
                           'last_time': album.latestPlayTime.strftime("%Y-%m-%d %H:%M")})
        response['result'] = mylist
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


'''
    发表评论，获取评论列表
'''


@require_http_methods(["GET"])
def send_comment(request):
    response = {}
    try:
        username = request.GET.get('username')
        album_id = request.GET.get('albumId')
        comment = request.GET.get('comment')
        # print(username)
        user_object = UserInfo.objects.get(username=username)
        album_object = Album.objects.get(albumId=album_id)
        Comment.objects.create(album=album_object, user=user_object, comment=comment)
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def get_comments(request):
    response = {}
    try:
        album_id = request.GET.get('albumId')
        comment_list = Comment.objects.filter(album__albumId=album_id)
        mylist = []
        for comment in comment_list:
            reply_list = comment.reply_set.all()
            my_reply_list = []
            for reply in reply_list:
                my_reply_list.append({'from': reply.fromUser.username, 'time': reply.time.strftime("%Y-%m-%d %H:%M"),
                                      'to': reply.toUser.username, 'comment': reply.replyComment, 'like': reply.like,
                                      'fromHeadImg': reply.fromUser.avatarImage})
            mylist.append({'name': comment.user.username, 'headImg': comment.user.avatarImage,
                           'comment': comment.comment, 'reply': my_reply_list,
                           'time': comment.time.strftime("%Y-%m-%d %H:%M"),
                           'like': comment.like, 'commentId': comment.commentId, 'userId': comment.user.id})
        response['result'] = mylist
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def update_comment_like(request):
    response = {}
    try:
        comment_id = request.GET.get('commentId')
        num = int(request.GET.get('like'))
        my_comment = Comment.objects.get(commentId=comment_id)
        my_comment.like = num
        my_comment.save()
        response['msg'] = 'success'
        response['err_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


@require_http_methods(["GET"])
def reply_comment(request):
    response = {}
    try:
        comment_id = request.GET.get('commentId')
        from_user_id = request.GET.get('from')
        to_user_id = request.GET.get('to')
        reply = request.GET.get('reply')
        comment_object = Comment.objects.get(commentId=comment_id)
        from_user_object = UserInfo.objects.get(id=from_user_id)
        to_user_object = UserInfo.objects.get(id=to_user_id)
        Reply.objects.create(mainComment=comment_object, fromUser=from_user_object,
                             toUser=to_user_object, replyComment=reply)
        response['msg'] = 'success'
        response['err_num'] = 0

    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)


'''
    发送邮箱验证码
'''


@require_http_methods(["GET"])
def send_sms_code(request):
    """
    发送邮箱验证码
    :param to_mail: 发到这个邮箱
    :return: 成功：0 失败 -1
    """
    response = {}
    try:
        username = request.GET.get('username')
        user_object = UserInfo.objects.get(username=username)
        to_email = user_object.email
        sms_code = '%06d' % random.randint(0, 999999)
        EMAIL_FROM = "3250679635@qq.com"  # 邮箱来自
        email_title = '找回密码'
        email_body = "您的邮箱注册验证码为：{0}, 该验证码有效时间为两分钟，请及时进行验证。".format(sms_code)
        send_status = send_mail(email_title, email_body, EMAIL_FROM, [to_email])
        if send_status:
            response['msg'] = 'success'
            response['err_num'] = 0
            response['result'] = sms_code
        else:
            response['msg'] = '邮件发送失败'
            response['err_num'] = 1
    except Exception as e:
        response['msg'] = str(e)
        response['err_num'] = 1
        print(str(e))

    return JsonResponse(response)
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone


class UserInfo(models.Model):
    username = models.CharField(max_length=30, verbose_name='用户名', unique=True)
    password = models.CharField(max_length=30, verbose_name='密码')
    email = models.EmailField(verbose_name='邮箱')
    avatarImage = models.CharField(max_length=100, verbose_name='头像图片链接', null=True)
    role = models.CharField(verbose_name='身份', max_length=10, choices=(('0', 'user'), ('1', 'manager')), default='0')

    def __str__(self):
        return '%s: %s' % ('user' if self.role == '0' else 'manager', self.username)


class Artist(models.Model):
    artistId = models.AutoField(primary_key=True)
    artistName = models.CharField(max_length=30, verbose_name='歌手名字')

    def __str__(self):
        return self.artistName


class Album(models.Model):
    albumId = models.AutoField(primary_key=True)
    albumName = models.CharField(max_length=30, verbose_name='专辑名字', unique=True)
    albumImage = models.CharField(default='', max_length=100, verbose_name='专辑封面')
    artist = models.ForeignKey(to=Artist, verbose_name='专辑的作者', on_delete=models.DO_NOTHING)
    latestPlayTime = models.DateTimeField(verbose_name='最近播放时间', default=timezone.now, null=True)
    intro = models.TextField(default='', verbose_name='简介')
    uploader = models.ForeignKey(to=UserInfo, verbose_name='上传专辑的作者', on_delete=models.DO_NOTHING, null=True)
    # 该属性判断是否审核通过, 0表示审核未通过, 1表示正在审核, 2表示审核已通过
    uploadState = models.CharField(default='1', max_length=20, choices=(('0', '审核未通过'), ('1', '待审核'), ('2', '审核已通过')),
                                   verbose_name='上传状态')

    def __str__(self):
        return self.albumName


class Track(models.Model):
    trackId = models.AutoField(primary_key=True)
    trackName = models.CharField(max_length=30, verbose_name='歌曲名字')
    album = models.ForeignKey(to=Album, null=True, verbose_name='专辑', on_delete=models.CASCADE)
    duration = models.CharField(max_length=6, verbose_name='歌曲长度', null=True)
    latestPlayTime = models.DateTimeField(verbose_name='最近播放时间', default=timezone.now, null=True)

    def __str__(self):
        return self.trackName


class Collection(models.Model):
    collectionId = models.AutoField(primary_key=True)
    user = models.OneToOneField(to=UserInfo, on_delete=models.CASCADE)
    album = models.ManyToManyField(to=Album)

    def __str__(self):
        return '%s\'s Collection' % self.user.username


class Comment(models.Model):
    commentId = models.AutoField(primary_key=True)
    album = models.ForeignKey(to=Album, on_delete=models.CASCADE)
    user = models.ForeignKey(to=UserInfo, on_delete=models.CASCADE)
    time = models.DateTimeField(verbose_name='消息发布的时间', auto_now_add=True)
    like = models.IntegerField(verbose_name='点赞数', default=0)
    comment = models.TextField(verbose_name="评论")

    class Meta:
        ordering = ["-like"]

    def __str__(self):
        return '%s\'s comment for %s is \"%s ...\"' % (self.user.username, self.album.albumName, self.comment[0:5])


class Reply(models.Model):
    replyId = models.AutoField(primary_key=True)
    mainComment = models.ForeignKey(to=Comment, on_delete=models.CASCADE)
    fromUser = models.ForeignKey(to=UserInfo, on_delete=models.CASCADE, related_name="被回复的人")
    toUser = models.ForeignKey(to=UserInfo, on_delete=models.CASCADE, related_name="发言者")
    time = models.DateTimeField(verbose_name='消息发布的时间', auto_now_add=True)
    like = models.IntegerField(verbose_name='点赞数', default=0)
    replyComment = models.TextField(verbose_name="评论", default='')

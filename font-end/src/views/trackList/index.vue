<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <el-image
          :src="albumInfo.imageUrl"
          fit="fit"
          class="albumTrack"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
        <i class="data__cover_mask" />
      </div>
      <div class="info-wrap">
        <h1 class="title">{{ albumInfo.name }}</h1>
        <div class="author-wrap">
          <i class="el-icon-user" style="font-size: 23px;margin-right: 20px;" />
          <span>{{ albumInfo.artist }}</span>
        </div>
        <div class="play-wrap">
          <el-button class="playButton" @click="playAllMusic">
            <i class="el-icon-video-play" />
            <span>播放音乐</span>
          </el-button>
        </div>
        <div class="desc-wrap">
          <h2>专辑介绍:</h2>
          <!-- 简介 -->
          <span class="desc">
            {{ albumInfo.desc }}
          </span>
          <el-button type="text" @click="openDetailDialog">[查看详情]</el-button>
        </div>
      </div>
    </div>
    <div class="play-table">
      <p style="font-size:16px;color: #31c27c;">曲目列表</p>
      <el-divider />
      <table class="el-table">
        <thead>
          <th />
          <th>歌曲</th>
          <th>歌手</th>
          <th>时长</th>
          <th>最近一次听歌时间</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr
            v-for="(item,index) in tracks"
            :key="index"
            class="el-table__row"
          >
            <td>{{ index+1 }}</td>
            <td><el-button type="text" @click="playMusic(index,true)">{{ item.name }}</el-button></td>
            <td>{{ item.artists }}</td>
            <td>{{ item.duration }}</td>
            <td>{{ item.lastPlayTime }}</td>
            <td><el-button type="text" @click="playMusic(index,true)">播放</el-button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="comment">
      <ArticleComment :album_id="this.$route.params.id" />
    </div>
    <div class="player">
      <!-- autoplay 自动播放 -->
      <audio :src="musicUrl" controls autoplay @ended="overAudio" />
    </div>
  </div>
</template>

<script>
import ArticleComment from '@/views/comments'
import {
  getAlbumTracks,
  getAnAlbumInfo,
  getMusicUrl,
  getTrackLastPlayTime, getTracksInfo, isAlbumGetInfo, setAlbumGetState,
  updateTrackDuration, updateTrackLastPlayTime
} from '@/backendApi/api'
export default {
  name: 'TrackList',
  components: { ArticleComment },
  data() {
    return {
      musicList: [], // 音乐链接列表
      musicUrl: '', // 当前选择播放的音乐链接
      musicIndex: 0, // 全部播放时候对应播放到的index
      isAllPlay: false, // 是否全部播放
      albumInfo: {
        id: '',
        name: '',
        artist: '',
        imageUrl: '',
        desc: ''
      },
      tracks: []
    }
  },
  watch: {
    tracks: {
      handler: function(val, oldVal) {
        // console.log(val)
      },
      deep: true
    }
  },
  async mounted() {
    await this.attainAlbumInfo()
    const res = await isAlbumGetInfo({ 'albumId': this.$route.params.id })
    if (!res.data.result) {
      await this.getNetWork()
    } else {
      await this.getTracks()
    }
  },
  methods: {
    openDetailDialog() {
      this.$alert(this.albumInfo.desc, '专辑简介详情', { customClass: 'alertBox' })
    },
    async getNetWork() {
      await this.getTrackFromNetwork()
      await this.updateTrackDuration()
      await this.getTrackLastPlayTimeFunction()
    },
    async attainAlbumInfo() {
      // console.log('id: ' + this.$route.params.id)
      const res = await getAnAlbumInfo({ 'albumId': this.$route.params.id })
      this.albumInfo = res.data.result
    },
    async getTrackFromNetwork() {
      const track_list = this.albumInfo.dynamicTags
      let length = track_list.length
      const res = await getAlbumTracks(this.albumInfo.name)
      if (res.length === 0) {
        return
      }
      const my_list = []
      for (const r of res) {
        const index = track_list.indexOf(r.name)
        if (index !== (-1)) {
          let artist_string = ''
          let flag = false // 判断是否包含专辑的作者
          for (const a of r.artists) {
            artist_string += (a.name + ' ')
            if (this.albumInfo.artist !== '群星') {
              if (a.name === this.albumInfo.artist) flag = true
            }
          }
          r.artists = artist_string
          r['lastPlayTime'] = ''
          if ((this.albumInfo.artist === '群星') || flag) {
            my_list.push(r)
            length -= 1
            track_list.splice(index, 1)
          }
          if (length === 0) break
        }
      }
      this.tracks = my_list
      if (this.tracks.length !== 0) {
        await setAlbumGetState({ 'albumId': this.$route.params.id })
      }
    },
    async updateTrackDuration() {
      const my_list = []
      for (const t of this.tracks) {
        const res = await getMusicUrl(t.id)
        const url = res.data.data[0].url
        my_list.push(url)
        // await updateTrackMusicUrl({ 'trackName': t.name, 'musicUrl': url })
        await updateTrackDuration({ 'trackName': t.name, 'duration': t.duration, 'artist': t.artists, 'musicUrl': url })
      }
      this.musicList = my_list
    },
    async getTrackLastPlayTimeFunction() {
      for (const t of this.tracks) {
        const res = await getTrackLastPlayTime({ 'trackName': t.name })
        t.lastPlayTime = res.data.result
      }
    },
    async getTracks() {
      const res = await getTracksInfo({ 'albumId': this.$route.params.id })
      const my_list = []
      if (res.data.msg === 'success') {
        this.tracks = res.data.result
        // console.dir(this.tracks)
        for (const t of this.tracks) {
          // console.log(t)
          my_list.push(t.musicUrl)
        }
        this.musicList = my_list
      } else {
        this.$message.error(res.data.msg)
      }
    },
    async playMusic(id, outsideClick) {
      if (outsideClick) this.isAllPlay = false
      this.musicUrl = this.musicList[id]
      const name = this.tracks[id].name
      await updateTrackLastPlayTime({ 'trackName': name })
    },
    playAllMusic() {
      this.isAllPlay = true
      this.musicIndex = 0
      this.playMusic(0, false)
    },
    overAudio() {
      // console.log('over!!!')
      if (!this.isAllPlay) return
      this.musicIndex += 1
      // 这里设定为循环播放模式
      if (this.musicIndex >= this.musicList.length) {
        // this.isAllPlay = false
        this.musicIndex = 0
        this.playMusic(this.musicIndex, false)
        return
      }
      // this.musicUrl = this.musicList[this.musicIndex]
      this.playMusic(this.musicIndex, false)
    }
  }
}
</script>

<style>
/*自定义弹窗的样式*/
.alertBox {
  width: 800px;
  max-height: 600px;
  overflow: auto;
}
</style>

<style scoped>

.playlist-container {
  margin: auto;
  padding: 40px;
}

.playlist-container .top-wrap {
  display: flex;
}

.playlist-container .top-wrap span {
  font-size: 17px;
}

.playlist-container .top-wrap .img-wrap {
  position: relative;
  width: 250px;
  height: 250px;
  left: 0;
  top: 50px;
}

.playlist-container .top-wrap .img-wrap .albumTrack {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.playlist-container .top-wrap .img-wrap .data__cover_mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 266px;
  pointer-events: none;
  background: url("../../assets/track/album_cover.png") 0 0 no-repeat;
}

.playlist-container .top-wrap .info-wrap {
  position: relative;
  left: 130px;
  top: 0;
}

.playlist-container .top-wrap .info-wrap .title {
  margin-bottom: 20px;
  font-size: 31px;
  font-weight: 400;
  text-overflow: ellipsis;
}

.playlist-container .top-wrap .info-wrap .author-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.playlist-container .top-wrap .info-wrap .author-wrap span{
  font-size: 16px;
  color: #333;
}

.playlist-container .top-wrap .info-wrap .play-wrap {
  vertical-align: middle;
  margin-bottom: 20px;
}

.playlist-container .top-wrap .info-wrap .play-wrap .playButton {
  background-color: #31c27c;
  color: white;
}

.playlist-container .top-wrap .info-wrap .play-wrap .playButton span{
  font-size: 16px;
  line-height: 23px;
  margin-left: 10px;
}

.playlist-container .top-wrap .info-wrap .play-wrap i{
  font-size: 23px;
  float: left;
}

.playlist-container .top-wrap .info-wrap .tag-wrap {
  display: flex;
  margin-bottom: 15px;
}

.playlist-container .top-wrap .info-wrap .tag-wrap span {
  margin: 0;
}

.playlist-container .top-wrap .info-wrap .tag-wrap ul {
  display: flex;
  align-items: center;
}

.playlist-container .top-wrap .info-wrap .tag-wrap li {
  font-size: 15px;
}

.playlist-container .top-wrap .info-wrap .tag-wrap li:not(:last-child)::after {
  content: '/';
  margin: 0 4px;
}

.playlist-container .top-wrap .info-wrap .desc-wrap {
  width: 700px;
  font-size: 15px;
}

.playlist-container .top-wrap .info-wrap .desc-wrap .desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
}

.playlist-container .top-wrap .info-wrap .desc-wrap:last-of-type {
  font-size: 6px;
}

.playlist-container .top-wrap .info-wrap span:first-child {
  margin-right: 10px;
}

.playlist-container .comment-wrap {
  margin-bottom: 70px;
}

.playlist-container .comment-wrap .title {
  font-size: 20px;
}

.playlist-container .comment-wrap .title .number {
  color: black;
  font-size: 18px;
}

.playlist-container .comment-wrap .item {
  display: flex;
  padding-top: 20px;
}

.playlist-container .comment-wrap .item .icon-wrap {
  margin-right: 15px;
}

.playlist-container .comment-wrap .item .icon-wrap img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.playlist-container .comment-wrap .item:not(:last-child) .content-wrap {
  border-bottom: 1px solid #f2f2f1;
}

.playlist-container .comment-wrap .item .date {
  color: #bebebe;
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap {
  padding-bottom: 20px;
  flex: 1;
}

.playlist-container .comment-wrap .item .content-wrap .name {
  color: #517eaf;
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap .comment {
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap .content,
.playlist-container .comment-wrap .item .content-wrap .re-content {
  margin-bottom: 10px;
}

.playlist-container .comment-wrap .item .content-wrap .re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}

.play-table{
  margin-top: 30px;
}

.comment{
  margin-top: 30px;
}

th{
  text-align: left;
}

.player {
  background: #f1f3f4;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

audio {
  width: 100%;
  border-radius: 0;
  outline: none;
}
</style>

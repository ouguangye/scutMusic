<template>
  <div class="body">
    <p style="font-size:16px;color: #31c27c;">我收藏的专辑</p>
    <el-divider />
    <AlbumList operate="取消收藏" :song_list="songList" @listenEvent="cancelCollection" />
  </div>
</template>

<script>
import AlbumList from '@/views/albumList'
import { delCollection, getCollection } from '@/backendApi/api'
export default {
  name: 'Table',
  components: { AlbumList },
  data() {
    return {
      songList: []
    }
  },
  mounted() {
    this.getCollectionFunction()
  },
  methods: {
    async getCollectionFunction() {
      const res = await getCollection({ 'username': this.$store.getters.name })
      if (res.data.msg === 'success') {
        this.songList = res.data.result
        console.log(this.songList)
      }
    },
    async delCollectionFunction(albumId) {
      const dic = { 'albumId': albumId, 'username': this.$store.getters.name }
      const res = await delCollection(dic)
      if (res.data.msg === 'success') {
        this.$message('成功取消收藏')
        this.isCollected = !this.isCollected
      }
    },
    cancelCollection(albumId) {
      this.delCollectionFunction(albumId)
      this.getCollectionFunction()
    }
  }
}
</script>

<style scoped>
.body{
  padding: 20px 40px 40px;
}
</style>

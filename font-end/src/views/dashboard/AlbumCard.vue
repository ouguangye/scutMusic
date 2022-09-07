<template>
  <el-card :body-style="{ padding: '0px' }" class="card">
    <el-image
      style="width: 100%"
      :src="info.albumImage"
      :lazy="true"
      fit="fit"
      @click.native.prevent="onJump"
    >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <div style="padding: 14px;">
      <el-link @click.native.prevent="onJump">{{ info.albumName }}</el-link>
      <div class="bottom clearfix">
        <time class="time">artist: {{ info.artist }}</time>
        <el-button type="text" class="button" @click.native.prevent="operateCollection">
          {{ info.isCollected?'取消收藏':'收藏' }}
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { addCollection, delCollection } from '@/backendApi/api'

export default {
  name: 'AlbumCardVue',
  props: ['info'],
  data() {
    return {
      // isCollected: false
    }
  },
  methods: {
    async operateCollection() {
      const dic = { 'albumId': this.info.albumId, 'username': this.$store.getters.name }
      if (!this.info.isCollected) {
        const res = await addCollection(dic)
        if (res.data.msg === 'success') {
          this.$message('成功添加收藏')
          this.info.isCollected = !this.info.isCollected
        }
      } else {
        const res = await delCollection(dic)
        if (res.data.msg === 'success') {
          this.$message('成功取消收藏')
          this.info.isCollected = !this.info.isCollected
        }
      }
    },
    onJump() {
      window.location = ('#/album/' + this.info.albumId)
    }
  }
}
</script>

<style scoped>
.card{
  width: 280px;
  margin-top: 20px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>

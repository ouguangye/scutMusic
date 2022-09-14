<template>
  <el-skeleton style="width: 100%" :loading="loading" animated>
    <template slot="template">
      <el-skeleton-item
        variant="image"
        style="width: 270px; height: 270px;"
      />
      <div style="padding: 14px 0;">
        <el-skeleton-item variant="h3" style="width: 50%;" />
        <div
          style="display: flex; align-items: center; margin-top: 16px; height: 16px;margin-bottom: 16px;"
        >
          <el-skeleton-item variant="text" style="margin-right: 43px;width: 40%" />
          <el-skeleton-item variant="text" style="width: 30%;" />
        </div>
      </div>
    </template>
    <template>
      <el-card :body-style="{ padding: '0px' }" class="card">
        <el-image
          v-show="isShow"
          style="width: 100%"
          :src="info.albumImage"
          fit="fit"
          @load="imageLoad"
          @click.native.prevent="onJump"
        />
        <img
          v-show="!isShow"
          style="width: 100%;height: 100%"
          src="@/assets/loading.png"
        />
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
  </el-skeleton>
</template>

<script>
import { addCollection, delCollection } from '@/backendApi/api'

export default {
  name: 'AlbumCardVue',
  props: ['info'],
  data() {
    return {
      loading: false, // 骨架框德加载
      isShow: false // 空白照片的加载
    }
  },
  mounted() {
    // this.loading = true
    // setTimeout(() => (this.loading = false), 2000)
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
    },
    imageLoad() {
      // console.log('!!!!!!!!')
      this.isShow = true
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

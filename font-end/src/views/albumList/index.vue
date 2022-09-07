<template>
  <div>
    <table v-if="song_list.length !== 0" class="el-table">
      <thead>
        <th />
        <th />
        <th>专辑</th>
        <th>歌手</th>
        <th>最近听歌时间</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in song_list"
          :key="index"
          class="el-table__row"
        >
          <td> {{ index+1 }} </td>
          <td>
            <div class="img-wrap">
              <img :src="item.albumImage" alt="">
              <a v-if="state_index === 0" class="icon-play" @click="onJump(item.albumId)">
                <i class="el-icon-caret-right" />
              </a>
            </div>
          </td>
          <td> {{ item.albumName }} </td>
          <td> {{ item.artist }} </td>
          <td> {{ item.last_time }}</td>
          <td><el-button type="text" size="small" @click.native.prevent="clickEvent(item.albumId)"> {{ operate }} </el-button></td>
        </tr>
      </tbody>
    </table>
    <el-empty v-else description="暂无结果" :image-size="270" style="margin-top: 40px" />
  </div>
</template>

<script>

export default {
  name: 'AlbumList',
  props: { operate: String, song_list: Array, state_index: { type: Number, default() { return 0 } }},
  methods: {
    clickEvent(id) {
      // console.log('album id', id)
      this.$emit('listenEvent', id, this.state_index)
    },
    onJump(id) {
      console.log('album id', id)
      window.location = ('#/album/' + id)
    }
  }
}
</script>

<style scoped>
  .el-table th > .cell {
    font-weight: normal;
    color: black;
  }

  .el-table {
    border-bottom: none;
    border-collapse: collapse;
    margin-top: 40px;
  }

  .el-table tbody {
    border-bottom: none;
  }

  .el-table td {
    border-bottom: none;
    padding-bottom: 10px;
  }

  .el-table td:first-child {
    padding-left: 10px;
  }

  .el-table th {
    font-weight: normal;
    text-align: left;
    padding-bottom: 10px;
  }

  .el-table th:first-child {
    width: 80px;
  }

  .el-table th:nth-child(2) {
    width: 120px;
  }

  .el-table th:nth-child(3) {
    width: 300px;
  }

  .el-table .song-wrap > span {
    margin-top: 20px;
    display: inline-block;
    color: #bebebe;
  }

  .el-table .song-wrap .icon-mv {
    padding-left: 5px;
    color: #dd6d60;
  }

  .el-table .img-wrap {
    position: relative;
    width: 60px;
    height: 60px;
  }

  .el-table .img-wrap img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }

  .el-table .img-wrap .icon-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    color: #dd6d60;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
  }

  .el-table .img-wrap .icon-play::before {
    transform: translateX(1px);
  }

  .el-table tr:nth-child(2n) {
    background-color: #fafafa;
  }

  .el-table tr:hover {
    background-color: #f5f7fa;
  }
</style>

<template>
  <div style="padding: 10px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in label" :key="index" :label="item" :name="(2-index).toString()">
        <AlbumList :operate="index?'编辑':'查看'" :song_list="songList[2-index]" :state_index="index" @listenEvent="onOperate" />
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="编辑专辑" :visible.sync="dialogFormVisible">
      <AlbumForm primary_button_text="确定更改专辑" negative_button_text="退出" :form="form" @onClear="onHidden" @onSubmit="onSubmit" />
    </el-dialog>
  </div>
</template>

<script>
import AlbumList from '@/views/albumList'
import { getAnAlbumInfo, getUploadAlbum, updateAlbum } from '@/backendApi/api'
import AlbumForm from '@/views/form/AlbumForm'
export default {
  components: { AlbumForm, AlbumList },
  data() {
    return {
      activeName: '2',
      songList: [[], [], []],
      label: ['成功上传的专辑', '已上传但待审核的专辑', '已上传但审核不通过的专辑'],
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        artist: '',
        imageUrl: '',
        dynamicTags: [],
        desc: ''
      }
    }
  },
  mounted() {
    this.getUploadAlbumArray()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    async getUploadAlbumArray() {
      const res = await getUploadAlbum({ 'username': this.$store.getters.name })
      if (res.data.msg === 'success') {
        this.songList = res.data.result
        console.log(this.songList)
      }
    },
    async onSubmit() {
      const res = await updateAlbum(this.form)
      console.log(res.data)
      if (res.data.msg === 'success') {
        this.$message('修改成功，待管理员审核')
        this.onHidden()
        await this.getUploadAlbumArray()
      } else {
        this.$message.error(res.data.msg)
      }
    },
    onOperate(albumId, index) {
      // console.log('aid: ' + albumId + ' index: ' + index)
      if (index) this.onEdit(albumId)
      else this.onJump(albumId)
    },
    onJump(albumId) {
      window.location = ('#/album/' + albumId)
    },
    async onEdit(albumId) {
      const res = await getAnAlbumInfo({ 'albumId': albumId })
      if (res.data.msg === 'success') {
        this.form = res.data.result
        this.onHidden()
        console.log(this.form)
      } else {
        this.$message.error(res.data.msg)
      }
    },
    onHidden() {
      this.dialogFormVisible = !this.dialogFormVisible
    }
  }
}
</script>

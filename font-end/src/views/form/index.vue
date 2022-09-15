<template>
  <AlbumForm primary_button_text="上传专辑" negative_button_text="清空表单数据" :form="form" @onClear="onClear" @onSubmit="onSubmit" />
</template>

<script>
import AlbumForm from '@/views/form/AlbumForm'
import { uploadAlbum } from '@/backendApi/api'
export default {
  components: { AlbumForm },
  data() {
    return {
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
  methods: {
    async onSubmit() {
      const form = { ...this.form, 'username': this.$store.getters.name, 'num': this.form.dynamicTags.length }
      const res = await uploadAlbum(form)
      if (res.data.msg === 'success') {
        this.onClear()
        this.$message('上传成功，请等待管理员审核')
      } else {
        this.$message.error(res.data.msg)
      }
    },
    onClear() {
      this.form = {
        name: '',
        artist: '',
        imageUrl: '',
        dynamicTags: [],
        desc: ''
      }
    }
  }
}
</script>

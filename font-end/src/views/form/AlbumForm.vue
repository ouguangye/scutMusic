<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="专辑名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="歌手名字">
        <el-input v-model="form.artist" />
      </el-form-item>
      <el-form-item label="专辑封面">
        <el-input v-model="form.imageUrl" placeholder="请输入图片链接" />
      </el-form-item>
      <el-form-item label="添加歌曲">
        <el-tag
          v-for="tag in form.dynamicTags"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Track</el-button>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 9}" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit">{{ primary_button_text }}</el-button>
        <el-button @click="onClear">{{ negative_button_text }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'AlbumForm',
  props: ['primary_button_text', 'negative_button_text', 'form'],
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      loading: false
    }
  },
  methods: {
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.form.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    handleClose(tag) {
      this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1)
    },
    onSubmit() {
      this.$emit('onSubmit')
    },
    onClear() {
      this.$emit('onClear')
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

</style>


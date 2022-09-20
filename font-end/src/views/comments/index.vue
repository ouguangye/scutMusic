<template>
  <div style="margin-top: 20px">
    <h3 style="font-size: 17px;font-weight: 400;line-height: 28px">发表评论</h3>
    <el-divider />
    <div class="my-reply">
      <el-avatar class="header-img" :size="40" :src="avatar" />
      <div class="reply-info">
        <el-input
          v-model="replyComment"
          type="textarea"
          autosize
          placeholder="输入评论"
          @focus="showReplyBtn"
        />
        <div v-show="btnShow" class="reply-btn-box">
          <el-button class="reply-btn" size="medium" type="primary" @click="sendComment">发表评论</el-button>
        </div>
      </div>
      <h3 style="margin-top: 50px;display: block;font-size: 16px;font-weight: 400">精彩评论</h3>
      <el-divider />
      <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
        <el-avatar class="header-img" :size="40" :src="item.headImg" />
        <div class="author-info">
          <span class="author-name">{{ item.name }}</span>
          <span class="author-time">{{ item.time }}</span>
        </div>
        <div class="talk-box">
          <p>
            <span class="reply">{{ item.comment }}</span>
          </p>
        </div>
        <div class="icon-btn">
          <div @click="like(item, true)">
            <svg-icon icon-class="like" class="like_icon" />
            <span>{{ item.like }}</span>
          </div>
          <span @click="showReplyInput(i, item.userId)">{{ item.inputShow ? '取消回复' : '回复' }}</span>
        </div>
        <!--回复评论部分-->
        <div class="reply-box">
          <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
            <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg" />
            <div class="author-info">
              <span class="author-name">{{ reply.from }}</span>
              <span class="author-time">{{ reply.time }}</span>
            </div>
            <div class="talk-box">
              <p>
                <span style="margin-right: 5px;color: #999">回复 {{ reply.to }}:</span>
                <span class="reply">{{ reply.comment }}</span>
              </p>
            </div>
            <div class="icon-btn">
              <div @click="like(reply, false)">
                <svg-icon icon-class="like" class="like_icon" />
                <span>{{ reply.like }}</span>
              </div>
              <span @click="showReplyInput(i,item.userId)">回复</span>
            </div>
            <div class="reply-box" />
          </div>
        </div>
        <div v-show="item.inputShow" class="my-reply my-comment-reply">
          <el-avatar class="header-img" :size="40" :src="avatar" />
          <div class="reply-info">
            <el-input
              v-model="replyComment"
              type="textarea"
              autosize
              placeholder="输入评论"
              @focus="showReplyBtn"
            />
          </div>
          <div class=" reply-btn-box">
            <el-button class="reply-btn" size="medium" type="primary" @click="sendCommentReply(i)">发表评论</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, replyComment, sendCommentRequest, updateCommentLike, updateReplyLike } from '@/backendApi/api'

export default {
  name: 'ArticleComment',
  props: ['album_id'],
  data() {
    return {
      btnShow: false,
      avatar: this.$store.getters.avatar,
      replyComment: '',
      toId: -1,
      comments: []
    }
  },
  mounted() {
    this.getCommentsList()
  },
  methods: {
    async getCommentsList() {
      const res = await getComments({ 'albumId': this.album_id })
      if (res.data.msg === 'success') {
        const my_list = []
        for (const res of res.data.result) {
          for (const r of res.reply) {
            r['inputShow'] = false
            r['isClickLike'] = false
          }
          my_list.push({ ...res, 'inputShow': false, 'isClickLike': false })
        }
        this.comments = my_list
      }
    },
    async like(item, isComment) {
      item.like += item.isClickLike ? (-1) : 1
      item.isClickLike = !item.isClickLike
      if (isComment) await updateCommentLike({ 'commentId': item.commentId, 'like': item.like })
      else await updateReplyLike({ 'replyId': item.replyId, 'like': item.like })
    },
    showReplyBtn() {
      this.btnShow = true
    },
    hideReplyBtn() {
      const replyInput = document.getElementById('replyInput')
      this.btnShow = false
      replyInput.style.padding = '10px'
      replyInput.style.border = 'none'
    },
    showReplyInput(i, id) {
      const item = this.comments[i]
      if (!item.inputShow) {
        this.toId = id
      }
      item.inputShow = !item.inputShow
    },
    async sendComment() {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        const res = await sendCommentRequest({
          'username': this.$store.getters.name, 'albumId': this.album_id,
          'comment': this.replyComment
        })
        if (res.data.msg === 'success') {
          this.$message('评论发表成功')
          this.replyComment = ''
          await this.getCommentsList()
        } else {
          this.$message.error('接口请求错误')
        }
      }
    },
    async sendCommentReply(i) {
      if (!this.replyComment) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: '评论不能为空'
        })
      } else {
        const res = await replyComment({ 'commentId': this.comments[i].commentId, 'from': this.$store.getters.id,
          'to': this.toId, 'reply': this.replyComment })
        if (res.data.msg === 'success') {
          this.replyComment = ''
          this.$message('评论发表成功')
          await this.getCommentsList()
        } else {
          this.$message.error('接口请求错误')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-reply {
  padding: 10px;
  background-color: #fafbfc;
  margin-bottom: 10px;
}
.my-reply .header-img {
  display: inline-block;
  vertical-align: top;
  margin-right: 5px;
}
.my-reply .reply-info {
  display: inline-block;
  margin-left: 5px;
  width: 90%;
}
@media screen and (max-width: 1200px) {
  .my-reply .reply-info {
    width: 80%;
  }
}
.my-reply .reply-info .reply-input {
  min-height: 20px;
  line-height: 22px;
  padding: 10px 10px;
  color: #ccc;
  background-color: #fff;
  border-radius: 5px;
}
.my-reply .reply-info .reply-input:empty:before {
  content: attr(placeholder);
}
.my-reply .reply-info .reply-input:focus:before {
  content: none;
}
.my-reply .reply-info .reply-input:focus {
  padding: 8px 8px;
  border: 2px solid #7ed6df;
  box-shadow: none;
  outline: none;
}
.my-reply .reply-btn-box {
  height: 25px;
  margin: 10px 0;
}
.my-reply .reply-btn-box .reply-btn {
  position: relative;
  float: right;
  margin-right: 15px;
}
.my-comment-reply {
  margin-left: 50px;
}
.my-comment-reply .reply-input {
  display: flex;
}
.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178,186,194,0.3);
}
.author-title {
  padding: 10px;
}
.author-title .header-img {
  display: inline-block;
  vertical-align: top;
  margin-right: 5px;
}
.author-title .author-info {
  display: inline-block;
  margin-left: 5px;
  width: 60%;
  height: 40px;
  line-height: 20px;
}
.author-title .author-info >span {
  display: block;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.author-title .author-info .author-name {
  color: #999;
  font-weight: 400;
}
.author-title .author-info .author-time {
  font-size: 14px;
  color: #999;
}
.author-title .icon-btn {
  width: 30%;
  margin: 5px 45px;
  color: #999;
}

.icon-btn span {
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
}

.icon-btn div {
  display: inline-block;
  margin-right: 10px;
}

.icon-btn div:hover{
  color: #31c27c;
}

.icon-btn >span:hover {
  color: #31c27c;
}

.author-title .icon-btn .iconfont {
  margin: 0 5px;
}
.author-title .talk-box {
  margin: 6px 50px;
}
.author-title .talk-box >p {
  margin: 0;
}
.author-title .talk-box .reply {
  font-size: 16px;
  color: #000;
}
.author-title .reply-box {
  margin: 10px 0 0 50px;
  background-color: #fff;
}

.like_icon{
  margin-left: 10px;
  margin-right: 5px;
}
</style>

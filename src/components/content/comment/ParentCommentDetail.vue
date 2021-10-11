<template>
  <div class="parentComment">
    <div class="headerBox">
      <div class="h_item">
        <div class="hb_pic">
          <van-image class="img" :src="ownerUserinfo.avatarUrl" round />
        </div>
        <div class="hb_content">
          <div class="info">
            <div class="userinfo">
              <div class="username">{{ ownerUserinfo.nickname }}</div>
              <div class="sendtime">
                {{ ownerComment.time | formatDate()}}
              </div>
            </div>
            <div class="likeinfo">
              <div class="count">{{ ownerComment.likedCount }}</div>
              <span class="iconfont icon-zan"></span>
            </div>
          </div>
          <div class="commentTxt">
            {{ ownerComment.content }}
          </div>
        </div>
      </div>
    </div>
    <div class="pc_title">全部回复</div>
    <div class="pc_body">
      <van-list finished-text="没有更多了" v-model="pl_loading" :finished="pl_finished" @load="getParentCommentDetail(comment_id, pl_id, time)" :key="comment_id">
        <div class="pc_item" v-for="items in commentsList" :key="items.commentId">
          <van-image class="hb_pic" :src="items.user.avatarUrl" round />
          <div class="hb_content">
            <div class="info">
              <div class="userinfo">
                <div class="username">{{ items.user.nickname }}</div>
                <div class="sendtime">{{ items.time | formatDate()}}</div>
              </div>
              <div class="likeinfo">
                <div class="count">{{ items.likedCount }}</div>
                <span class="iconfont icon-zan"></span>
              </div>
            </div>
            <div class="commentTxt">
              <div class="content">
                {{ items.content }}
              </div>
              <div class="beReplied" v-if="items.beReplied[0].beRepliedCommentId !== comment_id">
                <div v-if="items.beReplied[0].content">
                  <span class="beuser">@{{ items.beReplied[0].user.nickname }}</span>
                  <span>{{ items.beReplied[0].content }}</span>
                </div>
                <div v-else>
                  <span>该评论已删除</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="replay">
      <van-field v-model="replay" label="" placeholder="随乐而起，有感而发" />
      <div class="btnSend" @click="sendComment(2,commentType,pl_id,replay,comment_id)">发送</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/common/utils'
import { getCommentFloor, sendComment } from 'network/comment'

export default {
  data () {
    return {
      // 歌单id
      pl_id: this.playlistid,
      // 评论id
      comment_id: this.targetId,
      // 评论资源类型
      commentType: this.comment_type,
      // 楼层回复总数
      totalCount: 0,
      // 父级评论的评论信息
      ownerComment: {},
      // 父级评论的评论者消息
      ownerUserinfo: {},

      // 分页参数，每一页的最后一项的事件
      time: '',
      // 楼层评论列表
      commentsList: [],
      // 正在输入的回复消息
      replay: '',
      pl_loading: false,
      pl_finished: false
    }
  },
  filters: {
    formatDate
  },
  props: ['targetId', 'playlistid', 'comment_type'],
  methods: {
    // 获取头部的评论信息
    // eslint-disable-next-line camelcase
    async getheaderBoxMsg (comment_id, pl_id) {
      let { data: res } = await getCommentFloor(
        comment_id,
        pl_id,
        this.commentType
      )
      console.log(res)
      this.ownerComment = res.ownerComment
      this.ownerUserinfo = res.ownerComment.user
      this.totalCount = res.totalCount
      this.sendCount()
    },
    // 获取评论列表信息
    // eslint-disable-next-line camelcase
    async getParentCommentDetail (comment_id, pl_id, time) {
      let { data: res } = await getCommentFloor(
        comment_id,
        pl_id,
        this.commentType,
        time
      )
      this.time = res.time
      // 保存这次查询出来的评论列表中最后一条数据的time,用于下次查询
      for (let i = 0; i < res.comments.length; i++) {
        this.commentsList.push(res.comments[i])
      }
      // 加载状态结束
      this.pl_loading = false
      // 如果取出来的数据不足20条 说明数据全部加载完成
      if (res.comments.length < 20) {
        this.pl_finished = true
      }
    },
    // forceRefresh () {
    //   this.getParentCommentDetail(this.comment_id, this.pl_id, this.time)
    //   this.getheaderBoxMsg(this.comment_id, this.pl_id)
    // },
    // 向父组件发送参数
    sendCount () {
      this.$emit('getcount', this.totalCount)
    },
    // 发送评论
    sendComment (t, type, id, content, commentId) {
      console.log(this.$store.state.user.isLogin)
      if (this.$store.state.user.isLogin) {
        sendComment(t, type, id, content, commentId).then((res) => {
          console.log(res)
          this.$toast({ message: '评论发送成功', className: 'toastIndex', position: 'bottom' })
          this.replay = ''
          this.getParentCommentDetail(this.comment_id, this.pl_id, this.time)
          this.getheaderBoxMsg(this.comment_id, this.pl_id)
        })
      } else {
        this.$router.push('/UserLogin')
        this.$toast({ message: '亲，请先登陆哦', className: 'toastIndex', position: 'bottom' })
      }
    }
  },
  // 监听评论id的变化
  watch: {
    targetId (newId, oldId) {
      this.commentsList = []
      this.comment_id = newId
      this.time = ''
      this.pl_finished = false
      this.getheaderBoxMsg(this.comment_id, this.pl_id)
    }
  },
  mounted () {
    // this.getParentCommentDetail(this.comment_id, this.pl_id, this.time)
    this.getheaderBoxMsg(this.comment_id, this.pl_id)
  }
}
</script>

<style lang="less" scoped>
.parentComment {
  height: 600px;
  background-color: #fff;
  .headerBox,
  .pc_body {
    background-color: #fff;
  }
  .pc_title {
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    color: black;
    font-weight: bold;
    background-color: #fff;
    border-top: 8px solid #f7f7f7;
    padding-left: 6px;
  }
  .pc_item {
    padding: 6px 0;
  }
  .h_item,
  .pc_item {
    display: grid;
    grid-template-columns: 16% 84%;
    .hb_pic {
      margin-left: 8px;
      width: 36px;
      height: 36px;
    }
    .hb_content {
      .info {
        height: 36px;
        padding-right: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .userinfo {
          .username {
            font-size: 14px;
          }
          .sendtime {
            margin-top: 4px;
            color: #d2d2d2;
            font-size: 10px;
          }
        }
        .likeinfo {
          display: flex;
          font-size: 12px;
          color: #9c9c9c;
          margin-right: 12px;
          align-items: center;
          height: 16px;
          .count {
            padding-right: 4px;
            padding-top: 0.5px;
          }
          .iconfont {
            font-size: 14px;
            padding-bottom: 3px;
          }
        }
      }
      .commentTxt {
        font-size: 14.6px;
        padding: 2px 0px 14px 0;
        border-bottom: 2px solid #f7f7f7;
        margin-top: 6px;
        .beReplied {
          margin-top: 4px;
          background-color: rgba(230, 230, 230, 0.1);
          font-size: 11.6px;
          color: #9d9d9d;
          margin: 12px 0px 6px;
          border-left: 3px solid #f3f3f3;
          div {
            padding-left: 6px;
            padding-right: 6px;
          }
          .beuser {
            color: #5681b2;
            padding-right: 4px;
          }
        }
      }
    }
  }
  .replay {
    width: 100%;
    border-top: 2px solid #f3f3f3;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    .btnSend {
      display: flex;
      justify-content: center;
      vertical-align: middle;
      width: 100px !important;
      line-height: 44px;
      font-size: 12px !important;
      color: #d70001;
    }
  }
}
</style>

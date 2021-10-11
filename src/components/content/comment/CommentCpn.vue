<template>
  <div id="comment">
    <!-- 头部导航栏 -->
    <van-nav-bar :border="false" fixed @click-left="$store.commit('isShowComment')" class="navbar">
      <template #left>
        <span class="iconfont icon-fanhui"></span>
        <span class="title">评论<span>({{ totalItems }})</span></span>
      </template>
      <template #right>
        <span class="iconfont icon-fenxiang1"></span>
      </template>
    </van-nav-bar>
    <!-- 歌单信息显示区域 -->
    <div class="playlistinfo">
      <div class="pl_header">
        <van-image class="pic" :src="$store.state.commentInfo.picUrl" />
        <div class="info">
          <div class="pl_name van-multi-ellipsis--l2">{{ $store.state.commentInfo.songName }}</div>
          <div class="pl_creator van-ellipsis" v-if="$store.state.commentInfo.author">
            <span v-for="(item, index) in $store.state.commentInfo.author" :key="index">{{ item.name }}</span>
          </div>
        </div>
        <div class="iconfont icon-daohangyou"></div>
      </div>
      <!-- 评论区主体 -->
      <!-- 1. 评论区头部  -->
      <van-sticky offset-top="36px">
        <div class="cm_head">
          <div class="h_title">评论区</div>
          <div class="h_memu">
            <div :class="{ active: style, m_item: true }" @click="sortByHot(2), (style = true)"> 最热 </div>
            <div :class="{ active: !style, m_item: true }" @click="sortByNew(3), (style = false)"> 最新 </div>
          </div>
        </div>
      </van-sticky>
      <!-- 2. 评论区主体内容 -->
      <div class="cm_body" v-if="commentslist.length !== 0">
        <van-list v-model="listLoading" :finished="listFinished" finished-text="没有更多了" @load="getCommentPageInfo(id)">
          <div class="cm_item" v-for="items in commentslist" :key="items.commentId">
            <van-image class="userPic" :src="items.user.avatarUrl" round />
            <div class="cm_info">
              <div class="cm_top">
                <div class="nandt">
                  <div class="name">{{ items.user.nickname }}</div>
                  <div class="time">{{ items.time | formatDate()}}</div>
                </div>
                <div class="like" v-if="items.liked" style="color: red" @click="likeComment(items.commentId, 0)">
                  <span class="count">{{ items.likedCount }}</span>
                  <span class="iconfont icon-zan1"></span>
                </div>
                <div class="like" v-else @click="likeComment(items.commentId, 1)">
                  <span class="count">{{ items.likedCount?items.likedCount:0 }}</span>
                  <span class="iconfont icon-zan"></span>
                </div>
              </div>
              <div class="info_body">
                {{ items.content }}
              </div>
              <div class="cm_bottom" v-if="items.showFloorComment&&items.showFloorComment.replyCount !== 0" @click="issheetShow(items.commentId, id)">
                {{ items.showFloorComment.replyCount }}条回复
                <span class="iconfont icon-daohangyou"></span>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <div class="cm_body" v-else>
        <van-empty description="暂无评论" />
      </div>
    </div>
    <!-- 加载组件 -->
    <van-loading />
    <!-- 楼层评论动作面板组件 -->
    <van-action-sheet v-model="sheetShow" :title="`回复(${pc_totoalCount})`">
      <div class="content">
        <parent-comment-detail ref="floorCpn" :playlistid="id" :targetId="targetId" :comment_type="comment_type" @getcount="getPctotal($event)" />
      </div>
    </van-action-sheet>
    <!-- 底部评论 -->
    <div class="replay">
      <van-field v-model="replay" label="" placeholder="随乐而起，有感而发" />
      <div class="btnSend" @click="sendComment(1,comment_type,id,replay)">发送</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/common/utils'
import { getComment, setCommentLike, sendComment } from 'network/comment'
import ParentCommentDetail from './ParentCommentDetail.vue'
export default {
  name: 'CommentCpn',
  data () {
    return {
      id: this.$store.state.playlist.current.id,
      comment_type: this.$store.state.commentIdType, // 评论类型
      pageNo: 1, // 分页参数,第N页,默认为1
      sortT: 2, // 排序方式
      cursor: '', // 当前点击的评论id
      commentslist: [], // 评论列表

      totalItems: 0, // 总评论数
      style: true,
      sheetShow: false,
      listFinished: false, // 控制评论列表的加载
      listLoading: false,
      targetId: 0,
      pc_totoalCount: 0, // 楼层评论总数
      // 正在输入的回复消息
      replay: ''
    }
  },
  methods: {
    async getCommentPageInfo (id) {
      this.listLoading = true
      // 根据id获取评论列表
      if (this.sortT === 1) {
        let { data: comments } = await getComment(this.comment_type, id, this.pageNo, 1, this.cursor)
        console.log(comments)
        this.totalItems = comments.totalCount
        // 当获取到的评论数===20时候，证明这波取到的数据依然足够一页，需要页数++
        if (comments.comments.length === 20) {
          for (let i = 0; i < 20; i++) {
            this.commentslist.push(comments.comments[i])
          }
          this.pageNo++
          this.cursor = comments.cursor
        }
        if (comments.comments.length < 20) {
          for (let i = 0; i < comments.comments.length; i++) {
            this.commentslist.push(comments.comments[i])
          }
          this.listFinished = true
        }
        // console.log(this.commentslist)
      }
      if (this.sortT === 2) {
        let { data: comments } = await getComment(this.comment_type, id, this.pageNo, 2)
        // console.log(comments)
        this.totalItems = comments.totalCount
        // 当获取到的评论数===20时候，证明这波取到的数据依然足够一页，需要页数++
        if (comments.comments.length === 20) {
          for (let i = 0; i < 20; i++) {
            this.commentslist.push(comments.comments[i])
          }
          this.pageNo++
        }
        if (comments.comments.length < 20) {
          for (let i = 0; i < comments.comments.length; i++) {
            this.commentslist.push(comments.comments[i])
          }
          this.listFinished = true
        }
        // console.log(this.commentslist)
      }
      if (this.sortT === 3) {
        let { data: comments } = await getComment(this.comment_type, id, this.pageNo, 3, this.cursor)
        // console.log(comments)
        this.totalItems = comments.totalCount
        // 当获取到的评论数===20时候，证明这波取到的数据依然足够一页，需要页数++
        if (comments.comments.length === 20) {
          for (let i = 0; i < 20; i++) {
            this.commentslist.push(comments.comments[i])
          }
          this.pageNo++
          this.cursor = comments.cursor
        }
        // 当获取到的评论数<20时候，证明这波取到的数据不够一页，就是最后一页，
        // 说明数据已经全部加载完毕 直接全部push进列表 并且将listFinshied设置为true
        if (comments.comments.length < 20) {
          for (let i = 0; i < comments.comments.length; i++) {
            this.commentslist.push(comments.comments[i])
          }
          this.listFinished = true
        }
      }
      this.listLoading = false
      // console.log(this.commentslist)
    },
    // 点赞/取消点赞
    async likeComment (cid, t) {
      let { data } = await setCommentLike(this.parentId, cid, t, this.type)
      console.log(data)
      // if (data.code !== 200) return this.$msg.fail(data.msg)
      if (this.sortT === 2) {
        this.sortByHot(2)
      } else if (this.sortT === 2) {
        this.sortByNew(3)
      } else {
        this.sortByRec(1)
      }
    },
    // 最热排序
    sortByHot (params) {
      this.pageNo = 1
      this.sortT = params
      this.cursor = ''
      this.commentslist = []
      this.listFinished = false
      this.getCommentPageInfo(this.id)
      this.$forceUpdate()
    },
    // 最新排序
    sortByNew (params) {
      this.pageNo = 1
      this.sortT = params
      this.cursor = ''
      this.commentslist = []
      this.listFinished = false
      this.getCommentPageInfo(this.id)
      this.$forceUpdate()
    },
    // 推荐排序
    sortByRec (params) {
      this.pageNo = 1
      this.sortT = params
      this.cursor = ''
      this.commentslist = []
      this.listFinished = false
      this.getCommentPageInfo(this.id)
    },
    issheetShow (targetId, playlistid) {
      this.sheetShow = true
      this.targetId = targetId
      // this.$refs.floorCpn.forceRefresh()
    },
    // 接收子组件传过来的值
    getPctotal (d) {
      this.pc_totoalCount = d
    },
    // 发送评论
    sendComment (t, type, id, content, commentId) {
      console.log(this.$store.state.user.isLogin)
      if (this.$store.state.user.isLogin) {
        sendComment(t, type, id, content, commentId).then((res) => {
          console.log(res)
          this.$toast({ message: '评论发送成功', className: 'toastIndex', position: 'bottom' })
          this.replay = ''
          this.commentslist.unshift(res.comment)
        })
      } else {
        this.$router.push('/UserLogin')
        this.$toast({ message: '亲，请先登陆哦', className: 'toastIndex', position: 'bottom' })
      }
    }
  },
  filters: {
    formatDate
  },
  components: {
    ParentCommentDetail
  },
  mounted () {
    this.getCommentPageInfo(this.id)
  }
}
</script>

<style lang="less" scoped>
#comment {
  background-color: #f7f7f7;
  .van-action-sheet__header {
    background: #fff;
  }
  .navbar {
    background: #fff;
    .t_icon {
      color: #000;
      font-size: 16px;
    }
    .icon-fanhui {
      font-size: 20px;
      color: #000;
      padding-bottom: 2.5px;
    }
    .title {
      font-size: 17px;
      margin-left: 20px;
      color: #000;
      span {
        font-weight: bold;
      }
    }
    .icon-fenxiang1 {
      font-size: 20px;
      padding-bottom: 3px;
    }
  }
  .playlistinfo {
    margin-top: 46px;
    .pl_header {
      display: flex;
      height: 90px;
      align-items: center;
      background-color: #fff;
      .pic {
        width: 70px;
        height: 70px;
        border-radius: 6px;
        overflow: hidden;
        margin: 0 14px;
      }
      .info {
        width: 260px;
        .pl_name {
          font-size: 15px;
          color: #000;
        }
        .pl_creator {
          margin-top: 6px;
          font-size: 12px;
          color: #638bb8;
        }
      }
      .icon-daohangyou {
        width: 34px;
        color: #9e9e9e;
        position: static;
        font-size: 16px;
      }
    }
    .cm_head {
      margin-top: 8px;
      background-color: #fff;
      display: flex;
      height: 36px;
      align-items: center;
      justify-content: space-between;
      font-size: 12.6px;
      padding: 0 6px;
      font-weight: 600;
      .h_title {
        padding-left: 8px;
        color: #000;
        font-size: 14px;
      }
      .h_memu {
        display: flex;
        color: #a6a6a6;
        .m_item {
          margin: 0 10px;
        }
        .active {
          color: #000;
        }
      }
      .active {
        color: #000;
      }
    }
    .cm_body {
      background-color: #fff;
      .cm_item {
        display: grid;
        grid-template-columns: 16% 84%;
        justify-items: center;
        padding-top: 10px;
        .userPic {
          margin-top: 1.5px;
          width: 36px;
          height: 36px;
        }
        .cm_info {
          padding: 0 16px 4px 4px;
          border-bottom: 1px solid #f7f7f7;
          .cm_top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 300px;
            height: 40px;
            .nandt {
              .name {
                font-size: 14px;
                color: #666666;
              }
              .time {
                font-size: 8px;
                margin-top: 2px;
                color: #d2d2d2;
              }
            }
            .like {
              font-size: 13.2px;
              color: #9c9c9c;
              .count {
                font-size: 12px;
                margin-right: 4px;
              }
              .iconfont {
                font-size: 14px;
                padding-bottom: 0.5px;
              }
            }
          }
          .info_body {
            margin: 4px 0;
            padding-right: 6px;
            font-size: 14px;
            color: #3a3a3a;
          }
          .cm_bottom {
            display: flex;
            align-items: center;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #5681b2;
            .icon-daohangyou {
              position: static;
              color: #5681b2;
              padding-left: 2px;
              padding-bottom: 1px;
            }
          }
        }
      }
    }
  }
  .content {
    width: 100%;
    height: 600px;
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

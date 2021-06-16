<template>
  <div id="userInfo">
    <!-- 头部导航栏 -->
    <van-nav-bar :border="false" fixed :class="navbarClass" @click-left="$router.go(-1)" >
      <template #left>
        <span class="iconfont icon-fanhui" :class="{colorBlack:iconColor}"></span>
      </template>
      <template #title>
        <div class="nb_title">
          <div class="t_info">
            <div class="username">{{ profile.nickname }}</div>
            <div class="userfansCount">
              {{ profile.followeds | toStringNum }} 粉丝
            </div>
          </div>
          <div class="t_btn" style="color: #9d9d9d; background-color: #e6e6e6" v-if="profile.followed" @click="follow(profile.userId, 0)">已关注</div>
          <div class="t_btn" style="color: #fff; background-color: #ff3a3a" v-else @click="follow(profile.userId, 1)">+ 关注</div>
        </div>
      </template>
      <template #right>
        <span class="iconfont icon-ziyuan"  :class="{colorBlack:iconColor}"></span>
      </template>
    </van-nav-bar>
    <!-- 主体内容 -->
    <div class="userMessage" :style="backgroundImage">
      <div class="um_info">
        <van-image class="avatr" :src="profile.avatarUrl" />
        <div class="info">
          <div class="username weightBold">{{ profile.nickname }}</div>
          <div class="count">
            <div>{{ profile.follows }}<span class="txt">关注</span></div>
            <div>{{ profile.followeds | toStringNum }}<span class="txt">粉丝</span>
            </div>
            <div>Lv.{{ level }}</div>
          </div>
          <div class="signature van-ellipsis">{{ profile.signature }}</div>
          <div class="btn">
            <div class="gz_ed" v-if="profile.followed" @click="follow(profile.userId, 0)">已关注</div>
            <div class="gz" v-else @click="follow(profile.userId, 1)"> + 关注</div>
            <div class="sx"> <span class="iconfont icon-xinfeng"></span> </div>
          </div>
        </div>
      </div>
      <van-tabs v-model="active" :background="tabsbgcolor" offset-top="46px" sticky color="#5282E7" class="tabs">
        <van-tab title="主页">
          <div class="tab_div baseinfo">
            <div class="title weightBold">基本信息</div>
            <div class="when">
              村龄：{{ createDays }}年（{{
                profile.createTime | formatDate
              }}注册）
            </div>
            <div class="when" v-if="profile.gender === 0">性别：保密</div>
            <div class="when" v-if="profile.gender === 1">性别：男</div>
            <div class="when" v-if="profile.gender === 2">性别：女</div>
          </div>
          <div class="tab_div musicinfo">
            <div class="title weightBold">音乐品味</div>
            <div class="mi_item">
              <van-icon name="bar-chart-o" class="my-icon" />
              <div class="info">
                <div class="i_title">听歌排行</div>
                <div class="dep">累计听歌{{listenSongs}}首</div>
              </div>
            </div>
            <div class="mi_item" @click="toSheet(userLikesPlist.id)">
              <van-icon name="like" class="my-icon" />
              <div class="info">
                <div class="i_title">{{ userLikesPlist.name }}</div>
                <div class="dep">{{userLikesPlist.trackCount}}首，播放{{userLikesPlist.playCount}}次</div>
              </div>
            </div>
          </div>
          <div class="tab_div playlistcreate">
            <div class="title weightBold">创建的歌单<span class="s_title weightNormal">
              ({{profile.playlistCount - 1}}个歌单，被收藏{{profile.playlistBeSubscribedCount}}次)</span>
            </div>
            <div
              class="mi_item"
              v-for="items in userCreatedPlist"
              :key="items.id"
              @click="toSheet(items.id)"
            >
              <div class="pic">
                <van-image :src="items.coverImgUrl" class="pic_img" />
              </div>
              <div class="info">
                <div class="i_title van-ellipsis">
                  {{ items.name }}
                </div>
                <div class="dep van-ellipsis">{{ items.trackCount }}首<span v-if="items.playCount!==0">，播放{{items.playCount | toStringNum}}次</span></div>
              </div>
            </div>
          </div>
          <div class="tab_div playlistsub">
            <div class="title weightBold">
              收藏的歌单<span class="s_title weightNormal"
                >( {{ userSubPlist.length }} )</span
              >
            </div>
            <div class="mi_item" v-for="items in userSubPlist" :key="items.id" @click="toSheet(items.id)">
              <div class="pic">
                <van-image :src="items.coverImgUrl" class="pic_img" />
              </div>
              <div class="info">
                <div class="i_title van-ellipsis">
                  {{ items.name }}
                </div>
                <div class="dep van-ellipsis">
                  {{ items.trackCount }}首，by
                  {{ items.creator.nickname }}，播放{{
                    items.playCount | toStringNum
                  }}次
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab>
          <template #title>
            动态 <span class="tabnum" v-if="profile.eventCount!==0">{{ profile.eventCount }}</span>
          </template>
          <div class="event">
            <div class="empty" v-if="profile.eventCount === 0">
              <van-empty description="暂无动态哦" />
            </div>
            <div v-else>
              <!-- <event :uid="uid" /> -->
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <br />
    </div>
    <!-- 加载组件 -->
  </div>
</template>

<script>
import { getUserDetail, getUserPlayList, getFollow } from 'network/user'
import { toStringNum, toMs, formatDate } from 'common/utils'
export default {
  name: 'userinfo',
  data () {
    return {
      // tab item 索引
      active: 0,
      // 用户创建日期
      createDays: 0,
      // tab背景颜色
      tabsbgcolor: 'transparent',
      // icon color
      iconColor: false,
      // 导航栏类名
      navbarClass: 'navbar1',
      // 用户id
      uid: Number(this.$route.query.id),
      // 背景图片
      backgroundImage: '',
      // 用户详细信息
      profile: {},
      // 用户等级
      level: 0,
      // 用户喜欢的音乐歌单
      userLikesPlist: {},
      // 用户创建的歌单
      userCreatedPlist: [],
      // 用户收藏的歌单
      userSubPlist: [],
      // 听歌排行
      listenSongs: 0
    }
  },
  components: {
  },
  filters: {
    toStringNum,
    toMs,
    formatDate
  },
  methods: {
    // 初始化页面
    init (id) {
      this.getUserDetail(id)
      this.getUserPlaylist(id)
    },
    // 获取用户详情
    async getUserDetail (uid) {
      await getUserDetail(uid).then(user => {
        console.log(user)
        if (user.code === 200) {
          this.level = user.level
          this.createDays = Math.floor(user.createDays / 365)
          this.profile = user.profile
          this.listenSongs = user.listenSongs
          this.backgroundImage = `background-image:url(${user.profile.backgroundUrl})`
        }
      })
    },
    // 获取用户歌单
    async getUserPlaylist (uid) {
      await getUserPlayList(uid).then(userpl => {
        // console.log(userpl)
        if (userpl.code === 200) {
          for (let i = 0; i < userpl.playlist.length; i++) {
            if (userpl.playlist[i].specialType === 5) {
              this.userLikesPlist = userpl.playlist[i]
            } else if (userpl.playlist[i].userId === uid) {
              this.userCreatedPlist.push(userpl.playlist[i])
            } else {
              this.userSubPlist.push(userpl.playlist[i])
            }
          }
        }
      })
    },
    // 关注 / 取消关注用户
    async follow (id, t) {
      await getFollow(id, t).then(res => {
        console.log(res)
      })
    },
    // 滑动相关
    handleScroll () {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      if (scrollTop > 234) {
        this.navbarClass = 'navbar2'
        this.iconColor = true
      } else {
        this.navbarClass = 'navbar1'
        this.iconColor = false
      }
      if (scrollTop > 384) {
        this.tabsbgcolor = '#fff'
      } else {
        this.tabsbgcolor = 'transparent'
      }
    },
    // 跳转歌单详情页
    // 跳转歌单详情页
    toSheet (id) {
      this.$router.push('/musicSheet/' + id + '&' + false)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.init(this.uid)
  }
}
</script>
<style lang="less">
#userInfo {
  background-color: #f5f5f5;
  .navbar1 {
    background-color: transparent;
    .nb_title {
      opacity: 0;
    }
  }
  .navbar2 {
    background-color: #fff;
    z-index: 10;
    .nb_title {
      width: 250px;
      color: #000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: 1;
      .t_info {
        .username {
          font-size: 15.2px;
        }
        .userfansCount {
          font-size: 10px;
          color: #6f6f6f;
          text-align: left;
          height: 12px;
          line-height: 12px;
        }
      }
      .t_btn {
        background-color: #ff3a3a;
        color: #fff;
        height: 24px;
        width: 60px;
        line-height: 24px;
        border-radius: 15px;
        font-size: 10px;
        padding: 0px 5px;
      }
    }
  }
  .userMessage {
    padding-top: 190px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0px -40px;
    .um_info {
      margin: 50px auto 6px;
      width: 340px;
      border-radius: 15px;
      background-color: #fff;
      position: relative;
      .avatr {
        width: 78px;
        height: 78px;
        border-radius: 50%;
        border: 3px solid #fff;
        overflow: hidden;
        position: absolute;
        left: 50%;
        top: -39px;
        transform: translateX(-50%);
      }
      .info {
        width: 100%;
        padding-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .username {
          font-size: 20px;
        }
        .count {
          margin-top: 6px;
          font-size: 12px;
          display: grid;
          grid-template-columns: repeat(3, 33%);
          justify-content: center;
          > div {
            text-align: center;
            line-height: 20px;
            width: 60px;
            height: 20px;
            color: black;
            .txt {
              color: #a4a4a4;
            }
          }
        }
        .signature {
          margin-top: 6px;
          width: 300px;
          font-size: 12px;
          color: #a4a4a4;
          text-align: center;
        }
        .btn {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 130px;
          height: 60px;
          > div {
            height: 24px;
            font-size: 12px;
            text-align: center;
            line-height: 24px;
            border-radius: 15px;
          }
          .gz {
            width: 86px;
            color: #fff;
            background-color: #ff3a3a;
            padding: 0px 16px;
          }
          .gz_ed {
            color: #9d9d9d;
            background-color: #e6e6e6;
          }
          .sx{
            width: 23px;
            height: 23px;
            border-radius: 50%;
            border: 1px solid #cecaca;
            display: flex;
            align-items: center;
            justify-content: center;
            span{
              font-size: 12px;
              color: black;
            }
          }
        }
      }
    }
    .tabs {
      .tab_div {
        background-color: #fff;
        margin: 16px auto;
        width: 340px;
        border-radius: 15px;
        padding: 16px 14px;
        box-sizing: border-box;
        .title {
          font-size: 16px;
        }
      }
      .van-tabs__wrap{
        height: 34px;
      }
      .van-tab__text{
        font-size: 14px;
      }
      .van-tabs__line{
        background: red !important;
        width: 30px;
        top: 20px;
      }
      .van-tab__text{
        z-index: 10;
      }
      .baseinfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .when {
          font-size: 12px;
          color: #a4a4a4;
          margin-top: 10px;
        }
      }
      .musicinfo {
        .mi_item {
          height: 60px;
          display: flex;
          align-items: center;
          margin-top: 6px;
          .my-icon {
            width: 46px;
            height: 46px;
            background-color: #e84345;
            color: #fff;
            border-radius: 5px;
            line-height: 46px;
            text-align: center;
            font-size: 20px;
          }
          .info {
            margin-left: 10px;
            .i_title {
              font-size: 14px;
              color: black;
            }
            .dep {
              font-size: 12px;
              margin-top: 4px;
              color: #919191;
            }
          }
        }
      }
      .playlistcreate,
      .playlistsub {
        .s_title {
          font-size: 12px;
          margin-left: 6px;
          color: #9d9d9d;
        }
        .mi_item {
          height: 60px;
          display: flex;
          align-items: center;
          margin-top: 6px;
          .pic {
            width: 46px;
            height: 46px;
            border-radius: 6px;
            overflow: hidden;
            .pic_img {
              width: inherit;
              height: inherit;
            }
          }
          .info {
            margin-left: 10px;
            width: 260px;
            .i_title {
              font-size: 14px;
              color: black;
            }
            .dep {
              font-size: 12px;
              margin-top: 4px;
              color: #919191;
            }
          }
        }
      }
    }
  }
  .tabnum {
    font-size: 8px;
    padding-left: 4px;
    position: absolute;
    top: 6px;
  }
  .event {
    height: 600px;
  }
  .icon-ziyuan, .icon-fanhui{
    font-size: 20px;
    color:white;
  }
  .colorBlack{
    color: #333 !important;
  }
  .weightBold{
    font-weight: bold;
    color: black;
  }
  .weightNormal{
    font-weight: normal;
  }
}
</style>

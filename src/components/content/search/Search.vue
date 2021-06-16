<template>
  <div id="search">
    <div class="searchNav">
      <span class="iconfont icon-fanhui" @click="backHome"></span>
      <van-search v-model="searchValue" :placeholder="defultWorld.showKeyword" @input="SearchMsgBoxAndContentShow" @search="toSearchInput(searchValue)">
        <template #left-icon>
          <span></span>
        </template>
      </van-search>
    </div>
    <router-view :key="$route.fullPath" />
    <transition name="van-fade">
      <div v-show="isShowMsgBox" class="searchMsgBox">
        <div class="searchtitle van-ellipsis" @click="toSuggestSearch(searchValue)"> 搜索 “{{ searchValue }}”</div>
        <div class="searchItem" v-for="(item, index) in searchSuggest" :key="index" @click="toSuggestSearch(item.keyword)">
          <span class="iconfont icon-sousuo sIcon"></span>
          <span class="van-ellipsis">{{ item.keyword }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { _getDefaultHotKey, _getSuggestSearch } from 'network/search'
export default {
  data () {
    return {
      searchValue: '',
      defultWorld: {},
      searchSuggest: [],
      isShowMsgBox: false
    }
  },
  methods: {
    MenuPopup () {
      this.$Bus.$emit('openPopup', () => {}) // 事件总线
    },
    backHome () {
      this.$router.push('/home')
    },
    // 取到搜索的关键词
    getBackKeyw (data) {
      this.searchValue = data
    },
    // 搜索核心方法
    toSearch (val) {
      this.$router.push({
        path: '/search/searchConent',
        query: { val }
      })
    },
    // 表单直接搜索
    toSearchInput (searchValue) {
      if (searchValue === '') {
        this.toSearch(this.defultWorld.realkeyword)
      } else {
        this.toSearch(searchValue)
      }
      this.isShowMsgBox = false
    },
    // 推荐搜索选项卡搜索
    toSuggestSearch (v) {
      this.toSearchInput(v)
    },
    // 控制搜索框的显示和隐藏
    SearchMsgBoxAndContentShow () {
      if (this.searchValue !== '') {
        this.isShowMsgBox = true
      } else {
        this.isShowMsgBox = false
      }
      // 获取推荐搜索
      this.getSuggestSearch(this.searchValue)
    },
    // 获取推荐搜索内容
    async getSuggestSearch (keywords) {
      if (keywords === '') return
      await _getSuggestSearch(keywords).then(res => {
        // console.log(res)
        this.searchSuggest = res.result.allMatch
      })
    }
  },
  created () {
    _getDefaultHotKey().then(res => {
      // console.log(res)
      this.defultWorld = res.data
    })
  }
}
</script>

<style lang="less">
#search {
  .searchNav{
    display: flex;
    align-items: center;
    .icon-fanhui{
      font-size: 20px;
      padding-left: 12px;
    }
    .van-search__content{
      padding: 0;
      width: 320px;
      background: #fff;
      .van-cell{
        border-bottom: 1px solid #858585;
      }
    }
    .van-cell__value{
      font-size: 15px;
    }
  }
  .searchMsgBox {
    width: 84.5%;
    background-color: #fff;
    position: absolute;
    top: 54px;
    left: 54%;
    transform: translateX(-50%);
    box-shadow: 0 0 12px 2px #ccc;
    font-size: 13px;
    box-sizing: border-box;
    z-index: 2;
    .searchtitle {
      height: 46px;
      line-height: 46px;
      color: #507daf;
      font-size: 14px;
      border-bottom: 1px solid #f3f3f3;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .searchItem {
      height: 46px;
      width: 100%;
      display: flex;
      align-items: center;
      color: #828282;
      border-bottom: 1px solid #f3f3f3;
      padding: 0 10px;
      box-sizing: border-box;
      .sIcon {
        font-size: 20px;
        margin-right: 4px;
      }
    }
  }
}
</style>

<template>
  <div class="TopListItem">
    <div>
      <div class="TopListTitle">{{list.name}}<span class="iconfont icon-daohangyou"></span></div>
      <ul>
        <li v-for="(item,index) in musicList" :key="index">
          <a href="">
            <div><img :src="item.picUrl" alt=""><span class="iconfont icon-bofang"></span></div>
            <span class="listindex">{{index+1}}</span>
            <span class="TopListItemName">{{item.name}}</span>
            <span class="TopListItemarName"> - {{item.arname}}</span>
            <span class="iconfont icon-new"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { gettoplist } from 'network/home'
export default {
  name: 'TopListItem',
  data () {
    return {
      musicList: []
    }
  },
  props: {
    list: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {
    gettoplist(this.list.id).then((res) => {
      let path = res.playlist.tracks
      for (let i = 0; i < 3; i++) {
        this.musicList.push({
          id: path[i].al.id, // id
          name: path[i].al.name, // 歌名
          arname: path[i].ar[0].name, // 歌手名
          picUrl: path[i].al.picUrl
        })
      }
    })
  }
}
</script>

<style>
.TopListItem{
  display: flex;
  align-content: center;
  justify-content: center;
}
.TopListItem>div{
  width: 314px;
  background: white;
  border: 1px #e1e1e1 solid;
  box-shadow: 0px 0px 3px 2px #e1e1e1;
  border-radius: 10px;
  margin: 8px 0px 20px 0px;
}
.TopListItem li img{
  width: 55px;
  vertical-align: -webkit-baseline-middle;
  border-radius: 10px;
}
.TopListTitle{
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-align: center;
  height: 40px;
  line-height: 42px;
}
.TopListTitle>.icon-daohangyou{
  font-size: 18px;
  font-weight: 100;
}
.TopListItem li{
  padding: 0px 6px 12px 12px;
}
.TopListItem li a{
  display: flex;
  align-items: center;
}
.TopListItem li a>div{
  position: relative;
}
.TopListItem li a>div>.icon-bofang{
  position: absolute;
  top: 16px;
  left: 17px;
  font-size: 21px;
  color: white;
  opacity: 0.8;
}
.listindex{
  padding: 0 6px;
  font-size: 14px;
  color: #000;
  font-weight: bold;
}
.TopListItemName{
  padding: 0 0 0 2px;
  font-size: 14px;
  color: #000;
  white-space: nowrap;
}
.TopListItemarName{
  padding: 0 5px;
  font-size: 10px;
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.TopListItem li a>.icon-new{
  color: #609d61;
  font-size: 40px;
  margin-left: auto;
}
</style>

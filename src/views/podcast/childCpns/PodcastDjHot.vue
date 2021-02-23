<template>
  <div class="PodcastDjHot">
    <div class="ProfileRecItem">
      <div v-for="(item,index) in sheets" :key="index" :showRcmdText="true">
        <sheet-item :sheet='item'></sheet-item>
      </div>
    </div>
  </div>
</template>

<script>
import SheetItem from 'components/content/sheetItem/SheetItem.vue'
import { getDjHot } from 'network/podcast'
export default {
  name: 'PodcastDjHot',
  data () {
    return {
      sheets: [],
      order: 'hot',
      cat: '全部',
      limit: 6,
      offset: 24
    }
  },
  components: { SheetItem },
  created () {
    getDjHot(this.limit, this.offset).then(res => {
      this.sheets = res.djRadios
    })
  }
}
</script>

<style>
.ProfileRecItem{
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0px 12px 10px
}
.ProfileRecItem>div{
  flex: 33%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 3px -12px;
}
</style>

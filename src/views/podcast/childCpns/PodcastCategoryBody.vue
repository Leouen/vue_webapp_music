<template>
  <div class="PodcastCategoryBody" v-if="titles">
    <div v-for="(item, index) in list" :key="index">
      <title-bar :titles='getData(item)'></title-bar>
      <div class="PodcastDjRecItem" >
        <sheet-item :sheet='item.radios[0]' :showRcmdText="true"></sheet-item>
        <sheet-item :sheet='item.radios[1]' :showRcmdText="true"></sheet-item>
        <sheet-item :sheet='item.radios[2]' :showRcmdText="true"></sheet-item>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from '../../../components/common/titlebar/TitleBar.vue'
import SheetItem from '../../../components/content/sheetItem/SheetItem.vue'
export default {
  name: 'PodcastCategoryBody',
  components: { SheetItem, TitleBar },
  data () {
    return {
      titles: []
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    getData (item) {
      return {
        left: item.categoryName,
        right: '更多',
        id: item.categoryId
      }
    }
  }
}
</script>

<style>

</style>

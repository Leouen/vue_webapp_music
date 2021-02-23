<template>
  <div class="PodcastDjRecItem" v-if="list.radios">
    <sheet-item :sheet='list.radios[0]' :showRcmdText="true"></sheet-item>
    <sheet-item :sheet='list.radios[1]' :showRcmdText="true"></sheet-item>
    <sheet-item :sheet='list.radios[2]' :showRcmdText="true"></sheet-item>
  </div>
</template>

<script>
import SheetItem from '../../../components/content/sheetItem/SheetItem.vue'
export default {
  components: { SheetItem },
  name: 'PodcastDjRecItem',
  props: {
    list: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style>
.PodcastDjRecItem{
  margin: 5px auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

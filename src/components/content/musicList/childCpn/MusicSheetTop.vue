<template>
  <div class="MusicSheetTop">
    <div class="sheetTopBox">
      <sheet-item class="TopBoxLeft"></sheet-item>
      <div class="TopBoxRight">
        <div class="TopBoxTitle"></div>
        <div class="producer"></div>
        <div class="description"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SheetItem from '../../sheetItem/SheetItem.vue'
export default {
  components: { SheetItem },
  name: 'MusicSheetTop'
}
</script>

<style>

</style>

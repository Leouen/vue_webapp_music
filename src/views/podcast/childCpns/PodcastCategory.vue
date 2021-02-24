<template>
  <div class="PodcastCategory">
    <a class="CategoryItme" href="" v-for="(item, index) in data" :key="index">
        <img :src="item.url" alt="">
        <span>{{item.name}}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      data: [
        {
          url: require('@/assets/img/podcast/DJ/1.svg'),
          name: '情感调频',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/2.svg'),
          name: '音乐故事',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/3.svg'),
          name: '声音恋人',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/4.svg'),
          name: '声之剧场',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/5.svg'),
          name: '脱口秀',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/6.svg'),
          name: '侃侃而谈',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/7.svg'),
          name: '创作翻唱',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/8.svg'),
          name: '电音趴',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/9.svg'),
          name: '助眠解压',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/10.svg'),
          name: '你好爱豆',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/11.svg'),
          name: '广播电台.',
          src: ''
        },
        {
          url: require('@/assets/img/podcast/DJ/12.svg'),
          name: '更多',
          src: ''
        }
      ]
    }
  }
}
</script>

<style scoped>
.PodcastCategory{
  display: flex;
  justify-content: center;
  justify-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.CategoryItme{
  flex: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.CategoryItme img{
  width: 28px;
  height: 28px;
  margin: 18px 10px 8px;
}
.CategoryItme span{
  font-size: 12px;
  margin-bottom: 6px;
}
</style>

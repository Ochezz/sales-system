<template>
  <div v-bind:class="widthLevel">
    <div class="card">
      <div class="header">
        <slot name="title">{{title}}</slot>
        <div v-if="detail" class='detail-icon-wrap'>
          <router-link :to="{path:link}">
            <i class="ti-plus detail-icon"></i>
          </router-link>
        </div>
      </div>
      <div class="content">
        <div :id="chartId" class="ct-chart"></div>
        <div v-if="chartType==='Pie'" class="pie-footer">
          <div v-for="(device, index) in datas.devices" :key="device" class="pie-legend-wrap">
            <i v-if="device=='mobile'" class="ti-mobile icon-info pie-icon"></i>
            <i v-else-if="device=='desktop'" class="ti-desktop icon-info pie-icon"></i>
            <i v-else class="ti-tablet icon-info pie-icon"></i>
            <span v-if="device=='mobile'">모바일</span>
            <span v-else-if="device=='desktop'">데스크톱</span>
            <span v-else>태블릿</span>
            <span>{{datas.series[index].value + '%'}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'chart-card',
    props: {
      title: {
        type: String,
        default: 'Chart title'
      },
      chartType: {
        type: String,
        default: 'Line' // Line | Pie | Bar
      },
      options: {
        type: Object,
        default: () => {
          return {}
        }
      },
      datas: {
        type: Object,
        default: () => {
          return {
            labels: [],
            series: []
          }
        }
      },
      widthLevel: {
        type: String,
        default: 'col-md-6' // 50% col-md-1 ~ col-md-12
      },
      link: {
        type: String,
        default: ''
      },
      detail: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        chartId: 'no-id'
      }
    },
    methods: {
      /***
       * Initializes the chart by merging the chart options sent via props and the default chart options
       */
      initChart () {
        var chartIdQuery = `#${this.chartId}`
        this.$Chartist[this.chartType](chartIdQuery, this.datas, this.options)
      },
      /***
       * Assigns a random id to the chart
       */
      updateChartId () {
        var currentTime = new Date().getTime().toString()
        var randomInt = this.getRandomInt(0, currentTime)
        this.chartId = `div_${randomInt}`
      },
      getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
    },
    created () {
      this.updateChartId()
      this.$nextTick(this.initChart)
    },
    watch: {
      'datas.labels': {
        handler () {
          if (this.datas.labels.length > 0) {
            this.updateChartId()
            this.$nextTick(this.initChart)
          }
        },
        immediate: true
      }
    }
  }

</script>
<style>

</style>

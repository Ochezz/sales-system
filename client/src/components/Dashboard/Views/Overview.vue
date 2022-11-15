<template>
  <div>
    <div class="row">
      <div class="col-md-12 update-header-wrap">
        <button @click="updateDate">
          <i class="ti-reload"></i>
        </button>
          마지막 갱신 {{nowDate}}
      </div>
    </div>
    <div class="row">
      <OneDataTableCard title="오늘 방문자수" :data="users" widthLevel="col-md-3"/>
      <OneDataTableCard title="세션당 페이지수" :data="sessions" widthLevel="col-md-3"/>
      <OneDataTableCard title="평균 세션 시간" :data="avgSessionDuration" widthLevel="col-md-3"/>
      <OneDataTableCard title="관심고객등록(오늘/총계)" :data="tdRegData" widthLevel="col-md-3"/>
    </div>
    <div class="row">
      <ChartCard title="방문자현황" :options="lineChartOption" :datas="activeUserData" link="/detail/activeUser" widthLevel="col-md-6"/>
      <ChartCard title="관심고객등록 거주지" chartType="Bar" :options="barChartOption" link="/customer/list" :datas="mLocationData" widthLevel="col-md-3"/>
      <ChartCard title="관심고객등록 연령대" chartType="Bar" :options="barChartOption" link="/customer/list" :datas="mAgeData" widthLevel="col-md-3"/>
    </div>
    <div class="row">
      <TableListCard title="지역별 유입수" :tableData="locationData" link="/detail/location" widthLevel="col-md-3"/>
      <ChartCard title="채널별 유입현황" chartType="Bar" :options="horizontalBarChartOption" :datas="channelData" link="/detail/channel" widthLevel="col-md-3 channel-bar-chart"/>
      <ChartCard title="접속 디바이스" chartType="Pie" :options="pieChartOption" :datas="deviceData" link="/detail/device" widthLevel="col-md-3"/>
      <TableListCard title="콘텐츠 페이지뷰" :tableData="visitedPathData" link="/detail/visitedPath" widthLevel="col-md-3"/>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
const dashboardStore = 'dashboardStore'

import ChartCard from '../../UIComponents/Cards/Chart/ChartCard.vue'
import TableListCard from '../../UIComponents/Cards/Table/TableListCard.vue'
import TableListCardPlan from '../../UIComponents/Cards/Table/TableListCardPlan.vue'
import OneDataTableCard from '../../UIComponents/Cards/Table/OneDataTableCard.vue'
import Tooltip from 'chartist-plugin-tooltips-updated'

import * as COMMON from '../../../common/globalFunction'

export default {
  components: {
    ChartCard,
    TableListCard,
    TableListCardPlan,
    OneDataTableCard
  },
  async created () {
    // loading screen
    this.loadingInstance = this.$veLoading({
      fullscreen: true,
      name: 'flow',
      lock: true
    })

    await this.callApi()

    let date = new Date()
    this.nowDate = COMMON.default.changeDateTimeFormat(date)
  },
  destroyed () {
    this.loadingInstance.destroy()
  },
  methods: {
    // page update
    async updateDate () {
      let date = new Date()
      await this.callApi()
      this.nowDate = COMMON.default.changeDateTimeFormat(date)
    },
    async callApi () {
      this.loadingInstance.show()

      // call api
      try {
        await Promise.all([
          this.getInfo(),
          this.getActiveUser(),
          this.getDevice(),
          this.getLocation(),
          this.getVisitedPath(),
          this.getTdReg(),
          this.getMLocation(),
          this.getMAge(),
          this.getChannel()
        ])
      }
      catch (e) {
        console.error(e)
        await this.loadingInstance.close()
        this.$router.push('/apiError')
      }

      await this.loadingInstance.close()
    },
    ...mapActions(dashboardStore, [
      'getInfo',
      'getActiveUser',
      'getDevice',
      'getLocation',
      'getVisitedPath',
      'getTdReg',
      'getMLocation',
      'getMAge',
      'getChannel'
    ])
  },
  computed: {
    ...mapGetters(dashboardStore, {
      users: 'getUsers',
      sessions: 'getSessions',
      avgSessionDuration: 'getAvgSessionDuration',
      activeUserData: 'getActiveUserData',
      deviceData: 'getDeviceData',
      locationData: 'getLocationData',
      visitedPathData: 'getVisitedPathData',
      tdRegData: 'getTdRegData',
      mLocationData: 'getMLocationData',
      mAgeData: 'getMAgeData',
      channelData: 'getChannelData'
    })
  },
  data () {
    return {
      nowDate: '',
      chart1Data: {
        labels: ['9일전', '8일전', '7일전', '6일전', '6일전', '6일전'],
        series: [52, 30, 13, 10, 9, 4]
      },
      lineChartOption: {
        fullWidth: true,
        chartPadding: {
          left: 10,
          right: 40
        },
        axisY: {
          labelInterpolationFnc: (value) => COMMON.default.numberWithCommas(value),
          onlyInteger: true
        },
        plugins: [
          Tooltip({
            appendToBody: true,
            currency: true,
            tooltipOffset: {
              x: -10,
              y: -20
            },
            currencyFormatCallback: (value) => COMMON.default.numberWithCommas(value)
          })
        ]
      },
      barChartOption: {
        distributeSeries: true,
        axisY: {
          labelInterpolationFnc: (value) => COMMON.default.numberWithCommas(value),
          onlyInteger: true
        },
        plugins: [
          Tooltip({
            pointClass: 'ct-bar',
            appendToBody: true,
            tooltipOffset: {
              x: -10,
              y: -20
            },
            currency: true,
            currencyFormatCallback: (value) => COMMON.default.numberWithCommas(value)
          })
        ]
      },
      horizontalBarChartOption: {
        distributeSeries: true,
        horizontalBars: true,
        reverseData: true,
        chartPadding: {
          left: 30,
          right: 25
        },
        axisY: {
          offset: 110,
          onlyInteger: true
        },
        axisX: {
          onlyInteger: true
        },
        plugins: [
          Tooltip({
            pointClass: 'ct-bar',
            appendToBody: true,
            tooltipOffset: {
              x: -10,
              y: -20
            },
            currency: true,
            currencyFormatCallback: (value) => value + '%'
          })
        ]
      },
      pieChartOption: {
        donut: true,
        donutWidth: 60,
        donutSolid: true,
        startAngle: 270,
        showLabel: false,
        plugins: [
          Tooltip({
            pointClass: 'ct-slice-donut',
            appendToBody: true,
            tooltipOffset: {
              x: -10,
              y: -20
            },
            currency: true,
            currencyFormatCallback: (value) => value + '%'
          })
        ]
      },
      loadingInstance: null
    }
  }
}
</script>
<style>

</style>

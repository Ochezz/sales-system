<template>
    <div class="row">
      <h4>방문자현황(상세)</h4>
      <div class="detail-table-cal">
        <div class="row">
          <div class="col-md-12 update-header-wrap">
            <button @click="updateDate">
              <i class="ti-reload"></i>
            </button>
              마지막 갱신 {{nowDate}}
          </div>
        </div>
        <section>
          <fieldset>
            <input id="item-1" class="radio-inline-input item-1" type="checkbox" name="accessible-radio" value="day1" checked="checked" @change="checkValChange($event.target.value)"/>
            <label class="radio-inline-label" for="item-1">
                1일 활성 사용자
            </label>
            <input id="item-2" class="radio-inline-input item-2" type="checkbox" name="accessible-radio" value="day7" @change="checkValChange($event.target.value)"/>
            <label class="radio-inline-label" for="item-2">
                7일간 우수 사용자
            </label>
            <input id="item-3" class="radio-inline-input item-3" type="checkbox" name="accessible-radio" value="day14" @change="checkValChange($event.target.value)"/>
            <label class="radio-inline-label" for="item-3">
                14일간 우수 사용자
            </label>
            <input id="item-4" class="radio-inline-input item-4" type="checkbox" name="accessible-radio" value="day28" @change="checkValChange($event.target.value)"/>
            <label class="radio-inline-label" for="item-4">
                28일 활성 사용자
            </label>
          </fieldset>
          <date-picker v-model="dateRange" type="date" range placeholder="날짜범위를 선택해주세요" :lang="lang" @change="changeDateRange()"></date-picker>
        </section>
      </div>
      <ChartCard title="활성 사용자" :options="chartOption" :datas="chartData" link="/admin/overview" :detail="false" widthLevel="col-md-12 active-user-detail"/>
      <StatsCard title="1일 활성 사용자" :statsData="summary.day1" widthLevel="col-md-3"/>
      <StatsCard title="7일간 우수 사용자" :statsData="summary.day7" widthLevel="col-md-3"/>
      <StatsCard title="14일간 우수 사용자" :statsData="summary.day14" widthLevel="col-md-3"/>
      <StatsCard title="28일 활성 사용자" :statsData="summary.day28" widthLevel="col-md-3"/>
    </div>
</template>
<script>
  import ChartCard from '../../UIComponents/Cards/Chart/ChartCard.vue'
  import StatsCard from '../../UIComponents/Cards/Stats/StatsCard.vue'
  import Tooltip from 'chartist-plugin-tooltips-updated'

  import * as API from '../../../api/ga'
  import * as COMMON from '../../../common/globalFunction'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    components: {
      ChartCard,
      StatsCard
    },
    data () {
      return {
        nowDate: '',
        summary: {},
        chartData: {
          labels: [],
          series: [[], [], [], []]
        },
        Day1Data: [],
        Day7Data: [],
        Day14Data: [],
        Day28Data: [],
        dateRange: [new Date(), new Date()],
        picked: [true, false, false, false],
        chartOption: {
          fullWidth: true,
          height: 313,
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
        lang: {
          formatLocale: {
            // MMM
            monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            // dd
            weekdaysMin: ['일', '월', '화', '수', '목', '금', '토']
          },
          monthBeforeYear: false
        },
        loadingInstance: null
      }
    },
    computed: {
      ...mapState(loginStore, ['accessToken']),

      // columns data
      columns () {
        let columns = []

        return columns
      }
    },
    methods: {
      // page update
      async updateDate () {
        let date = new Date()
        await this.changeDateRange()
        this.nowDate = COMMON.default.changeDateTimeFormat(date)
      },
      // change date range
      async changeDateRange () {
        let start = ''
        let end = ''

        start = COMMON.default.changeDateFormat(this.dateRange[0])
        end = COMMON.default.changeDateFormat(this.dateRange[1])

        await this.initData(start, end)
      },

      // table data
      async initData (startDate, endDate) {
        this.loadingInstance.show()

        this.TABLE_DATA = []
        this.HEADER_DATA = []

        try {
          await API.activeUserDetail({
            start: startDate,
            end: endDate,
            accessToken: this.accessToken
          }).then(res => {
            if (Object.keys(res.data).length === 0) {
              this.showEmpty = true
            }
            else {
              let tmpLabels = []
              let tmpSeriesDay1 = []
              let tmpSeriesDay7 = []
              let tmpSeriesDay14 = []
              let tmpSeriesDay28 = []

              if (Object.keys(res.data.summary).length !== 0 || (res.data.data).length !== 0) {
                res.data.summary.day1 = COMMON.default.emptyCheckInt(res.data.summary.day1)
                res.data.summary.day7 = COMMON.default.emptyCheckInt(res.data.summary.day7)
                res.data.summary.day14 = COMMON.default.emptyCheckInt(res.data.summary.day14)
                res.data.summary.day28 = COMMON.default.emptyCheckInt(res.data.summary.day28)
                this.summary = res.data.summary

                res.data.data.forEach(element => {
                  let tmpObjDay1 = {meta: '', value: ''}
                  let tmpObjDay7 = {meta: '', value: ''}
                  let tmpObjDay14 = {meta: '', value: ''}
                  let tmpObjDay28 = {meta: '', value: ''}

                  let dateStr = Object.values(element)[0]
                  let month = dateStr.substr(4, 2).replace(/(^0+)/, '')
                  let day = dateStr.substr(6, 2).replace(/(^0+)/, '')

                  tmpLabels.push(month + '월' + day + '일')
                  tmpObjDay1.meta = '1일 활성 사용자'
                  tmpObjDay1.value = Object.values(element)[1]
                  tmpSeriesDay1.push(tmpObjDay1)
                  tmpObjDay7.meta = '7일간 우수 사용자'
                  tmpObjDay7.value = Object.values(element)[2]
                  tmpSeriesDay7.push(tmpObjDay7)
                  tmpObjDay14.meta = '14일간 우수 사용자'
                  tmpObjDay14.value = Object.values(element)[3]
                  tmpSeriesDay14.push(tmpObjDay14)
                  tmpObjDay28.meta = '28일 활성 사용자'
                  tmpObjDay28.value = Object.values(element)[4]
                  tmpSeriesDay28.push(tmpObjDay28)
                })

                this.chartData.labels = tmpLabels
                this.Day1Data = tmpSeriesDay1
                this.Day7Data = tmpSeriesDay7
                this.Day14Data = tmpSeriesDay14
                this.Day28Data = tmpSeriesDay28
                this.chartData.series[0] = tmpSeriesDay1
                this.chartData = {
                  ...this.chartData
                }
              }
            }
          })
          await this.loadingInstance.close()
        } catch (error) {
          console.error(error)
          this.chartData.labels = []
          this.Day1Data = []
          this.Day7Data = []
          this.Day14Data = []
          this.Day28Data = []
          this.chartData.series[0] = []
          this.chartData = {
            ...this.chartData
          }
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }
      },

      // check box value change
      checkValChange (value) {
        if (value === 'day1') {
          this.picked[0] = !this.picked[0]
          this.chartData.series[0] = this.picked[0] === true ? this.Day1Data : []
        }
        else if (value === 'day7') {
          this.picked[1] = !this.picked[1]
          this.chartData.series[1] = this.picked[1] === true ? this.Day7Data : []
        }
        else if (value === 'day14') {
          this.picked[2] = !this.picked[2]
          this.chartData.series[2] = this.picked[2] === true ? this.Day14Data : []
        }
        else {
          this.picked[3] = !this.picked[3]
          this.chartData.series[3] = this.picked[3] === true ? this.Day28Data : []
        }

        this.chartData = {
          ...this.chartData
        }
      }
    },
    async created () {
      // loading screen
      this.loadingInstance = this.$veLoading({
        fullscreen: true,
        name: 'flow',
        lock: true
      })

      // set date
      let start = new Date()
      let end = new Date()
      let dateArr = []

      dateArr.push(new Date(start.setDate(start.getDate() - 7)))
      dateArr.push(end)
      this.dateRange = dateArr

      await this.initData(
        COMMON.default.changeDateFormat(dateArr[0]),
        COMMON.default.changeDateFormat(dateArr[1])
      )

      let date = new Date()
      this.nowDate = COMMON.default.changeDateTimeFormat(date)
    },
    destroyed () {
      this.loadingInstance.destroy()
    }
  }

</script>
<style>

</style>

<template>
    <div class="row visited-path-detail-wrap">
      <h4>콘텐츠 페이지뷰(상세)</h4>
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
          <date-picker v-model="dateRange" type="date" range placeholder="날짜범위를 선택해주세요" :lang="lang" @change="updateDate"></date-picker>
        </section>
      </div>
      <ve-table 
        :columns="columns" 
        :table-data="tableData" 
        :row-style-option="rowStyleOption" 
        :border-x="true" 
        :border-y="true"
      >
      </ve-table>
      <div v-show="showEmpty" class="empty-data">데이터가 없습니다</div>
      <div class="table-pagination">
        <ve-pagination
          :total="totalCount"
          :page-index="pageIndex"
          :page-size="pageSize"
          @on-page-number-change="pageNumberChange"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </div>
</template>
<script>
  import * as API from '../../../api/ga'
  import * as COMMON from '../../../common/globalFunction'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    data () {
      return {
        nowDate: '',
        dateRange: [new Date(), new Date()],
        lang: {
          formatLocale: {
            // MMM
            monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            // dd
            weekdaysMin: ['일', '월', '화', '수', '목', '금', '토']
          },
          monthBeforeYear: false
        },
        HEADER_DATA: {},
        TABLE_DATA: [],
        // page index
        pageIndex: 1,
        // page size
        pageSize: 10,
        // row option
        rowStyleOption: {
          stripe: true,
          hoverHighlight: false
        },
        // show empty
        showEmpty: false,
        loadingInstance: null
      }
    },
    computed: {
      ...mapState(loginStore, ['accessToken']),

      // table data
      tableData () {
        const { pageIndex, pageSize } = this
        return this.TABLE_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
      },
      // total count
      totalCount () {
        return this.TABLE_DATA.length
      },
      // columns data
      columns () {
        let columns = [
          {
            field: '',
            key: 'a',
            title: '#',
            width: 30,
            align: 'center',
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return (this.pageIndex - 1) * this.pageSize + rowIndex + 1
            }
          },
          { field: 'page', key: 'page', title: '페이지', width: 200, align: 'left' },
          {
            title: '페이지뷰 수',
            align: 'left',
            width: 100,
            children: [
              {
                field: 'pageViews',
                key: 'pageViews',
                title: this.HEADER_DATA.pageViews,
                width: 100,
                align: 'right',
                children: [
                  {
                    field: 'pageViewsSub',
                    key: 'pageViewsSub',
                    title: this.HEADER_DATA.pageViewsRemark,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'pageViewsLeft',
                        key: 'pageViewsLeft',
                        width: 50,
                        align: 'right'
                      },
                      {
                        field: 'pageViewsRight',
                        key: 'pageViewsRight',
                        title: this.HEADER_DATA.pageViewsAll,
                        width: 50,
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '순 페이지뷰 수',
            align: 'left',
            width: 100,
            children: [
              {
                field: 'uniquePageviews',
                key: 'uniquePageviews',
                title: this.HEADER_DATA.uniquePageviews,
                width: 100,
                align: 'right',
                children: [
                  {
                    field: 'uniquePageviewsSub',
                    key: 'uniquePageviewsSub',
                    title: this.HEADER_DATA.uniquePageviewsRemark,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'uniquePageviewsLeft',
                        key: 'uniquePageviewsLeft',
                        width: 50,
                        align: 'right'
                      },
                      {
                        field: 'uniquePageviewsRight',
                        key: 'uniquePageviewsRight',
                        title: this.HEADER_DATA.uniquePageviewsAll,
                        width: 50,
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '평균 페이지에 머문 시간',
            align: 'left',
            width: 100,
            children: [
              {
                field: 'avgTimeOnPage',
                key: 'avgTimeOnPage',
                title: this.HEADER_DATA.avgTimeOnPage,
                width: 100,
                align: 'right',
                children: [
                  {
                    field: 'avgTimeOnPageSub',
                    key: 'avgTimeOnPageSub',
                    title: this.HEADER_DATA.avgTimeOnPageAll,
                    width: 50,
                    align: 'right',
                    children: [
                      {
                        field: 'avgTimeOnPageRight',
                        key: 'avgTimeOnPageRight',
                        title: this.HEADER_DATA.avgTimeOnPageRemark,
                        width: 50,
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '방문수',
            align: 'left',
            width: 100,
            children: [
              {
                field: 'sessions',
                key: 'sessions',
                title: this.HEADER_DATA.sessions,
                width: 100,
                align: 'right',
                children: [
                  {
                    field: 'sessionsSub',
                    key: 'sessionsSub',
                    title: this.HEADER_DATA.sessionsRemark,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'sessionsLeft',
                        key: 'sessionsLeft',
                        width: 50,
                        align: 'right'
                      },
                      {
                        field: 'sessionsRight',
                        key: 'sessionsRight',
                        title: this.HEADER_DATA.sessionsAll,
                        width: 50,
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '이탈률',
            align: 'left',
            width: 100,
            children: [
              {
                field: 'bounceRate',
                key: 'bounceRate',
                title: this.HEADER_DATA.bounceRate,
                width: 100,
                align: 'right',
                children: [
                  {
                    field: 'bounceRateSub',
                    key: 'bounceRateSub',
                    title: this.HEADER_DATA.bounceRateAll,
                    width: 50,
                    align: 'right',
                    children: [
                      {
                        field: 'bounceRateRight',
                        key: 'bounceRateRight',
                        title: this.HEADER_DATA.bounceRateRemark,
                        width: 50,
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '종료율(%)',
            align: 'left',
            width: 100,
            children: [
              {
                field: 'exitRate',
                key: 'exitRate',
                title: this.HEADER_DATA.exitRate,
                width: 100,
                align: 'right',
                children: [
                  {
                    field: 'exitRateSub',
                    key: 'exitRateSub',
                    title: this.HEADER_DATA.exitRateAll,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'exitRateRight',
                        key: 'exitRateRight',
                        title: this.HEADER_DATA.exitRateRemark,
                        width: 100,
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '페이지 값',
            align: 'left',
            width: 100,
            children: [
              {
                field: 'pageValue',
                key: 'pageValue',
                title: this.HEADER_DATA.pageValue,
                width: 100,
                align: 'right',
                children: [
                  {
                    field: 'pageValueSub',
                    key: 'pageValueSub',
                    title: this.HEADER_DATA.pageValueRemark,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'pageValueLeft',
                        key: 'pageValueLeft',
                        width: 50,
                        align: 'right'
                      },
                      {
                        field: 'pageValueRight',
                        key: 'pageValueRight',
                        title: this.HEADER_DATA.pageValueAll,
                        width: 50,
                        align: 'right'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]

        return columns
      }
    },
    methods: {
      // page update
      async updateDate () {
        let start = ''
        let end = ''

        start = COMMON.default.changeDateFormat(this.dateRange[0])
        end = COMMON.default.changeDateFormat(this.dateRange[1])

        await this.initTableData(start, end)
      },

      // page number change
      pageNumberChange (pageIndex) {
        this.pageIndex = pageIndex
      },

      // page size change
      pageSizeChange (pageSize) {
        this.pageIndex = 1
        this.pageSize = pageSize
      },

      // table data
      async initTableData (startDate, endDate) {
        this.TABLE_DATA = []
        this.HEADER_DATA = []

        // api call
        this.loadingInstance.show()
        try {
          await API.visitedPathDetail({
            start: startDate,
            end: endDate,
            accessToken: this.accessToken
          }).then(res => {
            if (Object.keys(res.data).length === 0) {
              this.showEmpty = true
            }
            else {
              this.showEmpty = false

              // header
              res.data.summary.pageViews = COMMON.default.numberWithCommas(res.data.summary.pageViews)
              res.data.summary.pageViewsAll = COMMON.default.addTextparentheses(
                COMMON.default.numberWithCommas(res.data.summary.pageViewsAll)
              )
              res.data.summary.pageViewsRemark = COMMON.default.addTextRate(
                COMMON.default.emptyCheckPer(res.data.summary.pageViewsRemark)
              )
              res.data.summary.uniquePageviews = COMMON.default.numberWithCommas(res.data.summary.uniquePageviews)
              res.data.summary.uniquePageviewsAll = COMMON.default.addTextparentheses(
                COMMON.default.numberWithCommas(res.data.summary.uniquePageviewsAll)
              )
              res.data.summary.uniquePageviewsRemark = COMMON.default.addTextRate(
                COMMON.default.emptyCheckPer(res.data.summary.uniquePageviewsRemark)
              )
              res.data.summary.avgTimeOnPageAll = COMMON.default.addTextHits(
                COMMON.default.numberWithCommas(res.data.summary.avgTimeOnPageAll)
              )
              res.data.summary.avgTimeOnPageRemark = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckPer(res.data.summary.avgTimeOnPageRemark)
              )
              res.data.summary.session = COMMON.default.numberWithCommas(res.data.summary.session)
              res.data.summary.sessionsAll = COMMON.default.addTextparentheses(
                COMMON.default.numberWithCommas(res.data.summary.sessionsAll)
              )
              res.data.summary.sessionsRemark = COMMON.default.addTextRate(
                COMMON.default.emptyCheckPer(res.data.summary.sessionsRemark)
              )
              res.data.summary.bounceRate = COMMON.default.emptyCheckPer(res.data.summary.bounceRate)
              res.data.summary.bounceRateAll = COMMON.default.addTextHits(
                COMMON.default.emptyCheckPer(res.data.summary.bounceRateAll)
              )
              res.data.summary.bounceRateRemark = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckPer(res.data.summary.bounceRateRemark)
              )
              res.data.summary.exitRate = COMMON.default.emptyCheckPer(res.data.summary.exitRate)
              res.data.summary.exitRateAll = COMMON.default.addTextHits(
                COMMON.default.emptyCheckPer(res.data.summary.exitRateAll)
              )
              res.data.summary.exitRateRemark = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckPer(res.data.summary.exitRateRemark)
              )
              res.data.summary.pageValue = COMMON.default.emptyCheckMoney(res.data.summary.pageValue)
              res.data.summary.pageValueAll = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckMoney(res.data.summary.pageValueAll)
              )
              res.data.summary.pageValueRemark = COMMON.default.addTextRate(
                COMMON.default.emptyCheckPer(res.data.summary.pageValueRemark)
              )
              this.HEADER_DATA = res.data.summary

              // data
              res.data.data.forEach((element) => {
                this.TABLE_DATA.push({
                  page: element.page,
                  pageViewsLeft: COMMON.default.emptyCheckInt(element.pageViews),
                  uniquePageviewsLeft: COMMON.default.emptyCheckInt(element.uniquePageviews),
                  avgTimeOnPageRight: COMMON.default.emptyCheckTime(element.avgTimeOnPage),
                  sessionsLeft: COMMON.default.emptyCheckInt(element.session),
                  bounceRateRight: COMMON.default.emptyCheckInt(element.bounceRate),
                  exitRateRight: COMMON.default.emptyCheckInt(element.exitRate),
                  pageValueLeft: COMMON.default.emptyCheckMoney(element.pageValue),
                  pageViewsRight: COMMON.default.addTextparentheses(COMMON.default.emptyCheckPer(element.pageViewsRemark)),
                  uniquePageviewsRight: COMMON.default.addTextparentheses(COMMON.default.emptyCheckPer(element.uniquePageviewsRemark)),
                  sessionsRight: COMMON.default.addTextparentheses(COMMON.default.emptyCheckPer(element.sessionRemark)),
                  pageValueRight: COMMON.default.addTextparentheses(COMMON.default.emptyCheckPer(element.pageValueRemark))
                })
              })
            }
          })
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        let date = new Date()
        this.nowDate = COMMON.default.changeDateTimeFormat(date)
        await this.loadingInstance.close()
      }
    },
    async created () {
      // loading screen
      this.loadingInstance = this.$veLoading({
        fullscreen: true,
        name: 'flow',
        lock: true
      })

      // pagination
      const lang = {
        pagination: {
          goto: '이동:',
          itemsPerPage: ' 건',
          total: function total (_total) {
            return '총 ' + _total + '건'
          }
        }
      }
      this.$veLocale.update(lang)

      // set date
      let start = new Date()
      let end = new Date()
      let dateArr = []

      dateArr.push(new Date(start.setDate(start.getDate() - 7)))
      dateArr.push(end)
      this.dateRange = dateArr

      await this.initTableData(
        COMMON.default.changeDateFormat(dateArr[0]),
        COMMON.default.changeDateFormat(dateArr[1])
      )
    },
    destroyed () {
      this.loadingInstance.destroy()
    }
  }

</script>
<style>

</style>

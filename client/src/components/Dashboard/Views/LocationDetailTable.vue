<template>
    <div class="row location-detail-wrap">
      <h4>도시별 유입수(상세)</h4>
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
          { field: 'city', key: 'city', title: '도시', width: 200, align: 'left' },
          {
            title: '획득',
            align: 'left',
            children: [
              {
                field: 'userTitle',
                key: 'userTitle',
                title: '사용자',
                width: 100,
                children: [
                  {
                    field: 'user',
                    key: 'user',
                    title: this.HEADER_DATA.user,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'userSub',
                        key: 'userSub',
                        title: this.HEADER_DATA.userRemark,
                        width: 100,
                        align: 'right',
                        children: [
                          {
                            field: 'userLeft',
                            key: 'userLeft',
                            width: 50,
                            align: 'right'
                          },
                          {
                            field: 'userRight',
                            key: 'userRight',
                            title: this.HEADER_DATA.userAll,
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
                field: 'newUserTitle',
                key: 'newUserTitle',
                title: '신규 방문자',
                width: 100,
                children: [
                  {
                    field: 'newUser',
                    key: 'newUser',
                    title: this.HEADER_DATA.newUser,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'newUserSub',
                        key: 'newUserSub',
                        title: this.HEADER_DATA.newUserRemark,
                        width: 100,
                        align: 'right',
                        children: [
                          {
                            field: 'newUserLeft',
                            key: 'newUserLeft',
                            width: 50,
                            align: 'right'
                          },
                          {
                            field: 'newUserRight',
                            key: 'newUserRight',
                            title: this.HEADER_DATA.newUserAll,
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
                field: 'sessionTitle',
                key: 'sessionTitle',
                title: '세션',
                width: 100,
                children: [
                  {
                    field: 'session',
                    key: 'session',
                    title: this.HEADER_DATA.session,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'sessionSub',
                        key: 'sessionSub',
                        title: this.HEADER_DATA.sessionRemark,
                        width: 100,
                        align: 'right',
                        children: [
                          {
                            field: 'sessionLeft',
                            key: 'sessionLeft',
                            width: 50,
                            align: 'right'
                          },
                          {
                            field: 'sessionRight',
                            key: 'sessionRight',
                            title: this.HEADER_DATA.sessionAll,
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
          },
          {
            title: '동작',
            align: 'left',
            children: [
              {
                title: '이탈률',
                field: 'bounceRateTitle',
                key: 'bounceRateTitle',
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
                        width: 100,
                        align: 'right',
                        children: [
                          {
                            field: 'bounceRateRight',
                            key: 'bounceRateRight',
                            title: this.HEADER_DATA.bounceRateRemark,
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
                title: '세션당 페이지수',
                field: 'pvpSessionTitle',
                key: 'pvpSessionTitle',
                width: 80,
                children: [
                  {
                    field: 'pvpSession',
                    key: 'pvpSession',
                    title: this.HEADER_DATA.pvpSession,
                    width: 80,
                    align: 'right',
                    children: [
                      {
                        field: 'pvpSessionSub',
                        key: 'pvpSessionSub',
                        title: this.HEADER_DATA.pvpSessionAll,
                        width: 80,
                        align: 'right',
                        children: [
                          {
                            field: 'pvpSessionRight',
                            key: 'pvpSessionRight',
                            title: this.HEADER_DATA.pvpSessionRemark,
                            width: 80,
                            align: 'right'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                title: '평균 세션 시간',
                field: 'avgSession',
                key: 'avgSession',
                width: 100,
                children: [
                  {
                    field: 'avgSessionValue',
                    key: 'avgSessionValue',
                    title: this.HEADER_DATA.avgSession,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'avgSessionSub',
                        key: 'avgSessionSub',
                        title: this.HEADER_DATA.avgSessionAll,
                        width: 100,
                        align: 'right',
                        children: [
                          {
                            field: 'avgSessionRight',
                            key: 'avgSessionRight',
                            title: this.HEADER_DATA.avgSessionRemark,
                            width: 100,
                            align: 'right'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: '전환',
            align: 'left',
            children: [
              {
                title: '관심고객등록(목표1전환율)',
                field: 'goal1RateTitle',
                key: 'goal1RateTitle',
                width: 100,
                children: [
                  {
                    field: 'goal1Rate',
                    key: 'goal1Rate',
                    title: this.HEADER_DATA.goal1Rate,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'goal1RateSub',
                        key: 'goal1RateSub',
                        title: this.HEADER_DATA.goal1RateAll,
                        width: 100,
                        align: 'right',
                        children: [
                          {
                            field: 'goal1RateRight',
                            key: 'goal1RateRight',
                            title: this.HEADER_DATA.goal1RateRemark,
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
                title: '관심고객등록(목표1완료수)',
                field: 'goal1Comp',
                key: 'goal1Comp',
                width: 100,
                children: [
                  {
                    field: 'goal1CompLeft',
                    key: 'goal1CompLeft',
                    title: this.HEADER_DATA.goal1Comp,
                    width: 100,
                    align: 'right',
                    children: [
                      {
                        field: 'goal1CompLeft',
                        key: 'goal1CompLeft',
                        title: this.HEADER_DATA.goal1CompRemark,
                        width: 100,
                        align: 'right',
                        children: [
                          {
                            field: 'goal1CompLeft',
                            key: 'goal1CompLeft',
                            width: 50,
                            align: 'right'
                          },
                          {
                            field: 'goal1CompRight',
                            key: 'goal1CompRight',
                            title: this.HEADER_DATA.goal1CompAll,
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
                title: '관심고객등록(목표1가치)',
                field: 'goal1ValueTitle',
                key: 'goal1ValueTitle',
                width: 140,
                children: [
                  {
                    field: 'goal1Value',
                    key: 'goal1Value',
                    title: this.HEADER_DATA.goal1Value,
                    width: 140,
                    align: 'right',
                    children: [
                      {
                        field: 'goal1ValueRemark',
                        key: 'goal1ValueRemark',
                        title: this.HEADER_DATA.goal1ValueRemark,
                        width: 140,
                        align: 'right',
                        children: [
                          {
                            field: 'goal1ValueLeft',
                            key: 'goal1ValueLeft',
                            width: 70,
                            align: 'right'
                          },
                          {
                            field: 'goal1ValueRight',
                            key: 'goal1ValueRight',
                            title: this.HEADER_DATA.goal1ValueAll,
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
          await API.locationDetail({
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
              res.data.summary.user = COMMON.default.emptyCheckInt(res.data.summary.user)
              res.data.summary.userAll = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckInt(res.data.summary.userAll)
              )
              res.data.summary.userRemark = COMMON.default.addTextRate(
                COMMON.default.emptyCheckPer(res.data.summary.userRemark)
              )
              res.data.summary.newUser = COMMON.default.emptyCheckInt(res.data.summary.newUser)
              res.data.summary.newUserAll = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckInt(res.data.summary.newUserAll)
              )
              res.data.summary.newUserRemark = COMMON.default.addTextRate(
                COMMON.default.emptyCheckPer(res.data.summary.newUserRemark)
              )
              res.data.summary.session = COMMON.default.emptyCheckInt(res.data.summary.session)
              res.data.summary.sessionAll = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckInt(res.data.summary.sessionAll)
              )
              res.data.summary.sessionRemark = COMMON.default.addTextRate(
                COMMON.default.emptyCheckPer(res.data.summary.sessionRemark)
              )
              res.data.summary.bounceRate = COMMON.default.emptyCheckPer(res.data.summary.bounceRate)
              res.data.summary.bounceRateRemark = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckPer(res.data.summary.bounceRateRemark)
              )
              res.data.summary.bounceRateAll = COMMON.default.addTextHits(
                COMMON.default.emptyCheckPer(res.data.summary.bounceRateAll)
              )
              res.data.summary.pvpSessionRemark = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckPer(res.data.summary.pvpSessionRemark)
              )
              res.data.summary.pvpSessionAll = COMMON.default.addTextHits(
                COMMON.default.emptyCheckPer(res.data.summary.pvpSessionAll)
              )
              res.data.summary.avgSessionRemark = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckPer(res.data.summary.avgSessionRemark)
              )
              res.data.summary.avgSessionAll = COMMON.default.addTextHits(
                COMMON.default.emptyCheckTime(res.data.summary.avgSessionAll)
              )
              res.data.summary.goal1Rate = COMMON.default.emptyCheckPer(res.data.summary.goal1Rate)
              res.data.summary.goal1RateAll = COMMON.default.addTextHits(
                COMMON.default.emptyCheckPer(res.data.summary.goal1RateAll)
              )
              res.data.summary.goal1RateRemark = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckPer(res.data.summary.goal1RateRemark)
              )
              res.data.summary.goal1CompAll = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckInt(res.data.summary.goal1CompAll)
              )
              res.data.summary.goal1CompRemark = COMMON.default.addTextHits(
                COMMON.default.emptyCheckPer(res.data.summary.goal1CompRemark)
              )
              res.data.summary.goal1Value = COMMON.default.emptyCheckMoney(res.data.summary.goal1Value)
              res.data.summary.goal1ValueAll = COMMON.default.addTextparentheses(
                COMMON.default.emptyCheckMoney(res.data.summary.goal1ValueAll)
              )
              res.data.summary.goal1ValueRemark = COMMON.default.addTextRate(
                COMMON.default.emptyCheckPer(res.data.summary.goal1ValueRemark)
              )
              this.HEADER_DATA = res.data.summary

              // data
              res.data.data.forEach((element) => {
                this.TABLE_DATA.push({
                  city: element.city,
                  userLeft: COMMON.default.emptyCheckInt(element.user),
                  newUserLeft: COMMON.default.emptyCheckInt(element.newUser),
                  sessionLeft: COMMON.default.emptyCheckInt(element.session),
                  bounceRateRight: COMMON.default.emptyCheckPer(element.bounceRate),
                  pvpSessionRight: COMMON.default.emptyCheckInt(element.pvpSession),
                  avgSessionRight: COMMON.default.emptyCheckTime(element.avgSession),
                  goal1RateRight: COMMON.default.emptyCheckPer(element.goal1Rate),
                  goal1CompLeft: COMMON.default.emptyCheckInt(element.goal1Comp),
                  goal1ValueLeft: COMMON.default.emptyCheckMoney(element.goal1Value),
                  userRight: COMMON.default.addTextparentheses(COMMON.default.emptyCheckPer(element.userRemark)),
                  newUserRight: COMMON.default.addTextparentheses(COMMON.default.emptyCheckPer(element.newUserRemark)),
                  sessionRight: COMMON.default.addTextparentheses(COMMON.default.emptyCheckPer(element.sessionRemark)),
                  goal1CompRight: COMMON.default.addTextparentheses(COMMON.default.emptyCheckPer(element.goal1CompRemark)),
                  goal1ValueRight: COMMON.default.addTextparentheses(COMMON.default.emptyCheckPer(element.goal1ValueRemark))
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

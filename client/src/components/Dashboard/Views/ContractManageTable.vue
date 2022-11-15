<template>
    <div class="row visit-reservation-detail-wrap">
      <ContractManageRegistModal></ContractManageRegistModal>
      <ContractManageInfoModal :datas="INFO_DATA"></ContractManageInfoModal>
      <h4>계약자방문 예약 관리 현황</h4>
      <h6>총 {{totalCount}}건</h6>
      <div class="top-wrap">
        <div class="row">
          <div class="col-md-12 update-header-wrap">
            <button @click="updateDate">
              <i class="ti-reload"></i>
            </button>
              마지막 갱신 {{nowDate}}
          </div>
        </div>
        <div class="customer-search-wrap">
          <section>
            <label style="display: inline-block;">기간</label>
            <date-picker v-model="dateRange" type="date" range placeholder="검색날짜를 선택해주세요" style="width:220px;" :lang="lang"></date-picker>
            <button class="btn-detail" @click="searchData()">검색</button>
          </section>
          <div class="btn-wrap">
            <button v-if="profile===0" class="btn-control customer-setting-btn" @click="registModalShow()">등록</button>
            <button class="btn-control setting-btn"><router-link :to="{path:'/reservation/contract/visit'}">예약현황</router-link></button>
            <button class="btn-control setting-btn"><router-link :to="{path:'/reservation/contract/list'}">계약자목록</router-link></button>
          </div>
        </div>
      </div>
      <ve-table 
        v-if="tableData.length !== 0"
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
  import ContractManageRegistModal from '../Modal/ContractManageRegistModal.vue'
  import ContractManageInfoModal from '../Modal/ContractManageInfoModal.vue'

  import * as CONTRACT from '../../../api/contractor'
  import * as COMMON from '../../../common/globalFunction'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    components: {
      ContractManageRegistModal,
      ContractManageInfoModal
    },
    data () {
      return {
        nowDate: '',
        dateRange: [null, null],
        lang: {
          formatLocale: {
            // MMM
            monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            // dd
            weekdaysMin: ['일', '월', '화', '수', '목', '금', '토']
          },
          monthBeforeYear: false
        },
        TABLE_DATA: [],
        INFO_DATA: [],
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
      ...mapState(loginStore, ['profile', 'accessToken']),
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
        let columns = []
        if (this.tableData.length !== 0) {
          columns = [
            { field: 'num', key: 'num', title: 'NO', width: 20, align: 'center' },
            { field: 'visitDate', key: 'visitDate', title: '상담등록일', width: 130, align: 'center' }
          ]

          let arr
          (arr = []).length = 16
          arr.fill(0)
          arr.forEach((element, idx) => {
            columns.push({
              field: 'discuss' + (idx + 1),
              key: 'discuss1' + (idx + 1),
              title: '상담' + (idx + 1),
              width: 100,
              align: 'center',
              renderBodyCell: ({ row, column, rowIndex }, h) => {
                if (row['discuss' + (idx + 1)] === null || row['discuss' + (idx + 1)] === undefined) {
                  return <span style="color: #FF4C40; font-weight: bold;">X</span>
                }
                else {
                  return <span>{row['discuss' + (idx + 1)]}</span>
                }
              }
            })
          })
        }
        columns.push({
          field: 'setting',
          key: 'setting',
          title: '수정',
          width: 70,
          align: 'center',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <a on-click={() => this.infoShow(row)}>{row.setting}</a>
          }
        })

        return columns
      }
    },
    methods: {
      // page update
      async updateDate () {
        // component clear
        this.resetData()
        // api request
        await this.initTableData({})
      },

      // parent search data reset
      resetData () {
        this.dateRange = [null, null]
        this.pageNumberChange(1)
      },

      // click regist button
      async registModalShow () {
        this.$modal.show('regist-modal')
      },

      // click customer info button
      async infoShow (rowDatas) {
        let reqParam = {
          date: rowDatas.visitDate,
          accessToken: this.accessToken
        }

        // api call
        this.loadingInstance.show()
        try {
          await CONTRACT.settingList(reqParam).then(res => {
            if (res.data.length !== 0) {
              res.data.forEach((element, idx) => {
                res.data[idx].visitDay = COMMON.default.changeDateFormat(new Date(res.data[idx].visitDay))
              })
              this.INFO_DATA = res.data
            }
          })
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        this.loadingInstance.close()
        this.$modal.show('info-modal')
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

      // data search
      async searchData () {
        // api request
        let reqParam = {}
        this.dateRange[0] !== null ? reqParam.startDate = COMMON.default.changeDateFormat(this.dateRange[0]) : undefined
        this.dateRange[1] !== null ? reqParam.endDate = COMMON.default.changeDateFormat(this.dateRange[1]) : undefined
        reqParam.accessToken = this.accessToken

        await this.initTableData(reqParam)
        this.pageNumberChange(1)
      },

      // table data
      async initTableData (reqParam) {
        this.TABLE_DATA = []
        reqParam.accessToken = this.accessToken

        // api request
        this.loadingInstance.show()
        try {
          await CONTRACT.settingList(reqParam).then(res => {
            if (res.data.length === 0) {
              this.showEmpty = true
            }
            else {
              this.showEmpty = false

              // data set
              res.data.forEach(element => {
                  let obj = {}
                  obj.num = COMMON.default.emptyCheckInt(element.no)
                  obj.visitDate = element.visitDate
                  element.schedule.forEach((elem, idx) => {
                    obj['discuss' + (idx + 1)] = elem
                  })
                  obj.setting = '수정'

                this.TABLE_DATA.push(obj)
              })
            }
          })
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        await this.loadingInstance.close()

        // update date
        let date = new Date()
        this.nowDate = COMMON.default.changeDateTimeFormat(date)
      }
    },
    async created () {
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

      await this.initTableData({})
    },
    destroyed () {
      this.loadingInstance.destroy()
    }
  }

</script>
<style>

</style>

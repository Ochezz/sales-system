<template>
    <div class="row visit-reservation-detail-wrap">
      <VisitPaymentInfoModal :datas="INFO_DATA"></VisitPaymentInfoModal>
      <h4>중도금대출 및 옵션 계약방문 예약 현황</h4>
      <h6>총 {{totalCount}}건</h6>
      <div class="top-wrap">
        <div class="row">
          <div class="col-md-12 update-header-wrap">
            <section>
              <label style="display: inline-block;">기간</label>
              <date-picker v-model="dateRange" type="date" range placeholder="검색날짜를 선택해주세요" :lang="lang"></date-picker>
              <label style="'display: inline-block;">시간</label>
              <select class="time-select" name="time" id="time" v-model="time">
                <option value="" selected>시간선택</option>
                <option v-for="(num, idx) in 10" :key="idx" :value="num === 9 ? '09' : num + 8 + ':00:00'">{{num + 8 + ':00'}}</option>
              </select>
            </section>
            <button @click="updateDate">
              <i class="ti-reload"></i>
            </button>
              마지막 갱신 {{nowDate}}
          </div>
        </div>
        <div>
          <div class="search-wrap">
            <label style="'display: inline-block;">이름</label>
            <input style="'display: inline-block;" type="text" class="name-input" v-model="name">
            <label style="'display: inline-block;">휴대폰번호</label>
            <input style="'display: inline-block;" type="text" class="phone-input" v-model="phone">
            <button class="btn-detail" @click="searchData()">검색</button>
            <button class="btn-detail" @click="resetData()">초기화</button>
          </div>
          <div class="btn-wrap">
            <button v-if="profile===0" class="btn-control excel-down-btn" @click="excelDown()"><i class="ti-download btn-font-size-12px"></i> 엑셀</button>
            <button class="btn-control setting-btn"><router-link :to="{path:'/reservation/payment/manage'}">예약관리현황</router-link></button>
            <button class="btn-control setting-btn"><router-link :to="{path:'/reservation/payment/list'}">계약자목록</router-link></button>
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
  import VisitPaymentInfoModal from '../Modal/VisitPaymentInfoModal.vue'

  import * as PAYMENT from '../../../api/payment'
  import * as COMMON from '../../../common/globalFunction'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    components: {
      VisitPaymentInfoModal
    },
    data () {
      return {
        nowDate: '',
        lang: {
          formatLocale: {
            // MMM
            monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            // dd
            weekdaysMin: ['일', '월', '화', '수', '목', '금', '토']
          },
          monthBeforeYear: false
        },
        INFO_DATA: {},
        TABLE_DATA: [],
        dateRange: [null, null],
        time: '',
        name: '',
        phone: '',
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
        let columns = this.tableData.length !== 0 ? [
          this.tableData[0].num !== undefined ? {field: 'num', key: 'num', title: 'NO', width: 50, align: 'center'} : {},
          this.tableData[0].visitDay !== undefined ? { field: 'visitDay', key: 'visitDay', title: '방문예정날짜', width: 150, align: 'center' } : {},
          this.tableData[0].visitTime !== undefined ? { field: 'visitTime', key: 'visitTime', title: '방문예정시간', width: 150, align: 'center' } : {},
          this.tableData[0].name !== undefined ? { field: 'name', key: 'name', title: '성명', width: 60, align: 'center' } : {},
          this.tableData[0].phone !== undefined ? { field: 'phone', key: 'phone', title: '전화번호', width: 200, align: 'center' } : {},
          this.tableData[0].room !== undefined ? { field: 'room', key: 'room', title: '호실', width: 120, align: 'center' } : {},
          this.tableData[0].device !== undefined ? { field: 'device', key: 'device', title: '등록기기', width: 120, align: 'center' } : {},
          this.tableData[0].createdDate !== undefined ? { field: 'createdDate', key: 'createdDate', title: '등록일', width: 300, align: 'center' } : {},
          this.tableData[0].setting !== undefined ? {
            field: 'setting',
            key: 'setting',
            title: '상담관리',
            width: 100,
            align: 'center',
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return <a on-click={() => this.infoShow(row)}>{row.setting}</a>
            }
          } : {}
        ] : []

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

      // click customer info button
      async infoShow (rowDatas) {
        let reqParam = {
          id: rowDatas.id,
          accessToken: this.accessToken
        }

        // api call
        this.loadingInstance.show()
        try {
          await PAYMENT.list(reqParam).then(res => {
            if (Object.keys(res.data).length !== 0) {
              res.data[0].visitDay = COMMON.default.changeDateTimeFormat(new Date(res.data[0].visitDay))
              res.data[0].createdDate = COMMON.default.changeDateTimeFormat(new Date(res.data[0].createdDate))
              this.INFO_DATA = res.data[0]
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

      // reset data
      resetData () {
        this.name = ''
        this.phone = ''
        this.dateRange = [null, null]
        this.time = ''
        this.pageNumberChange(1)
      },

      // data search
      async searchData () {
        // param set
        let reqParam = {}
        this.name !== '' ? reqParam.userName = this.name : undefined
        this.phone !== '' ? reqParam.userPhone = this.phone : undefined
        this.dateRange[0] !== null ? reqParam.startDate = COMMON.default.changeDateFormat(this.dateRange[0]) : undefined
        this.dateRange[1] !== null ? reqParam.endDate = COMMON.default.changeDateFormat(this.dateRange[1]) : undefined
        this.time !== '' ? reqParam.visitTime = this.time : undefined

        // api request
        await this.initTableData(reqParam)
        this.pageNumberChange(1)
      },
      // excel download
      async excelDown () {
        let reqParam = {}
        this.name !== '' ? reqParam.userName = this.name : undefined
        this.phone !== '' ? reqParam.userPhone = this.phone : undefined
        this.dateRange[0] !== null ? reqParam.startDate = COMMON.default.changeDateFormat(this.dateRange[0]) : undefined
        this.dateRange[1] !== null ? reqParam.endDate = COMMON.default.changeDateFormat(this.dateRange[1]) : undefined
        this.time !== '' ? reqParam.visitTime = this.time : undefined
        reqParam.accessToken = this.accessToken

        // api call
        this.loadingInstance.show()
        try {
          await PAYMENT.csvDownload(reqParam)
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }
        await this.loadingInstance.close()
      },

      // table data
      async initTableData (param) {
        this.TABLE_DATA = []
        let reqParam = {}

        // param set
        param.userName !== undefined ? reqParam.userName = param.userName : undefined
        param.userPhone !== undefined ? reqParam.userPhone = param.userPhone : undefined
        param.startDate !== undefined ? reqParam.startDate = param.startDate : undefined
        param.endDate !== undefined ? reqParam.endDate = param.endDate : undefined
        param.visitTime !== undefined ? reqParam.visitTime = param.visitTime : undefined
        reqParam.accessToken = this.accessToken

        // api request
        this.loadingInstance.show()
        try {
          await PAYMENT.list(reqParam).then(res => {
            if (res.data.length === 0) {
              this.showEmpty = true
            }
            else {
              this.showEmpty = false

              // data
              res.data.forEach((element) => {
                this.TABLE_DATA.push({
                  id: element.id,
                  num: COMMON.default.emptyCheckInt(element.no),
                  visitDay: COMMON.default.changeDateFormat(new Date(element.visitDay)),
                  visitTime: COMMON.default.changeHourMinFormat(element.visitTime),
                  name: element.name,
                  phone: element.phone,
                  room: element.room,
                  device: COMMON.default.changeDeviceName(element.device),
                  createdDate: COMMON.default.changeDateTimeFormat(new Date(element.createdDate)),
                  setting: '상담등록 및 수정'
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

<template>
    <div class="row visit-reservation-detail-wrap">
      <SiteManageInfoModal :type="type" :datas="INFO_DATA"></SiteManageInfoModal>
      <h4>사이트 관리 현황</h4>
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
            <button v-if="profile===0" class="btn-control setting-btn" @click="registModalShow()">등록</button>
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
  import SiteManageInfoModal from '../Modal/SiteManageInfoModal.vue'

  import * as USER from '../../../api/user'
  import * as COMMON from '../../../common/globalFunction'
  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    components: {
      SiteManageInfoModal
    },
    data () {
      return {
        nowDate: '',
        type: '1',
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
          this.tableData[0].profile !== undefined ? { field: 'profile', key: 'profile', title: '구분', width: 150, align: 'center' } : {},
          this.tableData[0].name !== undefined ? { field: 'name', key: 'name', title: '성명', width: 150, align: 'center' } : {},
          this.tableData[0].rank !== undefined ? { field: 'rank', key: 'rank', title: '직급', width: 60, align: 'center' } : {},
          this.tableData[0].id !== undefined ? { field: 'id', key: 'id', title: '아이디', width: 150, align: 'center' } : {},
          this.tableData[0].phone !== undefined ? { field: 'phone', key: 'phone', title: '휴대폰번호', width: 200, align: 'center' } : {},
          this.tableData[0].officePhone !== undefined ? { field: 'officePhone', key: 'officePhone', title: '사무실전화번호', width: 200, align: 'center' } : {},
          this.tableData[0].email !== undefined ? { field: 'email', key: 'email', title: '메일주소', width: 200, align: 'center' } : {},
          this.tableData[0].createdDate !== undefined ? { field: 'createdDate', key: 'createdDate', title: '등록일', width: 200, align: 'center' } : {},
          this.tableData[0].setting !== undefined ? {
            field: 'setting',
            key: 'setting',
            title: '관리',
            width: 50,
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

      // click regist button
      registModalShow () {
        this.type = '1'
        this.$modal.show('info-modal')
      },

      // click customer info button
      async infoShow (rowDatas) {
        this.type = '2'
        let reqParam = {
          id: rowDatas.id,
          accessToken: this.accessToken
        }

        // api call
        this.loadingInstance.show()
        try {
          await USER.userList(reqParam).then(res => {
            if (Object.keys(res.data).length !== 0) {
              res.data[0].profile = COMMON.default.changeProfileName(res.data[0].profile)
              res.data[0].created_date = COMMON.default.changeDateTimeFormat(new Date(res.data[0].created_date))
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
        this.pageNumberChange(1)
      },

      // data search
      async searchData () {
        // param set
        let reqParam = {}
        this.name !== '' ? reqParam.userName = this.name : undefined
        this.phone !== '' ? reqParam.userPhone = this.phone : undefined

        // api request
        await this.initTableData(reqParam)
        this.pageNumberChange(1)
      },
      // excel download
      async excelDown () {
        let reqParam = {}
        this.name !== '' ? reqParam.userName = this.name : undefined
        this.phone !== '' ? reqParam.userPhone = this.phone : undefined
        reqParam.accessToken = this.accessToken

        // api call
        this.loadingInstance.show()
        try {
          await USER.csvDownload(reqParam)
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
        reqParam.accessToken = this.accessToken

        // api request
        this.loadingInstance.show()
        try {
          await USER.userList(reqParam).then(res => {
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
                  profile: COMMON.default.changeProfileName(element.profile),
                  name: element.name,
                  rank: element.rank,
                  phone: element.phone,
                  officePhone: element.office_phone,
                  email: element.email,
                  createdDate: COMMON.default.changeDateTimeFormat(new Date(element.created_date)),
                  setting: '수정'
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

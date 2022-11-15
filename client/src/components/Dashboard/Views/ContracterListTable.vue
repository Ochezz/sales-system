<template>
    <div class="row customer-detail-wrap">
      <ContracterInfoModal :datas="INFO_DATA"></ContracterInfoModal>
      <RegistItemModal></RegistItemModal>
      <h4>계약자 목록</h4>
      <h6>총 고객수 {{totalCount}}명</h6>
      <div class="customer-top-wrap">
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
          <label style="display: inline-block;">이름</label>
          <input style="display: inline-block;" type="text" class="customer-name-input" v-model="name">
          <label style="display: inline-block;">휴대폰번호</label>
          <input style="display: inline-block;" type="text" class="customer-phone-input" v-model="phone">
          <button class="btn-detail" @click="searchData()">검색</button>
        </section>
        <div class="btn-wrap">
          <button v-if="profile===0" class="btn-control excel-down-btn" @click="registShow()"><i class="ti-upload btn-font-size-12px"></i> 등록</button>
          <button class="btn-control customer-setting-btn">
            <router-link :to="path === '/reservation/contract/list' ? {path:'/reservation/contract/manage'} : {path:'/reservation/payment/manage'}">예약관리현황</router-link>
          </button>
          <button class="btn-control customer-setting-btn">
            <router-link :to="path === '/reservation/contract/list' ? {path:'/reservation/contract/visit'} : {path:'/reservation/payment/visit'}">예약현황</router-link>
          </button>
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
  import ContracterInfoModal from '../Modal/ContracterInfoModal.vue'
  import RegistItemModal from '../Modal/RegistItemModal.vue'

  import * as CONTRACT from '../../../api/contractor'
  import * as COMMON from '../../../common/globalFunction'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    components: {
      ContracterInfoModal,
      RegistItemModal
    },
    data () {
      return {
        nowDate: '',
        name: '',
        phone: '',
        path: '',
        INFO_DATA: {},
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
          {field: 'no', key: 'no', title: 'NO', width: 50, align: 'center'},
          { field: 'name', key: 'name', title: '성명', width: 80, align: 'center' },
          { field: 'phone', key: 'phone', title: '휴대폰', width: 100, align: 'center' },
          this.path === '/reservation/contract/list' ? { field: 'birthday', key: 'birthday', title: '생년월일', width: 100, align: 'center' } : {},
          this.path === '/reservation/contract/list' ? { field: 'type', key: 'type', title: '주택형', width: 100, align: 'center' } : {},
          this.path === '/reservation/payment/list' ? { field: 'room', key: 'room', title: '호수', width: 100, align: 'center' } : {},
          { field: 'resvDate', key: 'resvDate', title: '예약일시', width: 200, align: 'center' },
          {
            field: 'setting',
            key: 'setting',
            title: '관리',
            width: 50,
            align: 'center',
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return <a on-click={() => this.infoShow(row)}>{row.setting}</a>
            }
          }
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

      // reset data
      resetData () {
        this.name = ''
        this.phone = ''
        this.pageNumberChange(1)
      },

      // click setting button
      async registShow () {
        this.$modal.show('regist-item-modal')
      },

      // click customer info button
      infoShow (rowDatas) {
        this.INFO_DATA = rowDatas
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
        let reqParam = {
          userName: this.name,
          userPhone: this.phone
        }
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
          await CONTRACT.contractorList(reqParam).then(res => {
            if (res.data.length === 0) {
              this.showEmpty = true
            }
            else {
              this.showEmpty = false

              // data
              res.data.forEach((element) => {
                if (element.resvDate !== null) {
                  element.resvDate = COMMON.default.changeDateTimeFormat(new Date(element.resvDate))
                }
                element.phone = COMMON.default.changePhoneFormat(element.phone)
                element.setting = '수정'

                this.TABLE_DATA.push(element)
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

      this.path = this.$route.path
      await this.initTableData({})
    },
    destroyed () {
      this.loadingInstance.destroy()
    }
  }

</script>
<style>

</style>

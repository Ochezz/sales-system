<template>
    <div class="row customer-detail-wrap">
      <SettingModal :datas="SETTING_DATA"></SettingModal>
      <InfoModal :datas="INFO_DATA" :setting="SETTING_DATA"></InfoModal>
      <h4>관심 고객 목록</h4>
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
        <div>
          <div class="customer-search-wrap">
            <label :style="SEARCH_INFOS.search_name ? 'display: inline-block;' : 'display: none;'">이름</label>
            <input :style="SEARCH_INFOS.search_name ? 'display: inline-block;' : 'display: none;'" type="text" class="customer-name-input" v-model="name">
            <label :style="SEARCH_INFOS.search_phone ? 'display: inline-block;' : 'display: none;'">휴대폰번호</label>
            <input :style="SEARCH_INFOS.search_phone ? 'display: inline-block;' : 'display: none;'" type="text" class="customer-phone-input" v-model="phone">
            <button v-if="SEARCH_INFOS.search_name || SEARCH_INFOS.search_phone" class="btn-detail" @click="searchData()">검색</button>
          </div>
          <div class="btn-wrap">
            <button v-if="profile===0" class="btn-control excel-down-btn" @click="excelDown()"><i class="ti-download btn-font-size-12px"></i> 엑셀</button>
            <button v-if="profile===0" class="btn-control customer-setting-btn" @click="settingShow()">표시항목설정</button>
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
  import SettingModal from '../Modal/CustomerSettingModal.vue'
  import InfoModal from '../Modal/CustomerInfoModal.vue'

  import * as MEMBER from '../../../api/member'
  import * as INTERESTED from '../../../api/interested'
  import * as COMMON from '../../../common/globalFunction'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    components: {
      SettingModal,
      InfoModal
    },
    data () {
      return {
        nowDate: '',
        name: '',
        phone: '',
        SEARCH_INFOS: {},
        SETTING_DATA: {},
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
          this.SETTING_DATA.useName === 1 ? { field: 'name', key: 'name', title: '성명', width: 80, align: 'center' } : {},
          this.SETTING_DATA.usePhone === 1 ? { field: 'phone', key: 'phone', title: '휴대폰', width: 150, align: 'center' } : {},
          this.SETTING_DATA.useAgeGroup === 1 ? { field: 'ageGroup', key: 'ageGroup', title: '연령대', width: 60, align: 'center' } : {},
          this.SETTING_DATA.useEmail === 1 ? { field: 'email', key: 'email', title: 'email', width: 60, align: 'center' } : {},
          this.SETTING_DATA.useAddress === 1 ? { field: 'totalAddress', key: 'totalAddress', title: '주소', width: 550, align: 'center' } : {},
          { field: 'device', key: 'device', title: '등록기기', width: 70, align: 'center' },
          this.SETTING_DATA.useMarketting  === 'Y' ? {
            field: 'useMarketting',
            key: 'useMarketting',
            title: '마케팅활용수신동의',
            width: 150,
            align: 'center',
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              if (row.useMarketting === 'N') {
                return <span style="color: #FF4C40; font-weight: bold;">N</span>
              }
              else if (row.useMarketting === 'Y') {
                return 'Y'
              }
            }
          } : {},
          { field: 'registedDate', key: 'registedDate', title: '등록일', width: 200, align: 'center' },
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
      // reset data
      resetData () {
        this.name = ''
        this.phone = ''
        this.pageNumberChange(1)
      },

      // page update
      async updateDate () {
        // component clear
        this.resetData()
        // api request
        await this.initTableData('', '')
      },

      // click setting button
      async settingShow () {
        this.$modal.show('setting-modal')
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
        await this.initTableData(this.name, this.phone)
        this.pageNumberChange(1)
      },
      // excel download
      async excelDown () {
        let reqParam = {
          name: this.name,
          phone: this.phone,
          accessToken: this.accessToken
        }

        // api call
        this.loadingInstance.show()
        try {
          await INTERESTED.csvDownload(reqParam)
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        await this.loadingInstance.close()
      },

      // table data
      async initTableData (name, phone) {
        this.TABLE_DATA = []
        let reqParam = {
          name: name,
          phone: phone,
          accessToken: this.accessToken
        }

        // api call
        this.loadingInstance.show()
        try {
          await INTERESTED.setting({accessToken: this.accessToken}).then(res => {
            if (Object.keys(res.data).length !== 0) {
              this.SETTING_DATA = res.data
            }
          })
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        // api request
        try {
          await MEMBER.list(reqParam).then(res => {
            if (Object.keys(res.data.data).length === 0) {
              this.showEmpty = true
            }
            else {
              this.showEmpty = false

              // search infos
              this.SEARCH_INFOS = res.data.infos

              // data
              res.data.data.forEach((element) => {
                let totalAdd = ''
                if (element.address1 === undefined && element.address2 === undefined) {
                  totalAdd = undefined
                }
                else if (element.address1 !== undefined && element.address2 === undefined) {
                  totalAdd = element.address1
                }
                else if (element.address1 === undefined && element.address2 !== undefined) {
                  totalAdd = element.address2
                }
                else {
                  totalAdd = element.address1 + ' ' + element.address2
                }
                element.totalAddress = totalAdd
                element.no = COMMON.default.emptyCheckInt(element.no)
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

      await this.initTableData('', '')
    },
    destroyed () {
      this.loadingInstance.destroy()
    }
  }

</script>
<style>

</style>

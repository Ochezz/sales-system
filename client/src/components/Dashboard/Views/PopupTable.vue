<template>
    <div class="row news-wrap">
      <PopupInfoModal></PopupInfoModal>
      <PopupInfoModal type="2" :datas="INFO_DATA"></PopupInfoModal>
      <!-- <PopupInfoModal type="2" :id="selectId"></PopupInfoModal> -->
      <h4>팝업관리 목록</h4>
      <h6>등록 팝업수 {{totalCount}}건</h6>
      <div class="news-top-wrap">
        <div class="row">
          <div class="col-md-12 update-header-wrap">
            <button @click="updateDate">
              <i class="ti-reload"></i>
            </button>
              마지막 갱신 {{nowDate}}
          </div>
        </div>
        <div class="news-search-wrap">
          <label style="display: inline-block;">제목</label>
          <input v-model="searchTitle" style="'display: inline-block;" type="text" class="title-input">
          <button class="btn-detail" @click="searchData()">검색</button>
        </div>
        <button class="btn-control news-btn" @click="popupCreateShow">등록</button>
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
  import PopupInfoModal from '../Modal/PopupInfoModal.vue'

  import * as POPUP from '../../../api/popup'
  import * as COMMON from '../../../common/globalFunction'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    components: {
      PopupInfoModal
    },
    data () {
      return {
        selectId: null,
        nowDate: '',
        searchTitle: '',
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
        let columns = this.tableData.length !== 0 ? [
          this.tableData[0].num !== undefined ? {field: 'num', key: 'num', title: 'NO', width: 50, align: 'center'} : {},
          this.tableData[0].created_date !== undefined ? { field: 'created_date', key: 'created_date', title: '작성일', width: 200, align: 'center' } : {},
          this.tableData[0].start_date !== undefined ? { field: 'start_date', key: 'start_date', title: '시작일', width: 200, align: 'center' } : {},
          this.tableData[0].end_date !== undefined ? { field: 'end_date', key: 'end_date', title: '종료일', width: 200, align: 'center' } : {},
          this.tableData[0].title !== undefined ? { field: 'title', key: 'title', title: '제목', width: 400, align: 'center' } : {},
          this.tableData[0].type !== undefined ? { field: 'type', key: 'type', title: '팝업구분', width: 150, align: 'center' } : {},
          this.tableData[0].is_active !== undefined ? {
            field: 'is_active',
            key: 'is_active',
            title: '노출',
            width: 70,
            align: 'center',
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              if (row.is_active === 'N') {
                return <span style="color: #FF4C40; font-weight: bold;">N</span>
              }
              else if (row.is_active === 'Y') {
                return 'Y'
              }
            } } : {},
          this.tableData[0].setting !== undefined ? {
            field: 'setting',
            key: 'setting',
            title: '상세보기',
            width: 100,
            align: 'center',
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return <a on-click={() => this.popupUpdateShow(row)}>{row.setting}</a>
            }
          } : {}
        ] : []

        return columns
      }
    },
    methods: {
      // reset data
      resetData () {
        this.searchTitle = ''
        this.pageNumberChange(1)
      },

      // page update
      async updateDate () {
        // component clear
        this.resetData()
        // api request
        await this.initTableData('')
      },

      // click setting button
      popupCreateShow () {
        this.$modal.show('popup-create-modal')
      },

      // click customer info button
      async popupUpdateShow (rowDatas) {
        let reqParam = {
          id: rowDatas.id,
          accessToken: this.accessToken
        }

        // api request
        this.loadingInstance.show()
        try {
          await POPUP.list(reqParam).then(res => {
            if (Object.keys(res.data).length !== 0) {
              if (res.data.type === 'I') {
                res.data.imgURL = res.data.content
                res.data.youtubeURL = ''
              }
              else {
                res.data.youtubeURL = res.data.content
                res.data.hrefURL = ''
              }
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
        this.$modal.show('popup-update-modal')
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
        await this.initTableData(this.searchTitle)
        this.pageNumberChange(1)
      },

      // table data
      async initTableData (title) {
        this.TABLE_DATA = []
        let reqParam = {
          title: title,
          accessToken: this.accessToken
        }

        // api request
        this.loadingInstance.show()
        try {
          await POPUP.list(reqParam).then(res => {
            if (Object.keys(res.data).length === 0) {
              this.showEmpty = true
            }
            else {
              this.showEmpty = false

              // data
              res.data.forEach((element) => {
                this.TABLE_DATA.push({
                  id: element.id,
                  num: COMMON.default.emptyCheckInt(element.no),
                  title: element.title,
                  type: element.type,
                  created_date: COMMON.default.changeDateTimeFormat(new Date(element.created_date)),
                  start_date: COMMON.default.changeDateTimeFormat(new Date(element.start_date)),
                  end_date: COMMON.default.changeDateTimeFormat(new Date(element.end_date)),
                  is_active: element.isActive,
                  setting: '상세보기'
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

      await this.initTableData('')
    },
    destroyed () {
      this.loadingInstance.destroy()
    }
  }

</script>
<style>

</style>

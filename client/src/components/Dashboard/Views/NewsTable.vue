<template>
    <div class="row news-wrap">
      <NewsInfoModal></NewsInfoModal>
      <NewsInfoModal type="2" :datas="INFO_DATA"></NewsInfoModal>
      <h4>언론보도 목록</h4>
      <h6>등록 게시글수 {{totalCount}}건</h6>
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
        <button class="btn-control news-btn" @click="newsCreateShow">등록</button>
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
  import NewsInfoModal from '../Modal/NewsInfoModal.vue'

  import * as PR from '../../../api/pr'
  import * as COMMON from '../../../common/globalFunction'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    components: {
      NewsInfoModal
    },
    data () {
      return {
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

      // base uri
      baseUri () {
        return `http://${window.location.hostname}:3001/`
      },

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
          this.tableData[0].release_date !== undefined ? { field: 'release_date', key: 'release_date', title: '언론사게시일', width: 90, align: 'center' } : {},
          this.tableData[0].thumnail !== undefined ? {
            field: 'thumnail',
            key: 'thumnail',
            title: '썸네일',
            width: 200,
            align: 'center',
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return <img class="fit-picture" src={this.baseUri + row.thumnail}/>
            }
          } : {},
          this.tableData[0].title !== undefined ? {
            field: 'title',
            key: 'title',
            title: '뉴스 제목',
            width: 300,
            align: 'center',
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return <a href={row.source_url} target="_blank">{row.title}</a>
            }
          } : {},
          this.tableData[0].media !== undefined ? { field: 'media', key: 'media', title: '언론매체명', width: 80, align: 'center' } : {},
          this.tableData[0].created_date !== undefined ? { field: 'created_date', key: 'created_date', title: '상세보기 등록일', width: 250, align: 'center' } : {},
          this.tableData[0].is_active !== undefined ? {
            field: 'is_active',
            key: 'is_active',
            title: '공개여부',
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
          this.tableData[0].created_by !== undefined ? { field: 'created_by', key: 'created_by', title: '작성자', width: 80, align: 'center' } : {},
          this.tableData[0].setting !== undefined ? {
            field: 'setting',
            key: 'setting',
            title: '상세보기',
            width: 70,
            align: 'center',
            renderBodyCell: ({ row, column, rowIndex }, h) => {
              return <a on-click={() => this.newsUpdateShow(row)}>{row.setting}</a>
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
      newsCreateShow () {
        this.$modal.show('news-create-modal')
      },

      // click customer info button
      newsUpdateShow (rowDatas) {
        this.INFO_DATA = rowDatas
        this.$modal.show('news-update-modal')
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
          await PR.list(reqParam).then(res => {
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
                  thumnail: element.thumnail,
                  media: element.media,
                  release_date: COMMON.default.changeDateFormat(new Date(element.release_date)),
                  source_url: element.source_url,
                  detail: element.detail,
                  is_active: element.is_active,
                  created_date: COMMON.default.changeDateTimeFormat(new Date(element.created_date)),
                  created_by: element.created_by,
                  updated_date: COMMON.default.changeDateTimeFormat(new Date(element.updated_date)),
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

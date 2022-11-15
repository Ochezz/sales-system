<template>
  <modal class="news-create-dialog" name="regist-item-modal" :clickToClose="false" :width="'50%'" :height="'30%'">
      <div class="dialog-wrap">
        <form @submit.prevent="registItem($event)">
          <div class='detail-icon-wrap'>
            <i class="ti-close detail-icon" @click="modalHide"></i>
          </div>
          <div class="dialog-content">
            <h4>일괄 등록</h4>
            <hr>
            <table>
              <tr>
                <th>파일</th>
                <td>
                  <input type="file"
                        id="popup-file"
                        name="image"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        required/>
                </td>
              </tr>
            </table>
          </div>
          <div class="dialog-buttons">
            <button class="btn-control" type="submit">업로드</button>
            <button class="btn-detail" @click="modalHide($event)">닫기</button>
          </div>
        </form>
      </div>
    </modal>
</template>
<script>
  import * as XLSX from 'xlsx/xlsx.mjs'
  import * as CONTRACT from '../../../api/contractor'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    data () {
      return {
        loadingInstance: null
      }
    },
    computed: {
      ...mapState(loginStore, ['accessToken'])
    },
    methods: {
      // modal close
      modalHide (e) {
        e.preventDefault()
        this.$modal.hide('regist-item-modal')
      },

      // regist item
      async registItem (e) {
        e.preventDefault()
        // loading screen
        this.loadingInstance.show()

        let reqParam = {}

        const file = document.getElementById('popup-file').files[0]
        let reader = new FileReader()
        let tmpResult = {}
        reader.onload = async (e) => {
            let data = reader.result
            let workbook = XLSX.read(data, {type: 'binary', cellText: false, cellDates: true})
            workbook.SheetNames.forEach(sheetName => {
                workbook.Sheets[sheetName].A1.w = 'userName'
                workbook.Sheets[sheetName].B1.w = 'userPhone'
                workbook.Sheets[sheetName].C1.w = 'birthday'
                workbook.Sheets[sheetName].D1.w = 'type'
                workbook.Sheets[sheetName].E1.w = 'room'
                workbook.Sheets[sheetName].F1.w = 'resvDate'
                workbook.Sheets[sheetName].G1.w = 'memo'

                const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {raw: false, dateNF: 'yyyy-mm-dd hh:mm:ss'})
                tmpResult = roa
            })

            tmpResult.forEach(element => {
              element.userPhone = element.userPhone.replace(/-/g, '')
            })
            reqParam.items = tmpResult
            reqParam.accessToken = this.accessToken

            // regist item
            try {
              await CONTRACT.contractorRegist(reqParam)
            }
            catch (e) {
              console.error(e)
              await this.loadingInstance.close()
              this.$router.push('/apiError')
            }

            await this.loadingInstance.close()
            this.modalHide(e)

            // init parent page
            this.$parent.resetData()
            this.$parent.initTableData({})
        }

        reader.readAsBinaryString(file)
      }
    },
    created () {
      this.loadingInstance = this.$veLoading({
        fullscreen: true,
        name: 'flow',
        lock: true
      })
    },
    destroyed () {
      this.loadingInstance.destroy()
    }
  }

</script>
<style>

</style>

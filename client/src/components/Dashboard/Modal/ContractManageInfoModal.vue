<template>
  <modal class="reserve-manage-regist-dialog" name="info-modal" :clickToClose="false" :width="'50%'" :height="'80%'">
      <div class="dialog-wrap">
        <form @submit.prevent="updateInfo($event)">
          <div class='detail-icon-wrap'>
            <i class="ti-close detail-icon" @click="modalHide"></i>
          </div>
          <div v-if="datas.length === 0" class="empty-data">데이터가 없습니다</div>
          <div v-else class="dialog-content">
            <h4>방문예약일 수정</h4>
            <hr>
            <table>
              <tr>
                <th>날짜</th>
                <td>
                  {{datas[0].visitDay}}
                </td>
              </tr>
              <tr>
                <th>시간별 상담 정원</th>
                <td>
                  <div v-for="(data, idx) in datas" :key="idx" class="reserve-manage-discuss">
                    <span>{{data.visitTime.substring(0, 5) + ' :'}}</span>
                    <input 
                        type="number" 
                        class="reserve-manage-person-input" 
                        style="text-align:right;" 
                        :value="data.maximunNum" 
                        min="0" 
                        @keypress="inNumber($event)" 
                        :disabled="profile===1?true:false">
                    <span>명</span>
                    <span>{{' / [' + data.visitCnt + ']'}}</span>
                    <span>명</span>
                  </div>
                  <div>※정원 최소1명</div>
                </td>
              </tr>
            </table>
          </div>
          <div class="dialog-buttons">
            <button v-if="profile===0" class="btn-control" type="submit">저장</button>
            <button v-if="profile===0" class="btn-delete" @click="deleteInfo($event)">삭제</button>
            <button class="btn-detail" @click="modalHide($event)">닫기</button>
          </div>
        </form>
      </div>
    </modal>
</template>
<script>
  import * as CONTRACT from '../../../api/contractor'
  import * as COMMON from '../../../common/globalFunction'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    props: {
      datas: {
        type: Array
      }
    },
    data () {
      return {
        loadingInstance: null
      }
    },
    computed: {
      ...mapState(loginStore, ['profile', 'accessToken'])
    },
    methods: {
      // modal close
      modalHide (e) {
        e.preventDefault()
        this.$modal.hide('info-modal')
      },

      // number check
      inNumber (e) {
        COMMON.default.inNumber(e)
      },

      // update info
      async updateInfo (e) {
        e.preventDefault()

        let reqParam = {}
        let tmpArr = []
        const elem = document.getElementsByClassName('reserve-manage-person-input')
        elem.forEach((element, idx) => {
          tmpArr.push({
            id: this.datas[idx].visitTime,
            maximumNum: element.value
          })
        })
        reqParam.items = tmpArr
        reqParam.visitDay = COMMON.default.changeDateFormat(new Date(this.datas[0].visitDay))
        reqParam.accessToken = this.accessToken

        // api call
        this.loadingInstance.show()
        try {
          await CONTRACT.settingUpdate(reqParam)
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
      },
      // delete info
      async deleteInfo (e) {
        e.preventDefault()

        let reqParam = {}
        let tmpArr = []
        this.datas.forEach(element => {
          tmpArr.push({ id: element.visitTime })
        })
        reqParam.items = tmpArr
        reqParam.visitDay = COMMON.default.changeDateFormat(new Date(this.datas[0].visitDay))
        reqParam.accessToken = this.accessToken

        // api call
        this.loadingInstance.show()
        try {
          await CONTRACT.settingDelete(reqParam)
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

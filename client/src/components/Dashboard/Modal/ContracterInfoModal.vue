<template>
  <modal class="news-create-dialog" name="info-modal" :clickToClose="false" :width="'50%'" :height="'75%'">
      <div v-if="Object.keys(datas).length !== 0" class="dialog-wrap">
        <form @submit.prevent="updateInfo($event)">
          <div class='detail-icon-wrap'>
            <i class="ti-close detail-icon" @click="modalHide"></i>
          </div>
          <div class="dialog-content">
            <h4>고객상세</h4>
            <hr>
            <table>
              <tr>
                <th>이름</th>
                <td>
                  <fg-input type="text"
                            class="col-md-8"
                            id="reservation-name"
                            placeholder="이름을 입력해주세요"
                            :value="datas.name"
                            :disabled="profile===1?true:false"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>휴대폰번호</th>
                <td>
                  <fg-input type="text"
                            id="reservation-phone1"
                            placeholder="010"
                            maxlength='3'
                            :value="datas.phone !== undefined ? datas.phone.split('-')[0] : ''"
                            style="width: 75px;"
                            @keypress="inNumber($event)"
                            :disabled="profile===1?true:false"
                            required>
                  </fg-input>
                  -
                  <fg-input type="text"
                            id="reservation-phone2"
                            placeholder="0000"
                            maxlength='4'
                            :value="datas.phone !== undefined ? datas.phone.split('-')[1] : ''"
                            style="width: 75px;"
                            @keypress="inNumber($event)"
                            :disabled="profile===1?true:false"
                            required>
                  </fg-input>
                  -
                  <fg-input type="text"
                            id="reservation-phone3"
                            placeholder="0000"
                            maxlength='4'
                            :value="datas.phone !== undefined ? datas.phone.split('-')[2] : ''"
                            style="width: 75px;"
                            @keypress="inNumber($event)"
                            :disabled="profile===1?true:false"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>생년월일</th>
                <td>
                  <fg-input type="text"
                            class="col-md-8"
                            id="reservation-birth"
                            maxlength='6'
                            placeholder="생년월일을 입력해주세요"
                            :value="datas.birthday"
                            :disabled="profile===1?true:false"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>CS 메모</th>  
                <td>
                  <fg-textarea class="col-md-12"
                            id="reservation-memo"
                            :value="datas.memo"
                            placeholder="메모를 입력해주세요"
                            name="person-info"
                            :rows="'10'"
                            :disabled="profile===1?true:false">
                  </fg-textarea>
                </td>
              </tr>
            </table>
          </div>
          <div class="dialog-buttons">
            <button v-if="profile===0" class="btn-control" type="submit">저장</button>
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
        type: Object
      }
    },
    data () {
      return {
        loadingInstance: null,
        visitNum: 1
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

        const eleName = document.getElementById('reservation-name')
        const elePhone1 = document.getElementById('reservation-phone1')
        const elePhone2 = document.getElementById('reservation-phone2')
        const elePhone3 = document.getElementById('reservation-phone3')
        const eleBirth = document.getElementById('reservation-birth')
        const eleMemo = document.getElementById('reservation-memo')

        reqParam.userName = eleName.value
        reqParam.birthday = eleBirth.value
        reqParam.memo = eleMemo.value
        reqParam.userPhone = elePhone1.value + elePhone2.value + elePhone3.value
        reqParam.accessToken = this.accessToken

        // update info
        reqParam.id = this.datas.id

        // api call
        this.loadingInstance.show()
        try {
          await CONTRACT.contractorUpdate(reqParam)
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

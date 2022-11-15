<template>
  <modal class="info-dialog" name="info-modal" :clickToClose="false" :width="'50%'" :height="'80%'">
      <div class="dialog-wrap">
        <form @submit.prevent="infoUpdate($event)">
          <div class='detail-icon-wrap'>
            <i class="ti-close detail-icon" @click="modalHide"></i>
          </div>
          <div class="dialog-content">
            <h4>관심고객정보 수정</h4>
            <hr>
            <table>
              <tr v-if="setting.useName === 1">
                <th>성명</th>
                <td>
                  <fg-input type="text"
                            id="customer-info-name"
                            placeholder="홍길동"
                            :value="datas.name"
                            style="width: 200px;"
                            :disabled="profile===1?true:false"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr v-if="setting.usePhone === 1">
                <th>연락처</th>
                <td>
                  <fg-input type="text"
                            id="customer-info-phone1"
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
                            id="customer-info-phone2"
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
                            id="customer-info-phone3"
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
              <tr v-if="setting.useAgeGroup === 1">
                <th>연령대</th>
                <td>
                  <fg-input type="text"
                            id="customer-info-age"
                            placeholder="입력해주세요"
                            :value="datas.ageGroup"
                            style="width: 200px;"
                            :disabled="profile===1?true:false"
                            required>
                  </fg-input>
                  대
                </td>
              </tr>
              <tr v-if="setting.useEmail === 1">
                <th>E-mail</th>
                <td>
                  <fg-input type="text"
                            id="customer-info-email"
                            placeholder="hivesystem@hive.com"
                            :value="datas.email"
                            style="width: 300px;"
                            :disabled="profile===1?true:false"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr v-if="setting.useAddress === 1">
                <th>주소</th>
                <td>
                    <fg-input type="text"
                              id="customer-info-zipCd"
                              placeholder="우편번호"
                              label="우편번호"
                              :value="datas.zipCode"
                              style="width: 130px;"
                              :disabled="profile===1?true:false"
                              required>
                    </fg-input>
                    <fg-input type="text"
                            id="customer-info-add2"
                            placeholder="시 주소"
                            label="시 주소"
                            style="width: 100%;"
                            :value="datas.address1"
                            :disabled="profile===1?true:false"
                            required>
                    </fg-input>
                    <fg-input type="text"
                            id="customer-info-add1"
                            placeholder="구/동/면/리 주소"
                            label="구/동/면/리 주소"
                            style="width: 100%;"
                            :value="datas.address2"
                            :disabled="profile===1?true:false"
                            required>
                    </fg-input>
                </td>
              </tr>
              <tr>
                <th>관심 고객 등록일</th>  
                <td>
                  {{datas.registedDate}}
                </td>
              </tr>
              <tr v-if="setting.useMarketting === 'Y'">
                <th>수신동의</th>  
                <td>
                  <input id="marketing" type="checkbox" :checked="datas.useMarketting === 'Y' ? 'checked' : ''" :disabled="profile===1?true:false"/>
                  <label class="radio-inline-label" for="marketing">
                      마케팅활용에 수신동의합니다
                  </label>
                </td>
              </tr>
            </table>
          </div>
          <div class="dialog-buttons">
            <button v-if="profile===0" class="btn-control" type="submit">저장</button>
            <button v-if="profile===0" class="btn-delete" @click="infoDelete($event)">탈퇴</button>
            <button class="btn-detail" @click="modalHide($event)">닫기</button>
          </div>
        </form>
      </div>
    </modal>
</template>
<script>
  import * as COMMON from '../../../common/globalFunction'
  import * as MEMBER from '../../../api/member'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    props: {
      datas: {
        type: Object,
        default: {}
      },
      setting: {
        type: Object,
        default: () => {
          return {
            useName: 0,
            usePhone: 0,
            useEmail: 0,
            useAgeGroup: 0,
            useAddress: 0,
            useMarketting: ''
          }
        }
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
      modalHide (e) {
        e.preventDefault()
        this.$modal.hide('info-modal')
      },

      // number check
      inNumber (e) {
        COMMON.default.inNumber(e)
      },

      async infoUpdate (e) {
        e.preventDefault()
        const eleName = document.getElementById('customer-info-name')
        const elePhone1 = document.getElementById('customer-info-phone1')
        const elePhone2 = document.getElementById('customer-info-phone2')
        const elePhone3 = document.getElementById('customer-info-phone3')
        const eleAge = document.getElementById('customer-info-age')
        const eleZipCd = document.getElementById('customer-info-zipCd')
        const eleAdd1 = document.getElementById('customer-info-add2')
        const eleAdd2 = document.getElementById('customer-info-add1')
        const eleEmail = document.getElementById('customer-info-email')
        const eleMarketing = document.getElementById('marketing')

        // request param set
        let reqParam = {
          id: this.datas.id,
          accessToken: this.accessToken
        }

        // param value check
        this.setting.useName === 1 ? reqParam.name = eleName.value : reqParam.name = this.datas.name
        this.setting.usePhone === 1 ? reqParam.phone = elePhone1.value + '-' + elePhone2.value + '-' + elePhone3.value : reqParam.phone = this.datas.phone
        this.setting.useAgeGroup === 1 ? reqParam.ageGroup = eleAge.value : reqParam.ageGroup = this.datas.ageGroup
        this.setting.useEmail === 1 ? reqParam.email = eleEmail.value : reqParam.email = this.datas.email

        if (this.setting.useAddress === 1) {
          reqParam.zipCode = eleZipCd.value
          reqParam.address1 = eleAdd1.value
          reqParam.address2 = eleAdd2.value
        }
        else {
          reqParam.zipCode = this.datas.zipCode
          reqParam.address1 = this.datas.address1
          reqParam.address2 = this.datas.address2
        }

        if (this.setting.useMarketting === 'Y') {
          eleMarketing.checked ? reqParam.useMarketting = 1 : reqParam.useMarketting = 0
        }
        else {
          reqParam.useMarketting = this.datas.useMarketting
        }

        // api call
        this.loadingInstance.show()
        try {
          await MEMBER.infoUpdate(reqParam)
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        await this.loadingInstance.close()
        this.modalHide(e)
        this.$parent.resetData()
        this.$parent.initTableData('', '')
      },

      // delete info
      async infoDelete (e) {
        e.preventDefault()

        // request param set
        let reqParam = {
          id: this.datas.id,
          accessToken: this.accessToken
        }

        // api call
        this.loadingInstance.show()
        try {
          await MEMBER.infoDelete(reqParam)
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        await this.loadingInstance.close()
        this.modalHide(e)
        this.$parent.resetData()
        this.$parent.initTableData('', '')
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

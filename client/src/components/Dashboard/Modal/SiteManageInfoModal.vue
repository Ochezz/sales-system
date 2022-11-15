<template>
  <modal class="info-dialog" name="info-modal" :clickToClose="false" :width="'50%'" :height="'80%'">
      <div class="dialog-wrap">
        <form @submit.prevent="infoUpdate($event)">
          <div class='detail-icon-wrap'>
            <i class="ti-close detail-icon" @click="modalHide"></i>
          </div>
          <div class="dialog-content">
            <h4 v-if="type==='1'">상담사 등록</h4>
            <h4 v-else-if="type==='2'">상담사 수정</h4>
            <hr>
            <table>
              <tr>
                <th>관리등급</th>
                <td v-if="type==='1'">
                  <select class="person-select" name="person" id="profile" @change="changeComponent($event)">
                    <option value='0'>최고관리자</option>
                    <option value='1'>사이트관리자</option>
                  </select>
                </td>
                <td v-else>
                  {{datas.profile}}
                </td>
              </tr>
              <tr>
                <th>성명</th>
                <td>
                  <fg-input type="text"
                            id="info-name"
                            placeholder="홍길동"
                            :value="type==='1' ? '' : datas.name"
                            style="width: 200px;"
                            maxlength='11'
                            :disabled="profile===1?true:false"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>아이디</th>
                <td>
                  <fg-input type="text"
                            id="info-id"
                            placeholder="id"
                            :value="type==='1' ? '' : datas.id"
                            style="width: 200px;"
                            :disabled="profile===1?true:false"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <td>
                  <fg-input type="password"
                            id="info-password"
                            placeholder="password"
                            style="width: 200px;"
                            @focus.prevent="onFocusPassword($event)"
                            @blur.prevent="onBlurPassword($event)">
                  </fg-input>
                </td>
              </tr>
              <tr v-if="(type==='2' && datas.profile==='사이트관리자') || selectProfile==='1'" class="table-tr-ip">
                <th>허용할 IP</th>
                <td>
                  <div id="error-text" style="display: none; color: red;">중복된 IP가 있습니다</div>
                  <div v-for="(item, idx) in type==='1' ? ipComponent : datas.ips" :key="idx">
                    <fg-input type="text"
                              class="info-ip"
                              placeholder="0.0.0.0"
                              :value="item"
                              style="width: 200px;"
                              :disabled="profile===1?true:false"
                              required>
                    </fg-input>
                    <button v-if="idx===0" class="ti-plus" :disabled="profile===1?true:false" @click.prevent="addIpComponent()"></button>
                    <button v-else class="ti-minus" :disabled="profile===1?true:false" @click.prevent="deleteIpComponent(idx)"></button>
                  </div>
                </td>
              </tr>
              <tr>
                <th>휴대폰번호</th>
                <td>
                  <fg-input type="text"
                            id="info-phone1"
                            placeholder="010"
                            maxlength='3'
                            :value="type==='1' ? '' : datas.phone !== undefined ? datas.phone.split('-')[0] : ''"
                            style="width: 75px;"
                            :disabled="profile===1?true:false"
                            @keypress="inNumber($event)">
                  </fg-input>
                  -
                  <fg-input type="text"
                            id="info-phone2"
                            placeholder="0000"
                            maxlength='4'
                            :value="type==='1' ? '' : datas.phone !== undefined ? datas.phone.split('-')[1] : ''"
                            style="width: 75px;"
                            :disabled="profile===1?true:false"
                            @keypress="inNumber($event)">
                  </fg-input>
                  -
                  <fg-input type="text"
                            id="info-phone3"
                            placeholder="0000"
                            maxlength='4'
                            :value="type==='1' ? '' : datas.phone !== undefined ? datas.phone.split('-')[2] : ''"
                            style="width: 75px;"
                            :disabled="profile===1?true:false"
                            @keypress="inNumber($event)">
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>사무실전화번호</th>
                <td>
                  <fg-input type="text"
                            id="info-office-phone1"
                            placeholder="02"
                            maxlength='3'
                            :value="type==='1' ? '' : datas.office_phone !== undefined ? datas.office_phone.split('-')[0] : ''"
                            style="width: 75px;"
                            :disabled="profile===1?true:false"
                            @keypress="inNumber($event)">
                  </fg-input>
                  -
                  <fg-input type="text"
                            id="info-office-phone2"
                            placeholder="000"
                            maxlength='3'
                            :value="type==='1' ? '' : datas.office_phone !== undefined ? datas.office_phone.split('-')[1] : ''"
                            style="width: 75px;"
                            :disabled="profile===1?true:false"
                            @keypress="inNumber($event)">
                  </fg-input>
                  -
                  <fg-input type="text"
                            id="info-office-phone3"
                            placeholder="0000"
                            maxlength='4'
                            :value="type==='1' ? '' : datas.office_phone !== undefined ? datas.office_phone.split('-')[2] : ''"
                            style="width: 75px;"
                            :disabled="profile===1?true:false"
                            @keypress="inNumber($event)">
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>직급(직위)</th>
                <td>
                  <fg-input type="text"
                            id="info-rank"
                            placeholder="팀장"
                            :value="type==='1' ? '' : datas.rank"
                            style="width: 200px;"
                            :disabled="profile===1?true:false">
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>E-mail</th>
                <td>
                  <fg-input type="text"
                            id="info-email"
                            placeholder="hivesystem@hive.com"
                            :value="type==='1' ? '' : datas.email"
                            style="width: 300px;"
                            :disabled="profile===1?true:false">
                  </fg-input>
                </td>
              </tr>
              <tr v-if="type==='2'">
                <th>등록일(최종수정일)</th>  
                <td>
                  {{datas.created_date}}
                </td>
              </tr>
              <tr>
                <th>메모</th>
                <td>
                  <fg-textarea class="col-md-12"
                            id="memo"
                            :value="type==='1' ? '' : datas.memo"
                            placeholder="메모"
                            name="person-info"
                            :rows="'10'"
                            :disabled="profile===1?true:false">
                  </fg-textarea>
                </td>
              </tr>
            </table>
          </div>
          <div class="dialog-buttons">
            <button class="btn-control" type="submit">저장</button>
            <button v-if="type==='2' && profile===0" class="btn-delete" @click="infoDelete($event)">삭제</button>
            <button class="btn-detail" @click="modalHide($event)">닫기</button>
          </div>
        </form>
      </div>
    </modal>
</template>
<script>
  import * as COMMON from '../../../common/globalFunction'
  import * as USER from '../../../api/user'
  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    props: {
      datas: {
        type: Object,
        default: {}
      },
      type: {
        type: String,
        default: '1' // 1:regist 2:modify
      }
    },
    data () {
      return {
        selectProfile: '0',
        loadingInstance: null,
        ipComponent: ['']
      }
    },
    computed: {
      ...mapState(loginStore, ['profile', 'accessToken'])
    },
    methods: {
      modalHide (e) {
        e.preventDefault()
        this.selectProfile = '0'
        this.ipComponent = ['']
        this.$modal.hide('info-modal')
      },

      // number check
      inNumber (e) {
        COMMON.default.inNumber(e)
      },

      // on Focus Password component
      onFocusPassword (e) {
        e.target.setAttribute('type', 'text')
      },

      // on Blur Password component
      onBlurPassword (e) {
        e.target.setAttribute('type', 'password')
      },

      // on Blur Password component
      changeComponent (e) {
        if (e.target.value === '0') {
          this.selectProfile = '0'
        }
        else {
          this.selectProfile = '1'
        }
      },

      addIpComponent () {
        if (this.type === '1') {
          this.ipComponent.push('')
        }
        else {
          this.datas.ips.push('')
        }
      },

      deleteIpComponent (idx) {
        if (this.type === '1') {
          this.ipComponent.splice(idx, 1)
        }
        else {
          this.datas.ips.splice(idx, 1)
        }
      },

      async infoUpdate (e) {
        e.preventDefault()
        const eleId = document.getElementById('info-id')
        const elePassword = document.getElementById('info-password')
        const eleName = document.getElementById('info-name')
        const elePhone1 = document.getElementById('info-phone1')
        const elePhone2 = document.getElementById('info-phone2')
        const elePhone3 = document.getElementById('info-phone3')
        const eleOfficePhone1 = document.getElementById('info-office-phone1')
        const eleOfficePhone2 = document.getElementById('info-office-phone2')
        const eleOfficePhone3 = document.getElementById('info-office-phone3')
        const eleRank = document.getElementById('info-rank')
        const eleEmail = document.getElementById('info-email')
        const eleMemo = document.getElementById('memo')

        // request param set
        let reqParam = {
          id: eleId.value,
          password: elePassword.value,
          name: eleName.value,
          phone: elePhone1.value === '' && elePhone2.value === '' && elePhone3.value === '' ? '' : elePhone1.value + '-' + elePhone2.value + '-' + elePhone3.value,
          officePhone: eleOfficePhone1.value === '' && eleOfficePhone2.value === '' && eleOfficePhone3.value === '' ?
                        '' : eleOfficePhone1.value + '-' + eleOfficePhone2.value + '-' + eleOfficePhone3.value,
          rank: eleRank.value,
          email: eleEmail.value,
          memo: eleMemo.value
        }

        if (this.type === '1') {
          if (this.selectProfile === '0') {
            reqParam.ip = []
          }
          else if (this.selectProfile === '1') {
            const eleIp = document.getElementsByClassName('info-ip')
            let ipArr = []
            eleIp.forEach(element => {
              const inputElem = element.getElementsByTagName('input')[0]
              if (inputElem.value !== '') {
                ipArr.push(inputElem.value)
              }
            })

            // ip duplicate check
            const errorText = document.getElementById('error-text')
            if (new Set(ipArr).size !== ipArr.length) {
              errorText.style.display = 'block'
              errorText.scrollIntoView()
              await this.loadingInstance.close()
              return
            }
            reqParam.ip = ipArr
          }

          reqParam.profile = this.selectProfile
          reqParam.accessToken = this.accessToken

          // api call
          this.loadingInstance.show()
          try {
            await USER.userRegist(reqParam)
          }
          catch (e) {
            console.error(e)
            await this.loadingInstance.close()
            this.$router.push('/apiError')
          }
        }
        else {
          if (this.datas.profile === '최고관리자') {
            reqParam.profile = 0
            reqParam.ip = []
          }
          else if (this.datas.profile === '사이트관리자') {
            const eleIp = document.getElementsByClassName('info-ip')
            let ipArr = []
            eleIp.forEach(element => {
              const inputElem = element.getElementsByTagName('input')[0]
              if (inputElem.value !== '') {
                ipArr.push(inputElem.value)
              }
            })

            // ip duplicate check
            const errorText = document.getElementById('error-text')
            if (new Set(ipArr).size !== ipArr.length) {
              errorText.style.display = 'block'
              errorText.scrollIntoView()
              await this.loadingInstance.close()
              return
            }

            reqParam.profile = 1
            reqParam.ip = ipArr
          }

          reqParam.accessToken = this.accessToken

          // api call
          try {
            await USER.userUpdate(reqParam)
          }
          catch (e) {
            console.error(e)
            await this.loadingInstance.close()
            this.$router.push('/apiError')
          }
        }

        await this.loadingInstance.close()
        this.modalHide(e)
        this.$parent.resetData()
        this.$parent.initTableData({})
      },

      // delete info
      async infoDelete (e) {
        e.preventDefault()
        // loading screen
        this.loadingInstance.show()

        // request param set
        let reqParam = {
          id: this.datas.id,
          accessToken: this.accessToken
        }

        // api call
        try {
          await USER.userDelete(reqParam)
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        await this.loadingInstance.close()
        this.modalHide(e)
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

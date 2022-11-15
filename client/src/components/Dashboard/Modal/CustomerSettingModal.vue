<template>
  <modal class="setting-dialog" name="setting-modal" :clickToClose="false" :width="'50%'" :height="'80%'">
      <div class="dialog-wrap">
        <div class='detail-icon-wrap'>
          <i class="ti-close detail-icon" @click="modalHide"></i>
        </div>
        <div class="dialog-content">
          <h4>표시항목설정</h4>
          <hr>
          <table>
            <tr>
              <th>개인정보 취급 내용</th>
              <td><textarea class="form-control" :value="datas.infomationText" placeholder="내용을 입력해주세요" name="person-info" rows="10"></textarea></td>
            </tr>
            <tr>
              <th>성명</th>
              <td>
                <input id="name-true" type="radio" name="name" :value=1 :checked="datas.useName === 1 ? 'checked' : ''"/>
                <label class="radio-inline-label" for="name-true">
                    사용
                </label>
                <input id="name-false" type="radio" name="name" :value=0 :checked="datas.useName === 0 ? 'checked' : ''"/>
                <label class="radio-inline-label" for="name-false">
                    사용안함
                </label>
              </td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>
                <input id="phone-true" type="radio" name="phone" :value=1 :checked="datas.usePhone === 1 ? 'checked' : ''"/>
                <label class="radio-inline-label" for="phone-true">
                    사용
                </label>
                <input id="phone-false" type="radio" name="phone" :value=0 :checked="datas.usePhone === 0 ? 'checked' : ''"/>
                <label class="radio-inline-label" for="phone-false">
                    사용안함
                </label>
              </td>
            </tr>
            <tr>
              <th>연령대</th>  
              <td>
                <input id="age-true" type="radio" name="age" :value=1 :checked="datas.useAgeGroup === 1 ? 'checked' : ''"/>
                <label class="radio-inline-label" for="age-true">
                    사용
                </label>
                <input id="age-false" type="radio" name="age" :value=0 :checked="datas.useAgeGroup === 0 ? 'checked' : ''"/>
                <label class="radio-inline-label" for="age-false">
                    사용안함
                </label>
              </td>
            </tr>
            <tr>
              <th>E-mail</th>  
              <td>
                <input id="email-true" type="radio" name="email" :value=1 :checked="datas.useEmail === 1 ? 'checked' : ''"/>
                <label class="radio-inline-label" for="email-true">
                    사용
                </label>
                <input id="email-false" type="radio" name="email" :value=0 :checked="datas.useEmail === 0 ? 'checked' : ''"/>
                <label class="radio-inline-label" for="email-false">
                    사용안함
                </label>
              </td>
            </tr>
            <tr>
              <th>주소</th>  
              <td>
                <input id="address-true" type="radio" name="address" :value=1 :checked="datas.useAddress === 1 ? 'checked' : ''"/>
                <label class="radio-inline-label" for="address-true">
                    사용
                </label>
                <input id="address-false" type="radio" name="address" :value=0 :checked="datas.useAddress === 0 ? 'checked' : ''"/>
                <label class="radio-inline-label" for="address-false">
                    사용안함
                </label>
              </td>
            </tr>
            <tr>
              <th>수신동의</th>  
              <td>
                <input id="marketing-true" type="radio" name="marketing" :value=1 :checked="datas.useMarketting === 'Y' ? 'checked' : ''"/>
                <label class="radio-inline-label" for="marketing-true">
                    사용
                </label>
                <input id="marketing-false" type="radio" name="marketing" :value=0 :checked="datas.useMarketting === 'N' ? 'checked' : ''"/>
                <label class="radio-inline-label" for="marketing-false">
                    사용안함
                </label>
              </td>
            </tr>
          </table>
        </div>
        <div class="dialog-buttons">
          <button class="btn-control" @click="columnsUpdate">저장</button>
          <button class="btn-detail" @click="modalHide">닫기</button>
        </div>
      </div>
    </modal>
</template>
<script>
  import * as INTERESTED from '../../../api/interested'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    props: {
      datas: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        loadingInstance: null
      }
    },
    computed: {
      ...mapState(loginStore, ['accessToken'])
    },
    methods: {
      modalHide () {
        this.$modal.hide('setting-modal')
      },

      // columns update
      async columnsUpdate () {
        let reqParam = {
          infomation: '',
          name: 0,
          phone: 0,
          ageGroup: 0,
          email: 0,
          address: 0,
          marketting: 0
        }

        const nodeArr = [
          document.getElementsByName('name'),
          document.getElementsByName('phone'),
          document.getElementsByName('age'),
          document.getElementsByName('email'),
          document.getElementsByName('address'),
          document.getElementsByName('marketing')
        ]

        // param set
        reqParam.infomation = document.getElementsByName('person-info')[0].value

        nodeArr.forEach((arr, index) => {
          if (arr.length !== 0) {
            let flag = 0
            arr.forEach((node) => {
              if (node.checked) {
                flag = parseInt(node.value)
              }
            })

            if (index === 0) {
              reqParam.name = flag
            }
            else if (index === 1) {
              reqParam.phone = flag
            }
            else if (index === 2) {
              reqParam.ageGroup = flag
            }
            else if (index === 3) {
              reqParam.email = flag
            }
            else if (index === 4) {
              reqParam.address = flag
            }
            else if (index === 5) {
              reqParam.marketting = flag
            }
          }
        })
        reqParam.accessToken = this.accessToken

        // api request
        this.loadingInstance.show()
        try {
          await INTERESTED.settingUpdate(reqParam)
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        await this.loadingInstance.close()
        this.modalHide()
        this.$parent.initTableData('', '')
      }
    },
    async created () {
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

<template>
  <modal class="reserve-manage-regist-dialog" name="regist-modal" :clickToClose="false" :width="'50%'" :height="'80%'">
      <div class="dialog-wrap">
        <form id="form" @submit.prevent="registInfo($event)">
          <div class='detail-icon-wrap'>
            <i class="ti-close detail-icon" @click="modalHide"></i>
          </div>
          <div class="dialog-content">
            <h4>방문예약일 일괄등록</h4>
            <hr>
            <table>
              <tr>
                <th>상담일</th>
                <td>
                  <div id="reserve-manage-date">
                    <span>시작 종료일</span>
                    <date-picker v-model="dateRange" type="date" range placeholder="기간을 선택해주세요" :lang="lang" :input-attr="{'required': true}"></date-picker>
                  </div>
                  <div>
                    ※선택된 기간은 일괄 적용됩니다. 날짜별 수정은 [수정] 메뉴를 이용바랍니다.(시간 수정 불가)
                  </div>
                  <div>
                    ※중복된 상담일은 자동 취소 됩니다. 등록 후 상담일 확인이 필요합니다.
                  </div>
                  <div>
                    ※상담 1부터 입력이 필요합니다.
                  </div>
                  <div>
                    ※날짜에 시간을 추가 및 삭제하고 싶은 경우에는 해당날짜를 삭제하고 다시 등록해주세요.
                  </div>
                </td>
              </tr>
              <tr>
                <th>시간별 상담 정원</th>
                <td>
                  <div id="error-text" style="display: none; color: red;"></div>
                  <div v-for="(num, idx) in 16" :key="idx" class="reserve-manage-discuss">
                    <div>{{'상담 ' + num}}</div>
                    <select class="time-select reserve-manage-hour">
                      <option value="" selected>시</option>
                      <option v-for="(num, idx) in 10" :key="idx" :value="num === 1 ? '09' : num + 8">{{num + 8}}</option>
                    </select>
                    <span>시</span>
                    <select class="time-select reserve-manage-min">
                      <option value="" selected>분</option>
                      <option v-for="(num, idx) in 60" :key="idx" :value="idx <= 10 ? '0' + idx : idx">{{idx}}</option>
                    </select>
                    <span>분</span>
                    <input type="number" class="reserve-manage-person-input" min="0" @keypress="inNumber($event)">
                    <span>명</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="dialog-buttons">
            <button class="btn-control" type="submit">저장</button>
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
        dateRange: [null, null],
        lang: {
          formatLocale: {
            // MMM
            monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            // dd
            weekdaysMin: ['일', '월', '화', '수', '목', '금', '토']
          },
          monthBeforeYear: false
        }
      }
    },
    computed: {
      ...mapState(loginStore, ['accessToken'])
    },
    methods: {
      // modal close
      modalHide (e) {
        e.preventDefault()
        this.dateRange = [null, null]
        this.$modal.hide('regist-modal')
      },

      // number check
      inNumber (e) {
        COMMON.default.inNumber(e)
      },

      // regist info
      async registInfo (e) {
        e.preventDefault()

        let reqParam = { items: [] }

        let skipCheck = false
        const errorText = document.getElementById('error-text')
        const elemHour = document.getElementsByClassName('reserve-manage-hour')
        const elemMin = document.getElementsByClassName('reserve-manage-min')
        const elemPerson = document.getElementsByClassName('reserve-manage-person-input')

        reqParam.startvisitDay = COMMON.default.changeDateFormat(new Date(this.dateRange[0]))
        reqParam.endvisitDay = COMMON.default.changeDateFormat(new Date(this.dateRange[1]))
        reqParam.accessToken = this.accessToken

        for (let idx = 0; idx < elemHour.length; idx++) {
          if (elemHour[idx].value !== '' && elemMin[idx].value !== '' && elemPerson[idx].value !== '') {
            if (skipCheck) {
              errorText.style.display = 'block'
              errorText.innerHTML = '시간별 상담 정원이 순서대로 입력되지 않았습니다.'
              this.loadingInstance.close()
              errorText.scrollIntoView()
              return
            }

            reqParam.items.push({
              visitTime: elemHour[idx].value + ':' + elemMin[idx].value + ':00',
              maximumNum: elemPerson[idx].value
            })
          }
          else if (elemHour[0].value === '' && elemMin[0].value === '' && elemPerson[0].value === '') {
            errorText.style.display = 'block'
            errorText.innerHTML = '시간별 상담 정원이 순서대로 입력되지 않았습니다.'
            this.loadingInstance.close()
            errorText.scrollIntoView()
            skipCheck = true
            return
          }
          else if (elemHour[idx].value === '' && elemMin[idx].value === '' && elemPerson[idx].value === '') {
            skipCheck = true
          }
          else if (elemHour[idx].value !== '' || elemMin[idx].value !== '' || elemPerson[idx].value !== '') {
            errorText.style.display = 'block'
            errorText.innerHTML = '상담' + (idx + 1) + '에 입력되지 않은 값이 있습니다.'
            this.loadingInstance.close()
            errorText.scrollIntoView()
            return
          }
        }

        // api call
        this.loadingInstance.show()
        try {
          await CONTRACT.settingRegist(reqParam)
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        await this.loadingInstance.close()
        this.modalHide(e)

        // init parent page
        this.dateRange = [null, null]
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

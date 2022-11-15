<template>
  <modal class="news-create-dialog" :name="type==='1' ? 'popup-create-modal' : 'popup-update-modal'" :clickToClose="false" :width="'50%'" :height="'80%'">
      <div class="dialog-wrap">
        <form @submit.prevent="registInfo($event)">
          <div class='detail-icon-wrap'>
            <i class="ti-close detail-icon" @click="modalHide"></i>
          </div>
          <div class="dialog-content">
            <h4 v-if="type==='1'">팝업 등록</h4>
            <h4 v-if="type==='2'">팝업 수정</h4>
            <hr>
            <table>
              <tr>
                <th>제목</th>
                <td>
                  <fg-input type="text"
                            class="col-md-12"
                            id="popup-title"
                            placeholder="제목을 입력해주세요"
                            :value="datas.title"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>게시물구분</th>
                <td>
                  <input id="type-image" type="radio" name="type" value="I" :checked="datas.type === 'I' ? 'checked' : ''" @change="popup='I'" required/>
                  <label class="radio-inline-label" for="type-image">
                      이미지 팝업
                  </label>
                  <input id="type-youtube" type="radio" name="type" value="Y" :checked="datas.type === 'Y' ? 'checked' : ''" @change="popup='Y'" required/>
                  <label class="radio-inline-label" for="type-youtube">
                      유튜브 동영상 팝업
                  </label>
                </td>
              </tr>
              <tr v-if="popup === 'I'">
                <th>팝업이미지</th>
                <td>
                  <img :src="type === '1' || (type !== '1' && datas.imgURL === undefined) ? 
                        'https://dummyimage.com/250x250/ffffff/000000.png&text=preview+image' : baseUri + datas.imgURL"
                      alt="팝업이미지"
                      id="preview-image"
                      @click="clickImg()"
                      style="width: 250px;">
                  <input type="file"
                        id="popup-file"
                        name="image"
                        @change="readImage($event.target)"
                        accept="image/*"
                        :required="type === '1' ? true : false"/>
                  <div>* 이미지 크기 : Width X Height</div>
                </td>
              </tr>
              <tr>
                <th>링크</th>
                <td>
                  <fg-input type="text"
                            class="col-md-12"
                            id="popup-link"
                            placeholder="링크를 입력해주세요"
                            :value="popup === 'I' ? datas.hrefURL : datas.youtubeURL"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr v-if="popup === 'I'">
                <th>팝업형태</th>
                <td>
                  <input id="current-image" type="radio" name="image-target" :value=0 :checked="datas.isNewpage === 0 ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="current-image">
                      현재창으로 열기
                  </label>
                  <input id="new-image" type="radio" name="image-target" :value=1 :checked="datas.isNewpage === 1 ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="new-image">
                      새창으로 열기
                  </label>
                </td>
              </tr>
              <tr v-if="popup === 'Y'">
                <th>유튜브 팝업사이즈</th>
                <td>
                  <input id="size-854x480" type="radio" name="youtube-size" value="854_480" :checked="datas.dispSize === '854_480' ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="size-854x480">
                      854 X 480
                  </label>
                  <input id="size-640x360" type="radio" name="youtube-size" value="640_360" :checked="datas.dispSize === '640_360' ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="size-640x360">
                      640 X 360
                  </label>
                </td>
              </tr>
              <tr>
                <th>위치</th>
                <td>
                  <input id="position-left" type="radio" name="position" value="0" :checked="datas.position === '0' ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="position-left">
                      왼쪽
                  </label>
                  <input id="position-center" type="radio" name="position" value="1" :checked="datas.position === '1' ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="position-center">
                      중앙
                  </label>
                  <input id="position-right" type="radio" name="position" value="2" :checked="datas.position === '2' ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="position-right">
                      오른쪽
                  </label>
                </td>
              </tr>
              <tr>
                <th>높이</th>
                <td>
                  <input id="priority-high" type="radio" name="priority" value="100" :checked="datas.priority === '100' ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="priority-high">
                      위
                  </label>
                  <input id="priority-middle" type="radio" name="priority" value="50" :checked="datas.priority === '50' ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="priority-middle">
                      중앙
                  </label>
                  <input id="priority-row" type="radio" name="priority" value="0" :checked="datas.priority === '0' ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="priority-row">
                      아래
                  </label>
                </td>
              </tr>
              <tr>
                <th>게시기간</th>
                <td>
                  <date-picker v-model="dateRange"
                              type="datetime"
                              range
                              style="width:350px;"
                              id="popup-release-date"
                              placeholder="날짜를 선택해주세요"
                              :lang="lang"
                              :input-attr="{'required': true}">
                  </date-picker>
                </td>
              </tr>
              <tr>
                <th>노출</th>  
                <td>
                  <input id="active-true" type="radio" name="active" :value=1 :checked="datas.isActive === 1 ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="active-true">
                      공개
                  </label>
                  <input id="active-false" type="radio" name="active" :value=0 :checked="datas.isActive === 0 ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="active-false">
                      비공개
                  </label>
                </td>
              </tr>
            </table>
          </div>
          <div class="dialog-buttons">
            <button class="btn-control" type="submit">저장</button>
            <button v-if="type==='2'" class="btn-delete" @click="deleteInfo($event)">삭제</button>
            <button class="btn-detail" @click="modalHide($event)">닫기</button>
          </div>
        </form>
      </div>
    </modal>
</template>
<script>
  import * as POPUP from '../../../api/popup'
  import * as COMMON from '../../../common/globalFunction'

  import { mapState } from 'vuex'
  const loginStore = 'loginStore'

  export default {
    props: {
      type: {
        type: String,
        default: '1'  // 1:regist 2:update
      },
      datas: {
        type: Object,
        default: () => {
          return {
            type: 'I'
          }
        }
      }
    },
    data () {
      return {
        loadingInstance: null,
        dateRange: [null, null],
        popup: '',
        imageData: {},
        youtubeData: {},
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
      ...mapState(loginStore, ['accessToken']),

      // base uri
      baseUri () {
        return `http://${window.location.hostname}:3001/`
      }
    },
    methods: {
      // modal close
      modalHide (e) {
        e.preventDefault()
        if (this.type === '1') {
          this.dateRange = [null, null]
          this.$modal.hide('popup-create-modal')
          this.popup = 'I'
          this.datas.type = 'I'
        }
        else {
          this.dateRange = [new Date(this.datas.startDate), new Date(this.datas.endDate)]
          this.$modal.hide('popup-update-modal')
          this.datas.type = ''
        }
      },

      // regist or update info
      async registInfo (e) {
        e.preventDefault()

        let reqParam = {}
        const formData = new FormData()
        formData.append('title', document.getElementById('popup-title').value)
        formData.append('type', this.popup)
        formData.append('position', COMMON.default.isCheckElementStrValue(document.getElementsByName('position')))
        formData.append('priority', COMMON.default.isCheckElementStrValue(document.getElementsByName('priority')))
        formData.append('startDate', COMMON.default.changeDateTimeFormat(this.dateRange[0]))
        formData.append('endDate', COMMON.default.changeDateTimeFormat(this.dateRange[1]))
        formData.append('isActive', COMMON.default.isCheckElementIntValue(document.getElementsByName('active')))

        if (this.popup === 'I') {
          formData.append('isNewpage', COMMON.default.isCheckElementIntValue(document.getElementsByName('image-target')))
          formData.append('hrefUrl', document.getElementById('popup-link').value)
          formData.append('dispSize', '')
        }
        else {
          formData.append('dispSize', COMMON.default.isCheckElementStrValue(document.getElementsByName('youtube-size')))
          formData.append('content', document.getElementById('popup-link').value)
          formData.append('hrefUrl', '')
          formData.append('isNewpage', 1)
        }

        this.loadingInstance.show()
        if (this.type === '1') {
          // regist info
          if (this.popup === 'I') {
            const image = document.getElementById('popup-file').files[0]
            formData.append('image', image)
          }
          reqParam.formData = formData
          reqParam.accessToken = this.accessToken

          try {
            await POPUP.popupRegist(reqParam)
          }
          catch (e) {
            console.error(e)
            await this.loadingInstance.close()
            this.$router.push('/apiError')
          }
          this.popup = 'I'
        }
        else {
          // update info
          formData.append('id', this.datas.id)
          if (this.popup === 'I') {
            const image = document.getElementById('popup-file').files[0]
            image !== undefined ? formData.append('image', image) : formData.append('content', this.datas.content)
          }
          reqParam.formData = formData
          reqParam.accessToken = this.accessToken

          try {
            await POPUP.popupUpdate(reqParam)
          }
          catch (e) {
            console.error(e)
            await this.loadingInstance.close()
            this.$router.push('/apiError')
          }
          this.popup = 'I'
        }

        await this.loadingInstance.close()
        this.modalHide(e)

        // init parent page
        this.$parent.resetData()
        this.$parent.initTableData('')
      },
      // delete info
      async deleteInfo (e) {
        e.preventDefault()

        let reqParam = {
          id: this.datas.id,
          accessToken: this.accessToken
        }

        // api call
        this.loadingInstance.show()
        try {
          await POPUP.popupDelete(reqParam)
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
        this.$parent.initTableData('')
      },

      // open file select window when image file click
      clickImg () {
        document.getElementById('popup-file').click()
      },

      // image preview
      readImage (input) {
        // image selected
        if (input.files && input.files[0]) {
          var fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf|JPG|JPEG|PNG|GIF|BMP|PDF)$/
          if (!input.files[0].name.match(fileForm)) {
            alert('이미지 파일만 업로드 가능')
            return
          }

          const reader = new FileReader()
          reader.onload = e => {
            const previewImage = document.getElementById('preview-image')
            previewImage.src = e.target.result
          }

          reader.readAsDataURL(input.files[0])
        }
        // image not selected
        else {
          const previewImage = document.getElementById('preview-image')
          previewImage.src = 'https://dummyimage.com/250x250/ffffff/000000.png&text=preview+image'
        }
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
    },
    watch: {
      'datas.startDate': {
        handler () {
          this.dateRange[0] = new Date(this.datas.startDate)
        }
      },
      'datas.endDate': {
        handler () {
          this.dateRange[1] = new Date(this.datas.endDate)
        }
      },
      'datas.type': {
        handler () {
          if (this.datas.type === 'I') {
            this.popup = 'I'
          }
          else {
            this.popup = 'Y'
          }
        },
        immediate: true
      }
    }
  }

</script>
<style>

</style>

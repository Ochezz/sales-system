<template>
  <modal class="news-create-dialog" :name="type==='1' ? 'news-create-modal' : 'news-update-modal'" :clickToClose="false" :width="'50%'" :height="'80%'">
      <div class="dialog-wrap">
        <form @submit.prevent="registInfo($event)">
          <div class='detail-icon-wrap'>
            <i class="ti-close detail-icon" @click="modalHide"></i>
          </div>
          <div class="dialog-content">
            <h4 v-if="type==='1'">언론보도 등록</h4>
            <h4 v-if="type==='2'">언론보도 수정</h4>
            <hr>
            <table v-if="type==='2'">
              <tr>
                <th>등록일시</th>
                <td>{{datas.created_date}}</td>
                <th>수정일시</th>
                <td>{{datas.updated_date}}</td>
              </tr>
            </table>
            <table>
              <tr>
                <th>제목</th>
                <td>
                  <fg-input type="text"
                            class="col-md-12"
                            id="news-title"
                            placeholder="제목을 입력해주세요"
                            :value="datas.title"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>썸네일</th>
                <td>
                  <img :src="type==='1' ? 'https://dummyimage.com/250x250/ffffff/000000.png&text=preview+image' : baseUri + datas.thumnail"
                      alt="image"
                      id="preview-image"
                      @click="clickImg()"
                      style="width: 250px;">
                  <input type="file"
                        id="news-file"
                        name="news-file"
                        @change="readImage($event.target)"
                        accept="image/*"
                        :required="type==='1' ? true : false"/>
                  <div>* 이미지 크기 : Width X Height</div>
                </td>
              </tr>
              <tr>
                <th>언론보도 매체명</th>
                <td>
                  <fg-input type="text"
                            id="news-media"
                            placeholder="매체명을 입력해주세요"
                            :value="datas.media"
                            required>
                  </fg-input>
                </td>
              </tr>
              <tr>
                <th>언론사 게시일</th>
                <td>
                  <date-picker v-model="selectDate"
                              type="date"
                              id="news-release-date"
                              placeholder="날짜를 선택해주세요"
                              :lang="lang"
                              :input-attr="{'required': true}">
                  </date-picker>
                </td>
              </tr>
              <tr>
                <th>언론사 링크</th>
                <td>
                    <fg-input type="text"
                              class="col-md-12"
                              id="news-link"
                              placeholder="링크를 입력해주세요"
                              :value="datas.source_url"
                              required>
                    </fg-input>
                </td>
              </tr>
              <tr>
                <th>보도내용</th>  
                <td>
                  <fg-textarea class="col-md-12"
                            id="news-detail"
                            :value="datas.detail"
                            placeholder="내용을 입력해주세요"
                            name="person-info"
                            :rows="'10'"
                            required>
                  </fg-textarea>
                </td>
              </tr>
              <tr>
                <th>노출</th>  
                <td>
                  <input id="active-true" type="radio" name="news-active" :value=1 :checked="datas.is_active === 'Y' ? 'checked' : ''" required/>
                  <label class="radio-inline-label" for="active-true">
                      공개
                  </label>
                  <input id="active-false" type="radio" name="news-active" :value=0 :checked="datas.is_active === 'N' ? 'checked' : ''" required/>
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
  import * as PR from '../../../api/pr'
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
            title: '',
            active: '',
            media: '',
            thumnail: '',
            detail: '',
            source_url: '',
            release_date: ''
          }
        }
      }
    },
    data () {
      return {
        loadingInstance: null,
        selectDate: '',
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
          this.selectDate = ''
          this.$modal.hide('news-create-modal')
        }
        else {
          this.selectDate = new Date(this.datas.release_date)
          this.$modal.hide('news-update-modal')
        }
      },

      // regist or update info
      async registInfo (e) {
        e.preventDefault()
        let reqParam = {}
        let flag = 0

        document.getElementsByName('news-active').forEach((node) => {
          if (node.checked) {
            flag = parseInt(node.value)
          }
        })

        const formData = new FormData()
        const image = document.getElementById('news-file').files[0]
        formData.append('title', document.getElementById('news-title').value)
        formData.append('isActive', flag)
        formData.append('media', document.getElementById('news-media').value)
        formData.append('releaseDate', COMMON.default.changeDateFormat(this.selectDate))
        formData.append('sourceUrl', document.getElementById('news-link').value)
        formData.append('detail', document.getElementById('news-detail').value)

        // loading screen
        this.loadingInstance.show()

        if (this.type === '1') {
          // regist info
          formData.append('image', image)
          reqParam.formData = formData
          reqParam.accessToken = this.accessToken
          try {
            await PR.pressRegist(reqParam)
          }
          catch (e) {
            console.error(e)
            await this.loadingInstance.close()
            this.$router.push('/apiError')
          }
        }
        else {
          // update info
          formData.append('id', this.datas.id)
          image !== undefined ? formData.append('image', image) : formData.append('thumnailUrl', this.datas.thumnail)
          reqParam.formData = formData
          reqParam.accessToken = this.accessToken
          try {
            await PR.pressUpdate(reqParam)
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
          await PR.pressDelete(reqParam)
        }
        catch (e) {
          console.error(e)
          await this.loadingInstance.close()
          this.$router.push('/apiError')
        }

        await this.loadingInstance.close()
        this.modalHide(e)
        this.$parent.resetData()
        this.$parent.initTableData('')
      },

      // open file select window when image file click
      clickImg () {
        document.getElementById('news-file').click()
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
    async created () {
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
      'datas.release_date': {
        handler () {
          this.selectDate = new Date(this.datas.release_date)
        },
        immediate: true
      }
    }
  }

</script>
<style>

</style>

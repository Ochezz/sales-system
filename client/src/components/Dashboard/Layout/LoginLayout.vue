<template>
  <div class="login-wrap">
    <img src="static/img/logo.png" alt="">
    <div class="col-md-4">
      <div class="card">
        <div class="header">
          <h4 class="title text-center">로그인</h4>
        </div>
        <div class="content">
          <form id="login-form" @submit.prevent="onClicklogin">
            <div v-if="loginSuccess === false" class="row">
              <div class="col-md-12 text-center" style="color: red;">
                로그인에 실패 하였습니다
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <fg-input type="text"
                          id="login-id"
                          label="아이디"
                          placeholder="아이디를 입력해주세요"
                          required>
                </fg-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <fg-input type="password"
                          id="login-password"
                          label="패스워드"
                          placeholder=" 패스워드를 입력해주세요"
                          autocomplete="off"
                          required
                          @focus.prevent="onFocusPassword($event)"
                          @blur.prevent="onBlurPassword($event)">
                </fg-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 recaptcha-wrap">
                <vue-recaptcha 
                  ref="recaptcha"
                  :sitekey="$cfg.recaptchaSiteKey"
                  @verify="onVerify"
                  @expired="onExpired">
                </vue-recaptcha>
              </div>
            </div>
            <div class="text-center">
              <button class="btn btn-info btn-fill btn-wd" :disabled="isDisabled">
                로그인
              </button>
            </div>
            <div class="clearfix"></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
import * as AUTH from '../../../api/auth'
import { VueRecaptcha } from 'vue-recaptcha'
import { mapActions, mapState, mapMutations } from 'vuex'
const loginStore = 'loginStore'

  export default {
    components: {
      VueRecaptcha
    },
    data () {
        return {
          isDisabled: true,
          count: 0,
          loadingInstance: null,
          term: ''
        }
    },
    computed: {
      ...mapState(loginStore, ['loginSuccess'])
    },
    methods: {
      ...mapMutations(loginStore, ['logoutStateReset']),
      ...mapActions(loginStore, ['login', 'logout']),
      async onClicklogin () {
        this.loadingInstance.show()

        // api call
        let reqParam = {
          id: document.getElementById('login-id').value,
          password: document.getElementById('login-password').value
        }

        try {
          await this.login(reqParam)
        }
        catch (e) {
          console.error(e)
        }

        if (this.loginSuccess === true) {
          this.$router.push('/admin/overview')
        }

        await this.loadingInstance.close()
      },
      // on Focus Password component
      onFocusPassword (e) {
        e.target.setAttribute('type', 'text')
      },

      // on Blur Password component
      onBlurPassword (e) {
        e.target.setAttribute('type', 'password')
      },

      // for reCHAPCHA
      onVerify (r) {
        if (r !== '') {
          this.isDisabled = false
        } else {
          return false
        }
      },
      onExpired () {
        this.$refs.recaptcha.reset()
      },
      exec () {
        this.$refs.recaptcha.execute()
      },
      reset () {
        this.$refs.recaptcha.reset()
        this.isDisabled = true
      }
    },
    async created () {
      // loading screen
      this.loadingInstance = this.$veLoading({
        fullscreen: true,
        name: 'flow',
        lock: true
      })

      // reset login status
      await AUTH.logout()
      this.logoutStateReset()
    },
    destroyed () {
      this.loadingInstance.destroy()
    }
  }

</script>

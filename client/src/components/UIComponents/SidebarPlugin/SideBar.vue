<template>
  <div :class="sidebarClasses"
       :data-background-color="backgroundColor"
       :data-active-color="activeColor">
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <img src="static/img/logo.png" alt="">
      </div>
      <div class="logo-under-id-wrap">
        <div v-if="profile===0">권한 : 최고관리자</div>
        <div v-else-if="profile===1">권한 : 사이트관리자</div>
        <div>이름 : {{nickName}} 님</div>
      </div>
      <div class="logo-under-btn-wrap">
          <router-link class="col-md-6 text-center" :to="{path:'/admin/overview'}">
            홈페이지
          </router-link>
          <a class="col-md-6 text-center" @click="signOut()">
            로그아웃
          </a>
      </div>
      <slot>

      </slot>
      <ul :class="navClasses">
        <div v-for="(link,index) in sidebarLinks" :key="link.name + index">
          <router-link v-if="link.subMenu === undefined" :to="link.path" tag="li" :ref="link.name" @click.native="getComponentTop($event)">
            <a>
              <i :class="link.icon"></i>
              <p>{{link.name}}</p>
            </a>
          </router-link>
          <side-bar-drop-down v-else :title="link.name" :icon="link.icon">
            <router-link v-for="(obj, index) in link.subMenu" :to="obj.path" :class="obj.id" tag="li" :ref="obj.name" :key="obj.name + index" @click.native="getComponentTop($event)">
              <a>
                <p>{{obj.name}}</p>
              </a>
            </router-link>
          </side-bar-drop-down>
        </div>
      </ul>
      <moving-arrow :move-y="arrowMovePx">

      </moving-arrow>
    </div>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import MovingArrow from './MovingArrow.vue'
  import * as AUTH from '../../../api/auth'
  const loginStore = 'loginStore'
  export default {
    props: {
      type: {
        type: String,
        default: 'sidebar',
        validator: (value) => {
          let acceptedValues = ['sidebar', 'navbar']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      backgroundColor: {
        type: String,
        default: 'black',
        validator: (value) => {
          let acceptedValues = ['white', 'black', 'darkblue']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      activeColor: {
        type: String,
        default: 'info',
        validator: (value) => {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      sidebarLinks: {
        type: Array,
        default: () => []
      }
    },
    components: {
      MovingArrow
    },
    computed: {
      ...mapState(loginStore, ['nickName', 'profile']),
      sidebarClasses () {
        if (this.type === 'sidebar') {
          return 'sidebar'
        } else {
          return 'collapse navbar-collapse off-canvas-sidebar'
        }
      },
      navClasses () {
        if (this.type === 'sidebar') {
          return 'nav'
        } else {
          return 'nav navbar-nav'
        }
      }
    },
    data () {
      return {
        linkHeight: 60,
        activeLinkIndex: 0,

        windowWidth: 0,
        isWindows: false,
        hasAutoHeight: false,
        arrowMovePx: 0,
        selectedPath: ''
      }
    },
    methods: {
      ...mapMutations(loginStore, ['logoutStateReset']),
      findActiveLink () {
        this.sidebarLinks.find((element, mainIdx) => {
          let found = this.$route.path.includes(element.path)
          if (found) {
            this.selectedPath = element.path
            this.activeLinkIndex = mainIdx
          }
          return found
        })
      },
      getComponentTop (e) {
        if (this.selectedPath.includes('/detail/') || this.selectedPath.includes('/reservation/')) {
          this.arrowMovePx = e.target.getBoundingClientRect().top - 195 - 2
        }
        else {
          this.arrowMovePx = e.target.getBoundingClientRect().top - 195
        }
      },
      async signOut () {
        await AUTH.logout()
        this.logoutStateReset()
        this.$router.push('/login')
      }
    },
    mounted () {
      this.findActiveLink()
    },
    watch: {
      $route: function (newRoute, oldRoute) {
        if (newRoute.path.includes('/contract/')) {
          let activeElem = document.getElementsByClassName('router-link-exact-active active')
          activeElem.forEach(element => {
            element.classList.remove('router-link-exact-active', 'active')
          })
          let elem = document.getElementsByClassName('contract-visit-li')
          elem.forEach(element => {
              element.classList.add('router-link-exact-active', 'active')
          })
        }
        else if (newRoute.path.includes('/payment/')) {
          let activeElem = document.getElementsByClassName('router-link-exact-active active')
          activeElem.forEach(element => {
            element.classList.remove('router-link-exact-active', 'active')
          })
          let elem = document.getElementsByClassName('payment-visit-li')
          elem.forEach(element => {
              element.classList.add('router-link-exact-active', 'active')
          })
        }
        else if (newRoute.path.includes('/pre/')) {
          let activeElem = document.getElementsByClassName('router-link-exact-active active')
          activeElem.forEach(element => {
            element.classList.remove('router-link-exact-active', 'active')
          })
          let elem = document.getElementsByClassName('pre-visit-li')
          elem.forEach(element => {
              element.classList.add('router-link-exact-active', 'active')
          })
        }
        else {
          let preElem = document.getElementsByClassName('pre-visit-li')
          preElem.forEach(element => {
            element.classList.remove('router-link-exact-active', 'active')
          })
          let paymentElem = document.getElementsByClassName('payment-visit-li')
          paymentElem.forEach(element => {
            element.classList.remove('router-link-exact-active', 'active')
          })
          let contractElem = document.getElementsByClassName('contract-visit-li')
          contractElem.forEach(element => {
            element.classList.remove('router-link-exact-active', 'active')
          })
        }
        this.findActiveLink()
      }
    }
  }

</script>
<style>

</style>

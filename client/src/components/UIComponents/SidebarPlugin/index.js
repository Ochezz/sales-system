import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    {
      name: '홈 대시보드',
      icon: 'ti-home',
      path: '/admin/overview'
    },
    {
      name: '방문자 현황',
      icon: 'ti-stats-up',
      path: '/detail/',
      subMenu: [
        {name: '일별 리포트', path: '/detail/activeUser'},
        {name: '지역별 리포트', path: '/detail/location'},
        {name: '콘텐츠 리포트', path: '/detail/visitedPath'},
        {name: '접속기기 리포트', path: '/detail/device'},
        {name: '채널별 리포트', path: '/detail/channel'}
      ]
    },
    {
      name: '관심고객등록 현황',
      icon: 'ti-user',
      path: '/customer/list'
    },
    {
      name: '방문예약 현황',
      icon: 'ti-clipboard',
      path: '/reservation/',
      subMenu: [
        {name: '사전 방문예약', path: '/reservation/pre/visit', id: 'pre-visit-li'},
        {name: '계약자 방문예약', path: '/reservation/contract/visit', id: 'contract-visit-li'},
        {name: '중도금 방문예약', path: '/reservation/payment/visit', id: 'payment-visit-li'}
      ]
    },
    {
      name: '언론보도 관리',
      icon: 'ti-agenda',
      path: '/news/list'
    },
    {
      name: '팝업 관리',
      icon: 'ti-agenda',
      path: '/popup/list'
    },
    {
      name: '사이트 관리',
      icon: 'ti-settings',
      path: '/site/list'
    }
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin

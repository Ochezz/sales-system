import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
import LoginLayout from '../components/Dashboard/Layout/LoginLayout.vue'
// GeneralViews
import ApiErrorPage from '../components/GeneralViews/ApiErrorPage.vue'
import NotReady from '../components/GeneralViews/NotReadyPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'

// detail pages
import LocationDetailTable from 'src/components/Dashboard/Views/LocationDetailTable.vue'
import ChannelDetailTable from 'src/components/Dashboard/Views/ChannelDetailTable.vue'
import DeviceDetailTable from 'src/components/Dashboard/Views/DeviceDetailTable.vue'
import VisitedPathDetailTable from 'src/components/Dashboard/Views/VisitedPathDetailTable.vue'
import ActiveUserDetailTable from 'src/components/Dashboard/Views/ActiveUserDetailTable.vue'

// customer pages
import CustomerTable from 'src/components/Dashboard/Views/CustomerTable.vue'

// news pages
import NewsTable from 'src/components/Dashboard/Views/NewsTable.vue'

// popup pages
import PopupTable from 'src/components/Dashboard/Views/PopupTable.vue'

// visit pages
import ReservationVisitTable from 'src/components/Dashboard/Views/ReservationVisitTable.vue'
import ReserveManageTable from 'src/components/Dashboard/Views/ReserveManageTable.vue'

// contract pages
import ContractVisitTable from 'src/components/Dashboard/Views/ContractVisitTable.vue'
import ContractManageTable from 'src/components/Dashboard/Views/ContractManageTable.vue'
import ContracterListTable from 'src/components/Dashboard/Views/ContracterListTable.vue'

// payment pages
import PaymentVisitTable from 'src/components/Dashboard/Views/PaymentVisitTable.vue'
import PaymentManageTable from 'src/components/Dashboard/Views/PaymentManageTable.vue'

// site pages
import SiteManageTable from 'src/components/Dashboard/Views/SiteManageTable.vue'

const routes = [
  {
    path: '/',
    component: LoginLayout,
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginLayout
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Overview
      }
    ]
  },
  {
    path: '/detail',
    component: DashboardLayout,
    redirect: '/detail',
    children: [
      {
        path: 'activeUser',
        name: 'activeUser',
        component: ActiveUserDetailTable
      },
      {
        path: 'location',
        name: 'location',
        component: LocationDetailTable
      },
      {
        path: 'channel',
        name: 'channel',
        component: ChannelDetailTable
      },
      {
        path: 'device',
        name: 'device',
        component: DeviceDetailTable
      },
      {
        path: 'visitedPath',
        name: 'visitedPath',
        component: VisitedPathDetailTable
      }
    ]
  },
  {
    path: '/customer',
    component: DashboardLayout,
    redirect: '/customer',
    children: [
      {
        path: 'list',
        name: 'list',
        component: CustomerTable
      }
    ]
  },
  {
    path: '/news',
    component: DashboardLayout,
    redirect: '/news',
    children: [
      {
        path: 'list',
        component: NewsTable
      }
    ]
  },
  {
    path: '/popup',
    component: DashboardLayout,
    redirect: '/popup',
    children: [
      {
        path: 'list',
        component: PopupTable
      }
    ]
  },
  {
    path: '/reservation/pre',
    component: DashboardLayout,
    redirect: '/reservation/pre',
    children: [
      {
        path: 'visit',
        component: ReservationVisitTable
      },
      {
        path: 'manage',
        component: ReserveManageTable
      }
    ]
  },
  {
    path: '/reservation/contract',
    component: DashboardLayout,
    redirect: '/reservation/contract',
    children: [
      {
        path: 'visit',
        component: ContractVisitTable
      },
      {
        path: 'manage',
        component: ContractManageTable
      },
      {
        path: 'list',
        component: ContracterListTable
      }
    ]
  },
  {
    path: '/reservation/payment',
    component: DashboardLayout,
    redirect: '/reservation/payment',
    children: [
      {
        path: 'visit',
        component: PaymentVisitTable
      },
      {
        path: 'manage',
        component: PaymentManageTable
      },
      {
        path: 'list',
        component: ContracterListTable
      }
    ]
  },
  {
    path: '/site',
    component: DashboardLayout,
    redirect: '/site',
    children: [
      {
        path: 'list',
        component: SiteManageTable
      }
    ]
  },
  { path: '*', component: NotReady },
  { path: '/apiError', component: ApiErrorPage }
]

export default routes

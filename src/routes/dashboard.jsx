import Dashboard from 'views/Dashboard/Dashboard.jsx'
import CameraPage from 'views/Camera/Camera.jsx'
import TimelinePage from 'views/Pages/Timeline.jsx'
import UserProfile from 'views/Pages/UserProfile.jsx'
import VisitorProfile from 'views/Pages/VisitorProfile.jsx'


// import TempPage from 'views/Components/Notifications.jsx'
 import TempPage from 'views/Forms/ExtendedForms.jsx'
import CustomersPage from 'views/Pages/CustomersTable.jsx'

import { store } from "../store";

// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard'
import Image from '@material-ui/icons/Image'

var dashRoutes = [
  {
    path: '/app/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard
  },
  // {
  //   path: '/app/timeline-page',
  //   name: 'Timeline Page',
  //   icon: Image,
  //   component: TimelinePage
  // },
  // {
  //   path: '/app/customers',
  //   name: 'Temp Page',
  //   icon: Image,
  //   component: TempPage
  // },
  {
    path: '/app/temp',
    name: 'Customers',
    icon: Image,
    component: CustomersPage
  },
  {
    path: '/app/camera/:id',
    name: 'Camera',
    icon: Image,
    component: CameraPage,
    hide: true
  },
  {
    collapse: true,
    path: "/app/camera",
    name: "Cameras",
    state: "openComponents",
    icon: Image,
    views: []
  },
  {
    path: '/app/user-page/:id',
    name: 'User Profile',
    icon: Image,
    component: UserProfile,
    hide: true
  },
  {
    path: '/app/visitor-page/:id',
    name: 'Visitor Profile',
    icon: Image,
    component: VisitorProfile,
    hide: true
  },
  { redirect: true, path: '/', pathTo: '/', name: 'Dashboard' }
]
export default dashRoutes

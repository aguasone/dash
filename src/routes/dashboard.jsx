import Dashboard from 'views/Dashboard/Dashboard.jsx'
import TimelinePage from 'views/Pages/Timeline.jsx'
import UserProfile from 'views/Pages/UserProfile.jsx'

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
  {
    path: '/app/timeline-page',
    name: 'Timeline Page',
    icon: Image,
    component: TimelinePage
  },
  {
    path: '/app/user-page/:id',
    name: 'User Profile',
    icon: Image,
    component: UserProfile,
    hide: true 
  },
  { redirect: true, path: '/', pathTo: '/', name: 'Dashboard' }
]
export default dashRoutes

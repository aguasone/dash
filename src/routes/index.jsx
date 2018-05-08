import Dashboard from 'layouts/Dashboard.jsx'
import LoginPage from 'views/Pages/LoginPage.jsx'

var indexRoutes = [
  { path: '/d', name: 'Home', component: Dashboard },
  { path: '/', name: 'Login', component: LoginPage},
]

export default indexRoutes

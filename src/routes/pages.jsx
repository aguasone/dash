import AboutPage from "views/Pages/AboutPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import About from "@material-ui/icons/Info";
import LockOpen from "@material-ui/icons/LockOpen";

const pagesRoutes = [
  // {
  //   path: "/register-page",
  //   name: "Register Page",
  //   short: "Register",
  //   mini: "RP",
  //   icon: PersonAdd,
  //   component: RegisterPage
  // },
  {
    path: "/login-page",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
  {
    path: "/",
    name: "About",
    short: "About",
    mini: "PP",
    icon: About,
    hidden: true,
    component: AboutPage
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/",
    name: "About Page"
  }
];

export default pagesRoutes;

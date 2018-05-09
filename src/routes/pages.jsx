import AboutPage from "views/Pages/AboutPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";

// @material-ui/icons
import Fingerprint from "@material-ui/icons/Fingerprint";
import About from "@material-ui/icons/Info";

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

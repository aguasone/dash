import Pages from "layouts/Pages.jsx";
import Dashboard from "layouts/Dashboard.jsx";

var indexRoutes = [
  { path: "/app/*", name: "Home", component: Dashboard },
  { path: "/", name: "Pages", component: Pages }
];

export default indexRoutes;

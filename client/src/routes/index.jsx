import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Auth from "views/Auth";

const indexRoutes = [
  { path: "/login", component: Auth },
  { path: "/", exact: true, component: Dashboard }
];
export default indexRoutes;

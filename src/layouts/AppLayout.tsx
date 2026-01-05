// Layout for pages
import {NavLink, Outlet} from "react-router-dom";
import Header from "../components/header/Header";

function AppLayout() {
  return (
    // can put shared content above or below Outlet
    // <span> : label; no behaviors
    // <NavLink> : when clicked, changes URL -> React Router sees change and renders page
    <div>
      <Header />
      {/* <nav>
        <NavLink to="/calendar/yearly">Yearly</NavLink>
        <NavLink to="/calendar/monthly">Monthly</NavLink>
        <NavLink to="/calendar/weekly">Weekly</NavLink>
        <NavLink to="/calendar/daily">Daily</NavLink>
      </nav> */}

      <Outlet />
    </div>
  );
}

export default AppLayout;

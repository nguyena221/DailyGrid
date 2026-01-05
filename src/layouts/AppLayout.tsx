// Layout for pages
import {Outlet} from "react-router-dom";
import Header from "../components/header/Header";

function AppLayout() {
  return (
    // can put shared content above or below Outlet
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;

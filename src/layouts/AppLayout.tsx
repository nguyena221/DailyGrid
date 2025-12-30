// Layout for pages
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    // can put shared content above or below Outlet
    // <span> : label; no behaviors
    <div>
      <nav>
        <span>Yearly</span>
        <span>Monthly</span>
        <span>Weekly</span>
        <span>Daily</span>
      </nav>

      <Outlet />
    </div>
  );
}

export default AppLayout;

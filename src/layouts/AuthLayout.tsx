// Creates a frame for Login & Signup (Sets up a box/layout for authorization)
// Use Outlet to prevent repetition if background is the same, etc., URL never changes, resets app, etc. 
// Pages = content; Layouts = things that are shared
import {Outlet} from "react-router-dom";

function AuthLayout() {
    return (
      <div>
        {/* can put the shared UI here */}
        <Outlet />
      </div>
    );
  }
  
  export default AuthLayout;
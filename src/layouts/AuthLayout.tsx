// Creates a frame for Login & Signup (Sets up a box/layout for authorization)
import {Outlet} from "react-router-dom";

function AuthLayout() {
    return (
        <div>
            <Outlet />
        </div>
    );
  }
  
  export default AuthLayout;
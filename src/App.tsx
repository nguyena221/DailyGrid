// Imported for its side effects; don't need variable
import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.css";

// Imported to use its exported components; need var.
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Yearly from "./pages/calendar/Yearly";
import Monthly from "./pages/calendar/Monthly";
import Weekly from "./pages/calendar/Weekly";
import Daily from "./pages/calendar/Daily";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    // Routes = container
    // Route = a mapping rule; path: URL pattern; element: render this component ("If this is the path, then render this component.")
    // "/" = decides the intial screen for the user; replace: prevents loop if going back; replaces history
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* this tells the program to use these routes inside the layout files */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />}  /> 
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="calendar" element={<AppLayout />}>
        <Route index element={<Navigate to="monthly" replace />} />

        <Route path="monthly" element={<Monthly />} />
        <Route path="weekly" element={<Weekly />} />
        <Route path="daily" element={<Daily />} />
        <Route path="yearly" element={<Yearly />} />
      </Route>

      <Route path="*" element={<div>404 route not found</div>} />
    </Routes>
  );
}

export default App;

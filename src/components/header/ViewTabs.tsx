// NavLink : link from React Router; changes URL when clicks -> rendered by React Router
import { NavLink } from "react-router-dom";
import "../../styles/ViewTabs.css";

// JSX.Element is something that can be shown on the screen; "Just in case" annotations
// aria-label : lets the user know what the nav is for
// to : "go to this URL"
// isActive : checks if this link matches the current URL (boolean)
function ViewTabs() {
  return (
    <nav className="view-tabs" aria-label="Calendar views tab">
      {/* "if isActive, then it will change the class name; correlated to a diff style tag." */}
      <NavLink
        to="/calendar/yearly"
        className={({ isActive }) => (isActive ? "tab active" : "tab")}
      >
        Yearly
      </NavLink>
      
      <NavLink
        to="/calendar/monthly"
        className={({ isActive }) => (isActive ? "tab active" : "tab")}
      >
        Monthly
      </NavLink>

      <NavLink
        to="/calendar/weekly"
        className={({ isActive }) => (isActive ? "tab active" : "tab")}
      >
        Weekly
      </NavLink>

      <NavLink
        to="/calendar/daily"
        className={({ isActive }) => (isActive ? "tab active" : "tab")}
      >
        Daily
      </NavLink>
    </nav>
  );
}

export default ViewTabs;
// Creating the door (to browser)
import * as React from "react";   // Blueprints/intructions
import * as ReactDOM from "react-dom/client";   // Construction crew that builds the blueprints
import { BrowserRouter } from "react-router-dom";   // Swift change without reloading; tells React to render; Allows back/forth, sharing specific URLS, etc. 
import App from "./App";
import "./styles/app.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(   // specifies that anything that is rendered is inside this
  // Catches unsafe patterns 
  <React.StrictMode>   
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


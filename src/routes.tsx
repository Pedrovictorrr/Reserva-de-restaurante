import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Login from "./pages"; 
import Dashboard from "./pages/dashboard";

const Routes = () => {
   return(
       <BrowserRouter>
           {/* <Route page = { Login }  path="/" exact />
           <Route page = { Dashboard }  path="/dashboard" /> */}
       </BrowserRouter>
   )
}

export default Routes;
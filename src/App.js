import React from "react";
import { Route, Switch } from "react-router-dom";
import Authenticated from "./Components/Authenticated";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

function App() {
  return (
   
     <Switch>
       <Route exact path="/" >
       {/* <Authenticated> */}
         <Dashboard/> 
         {/* </Authenticated>  */}
       </Route>  
       <Route exact path='/Login'  >
       <Authenticated nonAuthenticated={true}>
         <Login/> 
         </Authenticated>
       </Route>
       <Route path="*" render={()=>"404 not found"} />
     </Switch>
   
  );
}

export default App;

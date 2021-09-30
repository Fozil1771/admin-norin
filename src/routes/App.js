import React from 'react'
import '../App.css';
// ROUTE
import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTES } from "./routes";
import ProtectedRoute from './ProtectedRoutes';

function App() {



  return (
    <div className="App">


      <Switch>
        {ROUTES.map((route) => {
          if (route.key === "APP_DASHBOARD") {
            return <ProtectedRoute {...route} component={route.component} />;
          } else {
            return <Route {...route} key={route.key} />;
          }
        })}
      </Switch>


    </div>
  );
}

export default App;

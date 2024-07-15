import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Main from "./components/main/Main";
import NotificationState from "./context/notification/notificationState";
import AlertState from "./context/alerts/alertState";
import AuthState from "./context/auth/authState";
import tokenAuth from "./config/tokenAuth";
import PrivateRoute from "./components/route/PrivateRoute";

// Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <NotificationState>
      <AlertState>
        <AuthState>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/sign-up" component={SignUp} />
              <PrivateRoute exact path="/main" component={Main} />
            </Switch>
          </Router>
        </AuthState>
      </AlertState>
    </NotificationState>
  );
}

export default App;

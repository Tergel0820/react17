import React, { Component, Fragment } from "react";
import MainLayout from "./layouts/main-layout.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Ajilchid from "./pages/ajilchid";
import Haih from "./pages/haih";
import Ehlel from "./pages/ehlel";
import AjiltanTasks from "./pages/ajiltanniitasks.js";
import Login from "./pages/login";
import Archive from "./pages/Archive";
export default class App extends Component {
  state = {
    token: null,
  };

  handleLogin = (token) => {
    this.setState({ token });
    localStorage.setItem("salon", token);
    this.router.history.push("/ehlel");
  };

  handleLogout = () => {
    localStorage.removeItem("salon");
    this.setState({ token: null });
    this.router.history.push("/");
  };

  render() {
    return (
      <Fragment>
        <div>{this.setState.token}</div>
        <MainLayout>
          <ToastContainer autoClose={4000} />
          <Router ref={(router) => (this.router = router)}>
            <Switch>
              <Route path="/" exact={true}>
                <Login onLogin={this.handleLogin} />
              </Route>
              <Route path="/ehlel">
                <Ehlel logout={this.handleLogout} />
              </Route>
              <Route path="/haih">
                <Haih />
              </Route>
              <Route path="/archive">
                <Archive />
              </Route>
              <Route path="/ajilchid">
                <Ajilchid />
              </Route>
              <Route path="/ajiltan/:id/:empName">
                <AjiltanTasks />
              </Route>
            </Switch>
          </Router>
        </MainLayout>
      </Fragment>
    );
  }
}

// google-chrome --disable-web-security --user-data-dir="D:\chrome"
// qsc.hulan@gmail.com
// 88070901#
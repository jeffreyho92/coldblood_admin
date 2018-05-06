import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "reactstrap";
import Navbar from "./components/Navbar.js";

import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import Home from "./views/Home/";
import CreateItem from "./views/CreateItem/";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Container fluid>
          <br />
          <Switch>
            <Route path="/home" name="Home" component={Home} />
            <Route path="/create_item" name="CreateItem" component={CreateItem} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from './component/firebase';

// Navbar
import Nevbar from "./component/Navbar";

// Setbar
import Setbar from "./component/SETIndexBar";

// Pages
import Index from "./pages/Index";
import BCP from "./pages/bcp";
import IRPC from "./pages/irpc";
import PTT from "./pages/ptt";
import SUSCO from "./pages/susco";
import TOP from "./pages/top";
import InputJson from "./pages/InputJson";
import testdatabase from "./pages/testdatabase";
import TestGraph from "./pages/testGraph";
import Dashboard from "./pages/temp";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Nevbar />
        <Setbar />
        <Router>
          <Switch>
            <Route exact path="/" component={Index} />
            {/* Info */}
            <Route exact path="/bcp" component={BCP} />
            <Route exact path="/irpc" component={IRPC} />
            <Route exact path="/ptt" component={PTT} />
            <Route exact path="/susco" component={SUSCO} />
            <Route exact path="/top" component={TOP} />
            {/* Input data */}
            <Route exact path="/Input" component={InputJson} />
            {/* Test page */}
            <Route exact path="/database" component={testdatabase} />
            <Route exact path="/graph" component={TestGraph} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;


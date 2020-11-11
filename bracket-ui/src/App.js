import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RaidBracket from "./components/RaidBracket.js";
import SiteHeader from "./components/SiteHeader.js";
import SubmissionLanding from "./components/SubmissionLanding.js";
import DropSubmission from "./components/DropSubmission.js";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <SiteHeader />
          <Switch>
            <Route path="/SubmissionLanding">
              <SubmissionLanding />
            </Route>
            <Route path="/DropSubmission">
              <DropSubmission />
            </Route>
            <Route path="/">
              <RaidBracket />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../features/Home";
import LandingPage from "../features/LandingPage";
import SubmitSuccess from "../features/SubmitSuccess";
import Support from "../features/Support";

export default function Navigation() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/my-tickets">
            <Home />
          </Route>
          <Route exact path="/success">
            <SubmitSuccess />
          </Route>
          <Route path="/admin">
            <Support />
          </Route>
          <Route path="**">Component not found</Route>
        </Switch>
      </Router>
    </>
  );
}

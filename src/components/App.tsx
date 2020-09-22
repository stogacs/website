import React, { Suspense } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const HomeComponent = React.lazy(() => import("./Home"));
const ResourcesComponent = React.lazy(() => import("./Resources"));

export class AppComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <Router>
        <Switch>
          <Route path="/resources">
            <Suspense fallback={<div>Loading...</div>}>
              <ResourcesComponent />
            </Suspense>
          </Route>
          <Route path="/">
            <Suspense fallback={<div>Loading...</div>}>
              <HomeComponent />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default AppComponent;

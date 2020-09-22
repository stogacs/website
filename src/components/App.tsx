import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const RootComponent = React.lazy(() => import("./Root"));

export class AppComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <Suspense fallback={<div>Loading...</div>}>
              <RootComponent />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default AppComponent;

import React from "react";
import {Route, IndexRoute} from "react-router";

import Application from "./containers/Application";
import Index from "./containers/index";

export default(
  <Route component={Application} path="/">
    <IndexRoute component={Index} />
    <Route component={Index} path="index" />

  </Route>
)

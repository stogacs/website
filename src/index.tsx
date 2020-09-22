import ReactDOM from "react-dom";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import AppComponent from "@components/App";

import "@assets/styles/styles.scss";

library.add(fab, fas);

ReactDOM.render(<AppComponent></AppComponent>, document.body);

import React from "react";

import Options from "./components/Options";
import Popup from "./components/Popup";

const routes = {
  default: <h1>Oops! This URL does not exist.</h1>,
  "": <Popup />,
  "#options": <Options />,
};

const Routes = ({ hash }) => routes[hash] ?? routes.default;

export default Routes;

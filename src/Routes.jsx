import React from "react";

import Options from "./components/Options";
import Popup from "./components/Popup";

const routes = {
  default: <>404</>,
  "": <Popup />,
  "#options": <Options />,
};

const Routes = ({ hash }) => routes[hash] ?? routes.default;

export default Routes;

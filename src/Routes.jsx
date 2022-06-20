import React from "react";

import Options from "./components/Options";
import Popup from "./components/Popup";
import Recording from "./components/Recording";

const routes = {
  default: <h1>Oops! This URL does not exist.</h1>,
  "": <Popup />,
  "#options": <Options />,
  "#recording": <Recording />,
};

const Routes = ({ hash }) => routes[hash] ?? routes.default;

export default Routes;

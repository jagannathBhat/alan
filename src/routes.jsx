import React from "react";

import Options from "./components/Options";
import Popup from "./components/Popup";

const routes = {
  default: <Popup />,
  "#options": <Options />,
};

export default routes;

import React, { useEffect, useState } from "react";

import ButtonLink from "./ButtonLink";

const Popup = () => {
  const [microphoneAccess, setMicrophoneAccess] = useState("prompt");

  const queryMicrophoneAccess = async () => {
    const { state } = await navigator.permissions.query({ name: "microphone" });
    setMicrophoneAccess(state);
  };

  useEffect(() => {
    queryMicrophoneAccess();
  }, []);

  const buttons = {
    granted: {
      component: <ButtonLink label="open recorder" url="#recording" />,
      message: "click on this button to open recording page",
    },
    default: {
      component: (
        <ButtonLink
          buttonProps={{ style: { marginTop: 12 } }}
          label="allow recording"
          url="#options"
        />
      ),
      subtitle:
        "the extension requires recording permission to record audio while taking the test",
    },
  };

  return (
    <div className="popup">
      <h1 className="popup-title">alan</h1>
      {buttons[microphoneAccess]?.component ?? buttons.default.component}
      <p className="subtitle">
        {buttons[microphoneAccess]?.subtitle ?? buttons.default.subtitle}
      </p>
    </div>
  );
};

export default Popup;

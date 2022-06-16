import React, { useEffect, useState } from "react";

const queryPermission = queryObject => navigator.permissions.query(queryObject);

const Options = () => {
  const [microphoneAccess, setMicrophoneAccess] = useState("prompt");

  const queryMicrophoneAccess = async () => {
    const { state } = await queryPermission({ name: "microphone" });
    setMicrophoneAccess(state);
  };

  const promptMicrophoneAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.error(error);
    }
    queryMicrophoneAccess();
  };

  useEffect(() => {
    queryMicrophoneAccess();
  }, []);

  const microphoneOptions = {
    denied: {
      component: <h2>access denied</h2>,
      message: "please visit chrome setting to enable microphone access",
    },
    granted: {
      component: <h2>access granted</h2>,
      message: "please open the extension to continue",
    },
    prompt: {
      component: (
        <button className="button" onClick={promptMicrophoneAccess}>
          allow recording
        </button>
      ),
      message:
        "the extension needs access to your microphone to start recording",
    },
  };

  return (
    <div className="page">
      <h1>options</h1>
      <div className="option-item">
        <h2 style={{ fontWeight: "bold" }}>microphone access</h2>
        {microphoneOptions[microphoneAccess].component}
      </div>
      <p style={{ marginTop: 24, textAlign: "center" }}>
        {microphoneOptions[microphoneAccess].message}
      </p>
    </div>
  );
};

export default Options;

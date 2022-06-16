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
      queryMicrophoneAccess();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    queryMicrophoneAccess();
  }, []);

  const microphoneOptions = {
    denied: <h2>access denied</h2>,
    granted: (
      <div className="w-80">
        <select></select>
      </div>
    ),
    prompt: (
      <button className="button" onClick={promptMicrophoneAccess}>
        allow access
      </button>
    ),
  };

  const messages = {
    denied: "please visit chrome setting to enable microphone access",
    granted: "please open the extension to continue",
    prompt: "",
  };

  return (
    <div className="page">
      <h1>options</h1>
      <div className="option-item">
        <h2 style={{ fontWeight: "bold" }}>microphone access</h2>
        {microphoneOptions[microphoneAccess]}
      </div>
      <p style={{ marginTop: 24, textAlign: "center" }}>
        {messages[microphoneAccess]}
      </p>
    </div>
  );
};

export default Options;

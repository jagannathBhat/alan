import React from "react";

const Popup = () => (
  <div className="popup">
    <h1 className="popup-title">alan</h1>
    <button className="button" id="permission-button">
      allow recording
    </button>
    <p className="subtitle">
      the extension requires recording permission to record audio while taking
      the test
    </p>
  </div>
);

export default Popup;

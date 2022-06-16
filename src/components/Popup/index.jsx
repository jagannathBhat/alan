import React from "react";

const Popup = () => (
  <div className="popup">
    <h1 className="popup-title">alan</h1>
    <a href="#options" target="_blank" rel="noopener noreferrer">
      <button className="button" style={{ marginTop: 12 }}>
        allow recording
      </button>
    </a>
    <p className="subtitle">
      the extension requires recording permission to record audio while taking
      the test
    </p>
  </div>
);

export default Popup;

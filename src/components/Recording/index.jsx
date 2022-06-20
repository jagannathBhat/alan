import React from "react";

const Recording = () => {
  return (
    <div className="page">
      <h1>Recording</h1>
      <button className="button">Share Screen</button>
      <p className="subtitle">
        Choose a screen to record by clicking the above button
      </p>
      <div className="controls">
        <button className="button">Resume/Pause</button>
        <button className="button">Stop</button>
        <button className="button">Cancel</button>
      </div>
      <p>Something went wrong with the recorder</p>
      <button className="button">Try Again</button>
    </div>
  );
};

export default Recording;

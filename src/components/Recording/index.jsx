import React from "react";

import useRecorder from "./useRecorder";

const Recording = () => {
  const recorder = useRecorder();

  const stopRecording = () => {
    var a = document.createElement("a");
    const url = window.URL.createObjectURL(recorder.stop());
    a.href = url;
    a.download = "recording.webm";
    document.body.appendChild(a);
    a.click();
  };

  return (
    <div className="page">
      <h1>Recording</h1>
      <button
        className="button"
        onClick={() => {
          console.log("clicked");
          recorder.enable();
        }}
      >
        Share Screen
      </button>
      <p className="subtitle">
        Choose a screen to record by clicking the above button
      </p>
      <button className="button" onClick={() => recorder.start()}>
        Start Recording
      </button>
      <div className="controls">
        <button className="button" onClick={() => recorder.pause()}>
          Resume/Pause
        </button>
        <button className="button" onClick={stopRecording}>
          Stop
        </button>
        <button className="button" onClick={() => recorder.cancel()}>
          Cancel
        </button>
      </div>
      <p>Something went wrong with the recorder</p>
      <button className="button" onClick={() => recorder.enable()}>
        Try Again
      </button>
    </div>
  );
};

export default Recording;

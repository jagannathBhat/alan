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

  const frames = {
    prompt: (
      <>
        <button className="button" onClick={() => recorder.enable()}>
          Share Screen
        </button>
        <p className="subtitle">
          Choose a screen to record by clicking the above button
        </p>
      </>
    ),
    ready: (
      <button className="button" onClick={() => recorder.start()}>
        Start Recording
      </button>
    ),
    active: (
      <div className="controls">
        <button className="button" onClick={() => recorder.resumeOrPause()}>
          {recorder.isPaused ? "Resume" : "Pause"}
        </button>
        <button className="button" onClick={stopRecording}>
          Stop
        </button>
        <button className="button" onClick={() => recorder.cancel()}>
          Cancel
        </button>
      </div>
    ),
    error: (
      <>
        <p>Something went wrong with the recorder</p>
        <button className="button" onClick={() => recorder.enable()}>
          Try Again
        </button>
      </>
    ),
  };

  return (
    <div className="page">
      <h1>Recording</h1>
      {frames[recorder.status] ?? frames.prompt}
    </div>
  );
};

export default Recording;

import { useRef, useState } from "react";

import { RECORDING_STATUSES } from "./constants";

const useRecorder = () => {
  const localRecorder = useRef(null);
  const localStream = useRef(null);
  const recordedChunks = useRef([]);
  const [status, setStatus] = useState(RECORDING_STATUSES.PROMPT);

  // Non exported functions

  const handleDataAvailable = event => {
    if (event.data.size < 1) return;

    recordedChunks.current.push(event.data);
  };

  const resetRecorder = () => {
    if (
      !localRecorder.current ||
      localRecorder.current.state === RECORDING_STATUSES.INACTIVE
    ) {
      return;
    }

    localStream.current.getTracks().forEach(track => track.stop());
    localRecorder.current.stop();
    setStatus(RECORDING_STATUSES.INACTIVE);
  };

  // Exported functions

  const cancel = () => {
    resetRecorder();
    localRecorder.current = localStream.current = null;
  };

  const enable = async newStream => {
    localStream.current = newStream;
    localRecorder.current = new MediaRecorder(localStream.current);
    recordedChunks.current = [];
    localRecorder.current.ondataavailable = handleDataAvailable;
  };

  const pause = () => localRecorder.current.pause();

  const resume = () => localRecorder.current.resume();

  const start = () => {
    setStatus(RECORDING_STATUSES.ACTIVE);
    localRecorder.current.start(100);
  };

  const stop = () => {
    if (!localRecorder.current) return null;

    resetRecorder();
    return new Blob(recordedChunks.current);
  };

  return {
    cancel,
    enable,
    pause,
    resume,
    start,
    status,
    stop,
  };
};

export default useRecorder;

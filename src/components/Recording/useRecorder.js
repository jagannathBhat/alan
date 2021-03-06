import { useRef, useState } from "react";

import { RECORDING_STATUSES } from "./constants";

const useRecorder = () => {
  const localRecorder = useRef(null);
  const localStream = useRef(null);
  const recordedChunks = useRef([]);
  const [status, setStatus] = useState(RECORDING_STATUSES.PROMPT);
  const [isPaused, setIsPaused] = useState(false);

  // Non exported functions

  const handleDataAvailable = event => {
    if (event.data.size < 1) return;

    recordedChunks.current.push(event.data);
  };

  const resetRecorder = () => {
    if (localRecorder.current?.state === RECORDING_STATUSES.INACTIVE) return;

    localStream.current.getTracks().forEach(track => track.stop());
    localRecorder.current.stop();
    setStatus(RECORDING_STATUSES.INACTIVE);
    localRecorder.current = localStream.current = null;
  };

  // Exported functions

  const enable = async () => {
    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: "default" },
      });
      const audioTrack = audio.getTracks()[0];

      const screen = await navigator.mediaDevices.getDisplayMedia();
      const screenTrack = screen.getTracks()[0];
      screenTrack.onended = () => {
        resetRecorder();
        setStatus(RECORDING_STATUSES.ERROR);
      };

      localStream.current = new MediaStream([audioTrack, screenTrack]);
      localRecorder.current = new MediaRecorder(localStream.current);
      localRecorder.current.ondataavailable = handleDataAvailable;
      recordedChunks.current = [];
      setStatus(RECORDING_STATUSES.READY);
    } catch (error) {
      console.error(error);
      setStatus(RECORDING_STATUSES.ERROR);
    }
  };

  const resumeOrPause = () => {
    setIsPaused(prevState => {
      prevState
        ? localRecorder.current.resume()
        : localRecorder.current.pause();
      return !prevState;
    });
  };

  const start = () => {
    localRecorder.current.start(100);
    setStatus(RECORDING_STATUSES.ACTIVE);
  };

  const stop = () => {
    if (!localRecorder.current) return null;

    resetRecorder();
    return new Blob(recordedChunks.current, { type: "video/webm" });
  };

  return {
    cancel: resetRecorder,
    enable,
    isPaused,
    resumeOrPause,
    start,
    status,
    stop,
  };
};

export default useRecorder;

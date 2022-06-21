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
    if (localRecorder.current?.state === RECORDING_STATUSES.INACTIVE) return;

    localStream.current.getTracks().forEach(track => track.stop());
    localRecorder.current.stop();
    setStatus(RECORDING_STATUSES.INACTIVE);
    localRecorder.current = localStream.current = null;
  };

  // Exported functions

  const enable = async () => {
    console.log("first");
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: "default" },
    });
    const audioTrack = audio.getTracks()[0];

    const screen = await navigator.mediaDevices.getDisplayMedia();
    const screenTrack = screen.getTracks()[0];
    screenTrack.onended = resetRecorder;

    localStream.current = new MediaStream([audioTrack, screenTrack]);
    localRecorder.current = new MediaRecorder(localStream.current);
    localRecorder.current.ondataavailable = handleDataAvailable;
    recordedChunks.current = [];
  };

  const pause = () => localRecorder.current.pause();

  const resume = () => localRecorder.current.resume();

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
    pause,
    resume,
    start,
    status,
    stop,
  };
};

export default useRecorder;

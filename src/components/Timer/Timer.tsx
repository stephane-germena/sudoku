import { useAppStore } from "../../stores/AppStore";
import "./Timer.css";

import { useEffect } from "react";

export const Timer = () => {
  const elapsedSeconds = useAppStore((state) => state.elapsedSeconds);

  const tickTimer = useAppStore((state) => state.tickTimer);
  const formatTime = useAppStore((state) => state.formatTime);

  useEffect(() => {
    const id = setInterval(tickTimer, 1000);
    return () => clearInterval(id);
  }, [tickTimer]);

  return (
    <div className="timer">
      <span className="timer-icon">⏱</span>
      <span className="timer-value">{formatTime(elapsedSeconds)}</span>
    </div>
  );
};

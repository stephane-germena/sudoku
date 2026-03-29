import { useRef, useState } from "react";
import "./Button.css";

interface ButtonProps {
  label?: string;
  icon?: string;
  disabled?: boolean;
  type: "primary" | "secondary";
  onClick?: () => void;
  backgroundColor?: string;
  backgroundColorHover?: string;
  borderColor?: string;
  textColor?: string;
  tooltipMessage?: string;
}

export const Button = ({
  label,
  icon,
  disabled,
  type,
  backgroundColor,
  backgroundColorHover,
  borderColor,
  textColor,
  tooltipMessage,
  onClick,
}: ButtonProps) => {
  const appButtonClassName = "app-button";

  const [clickVisible, setClickVisible] = useState(false);
  const [hoverVisible, setHoverVisible] = useState(false);
  const tooltipVisible = clickVisible || hoverVisible;

  const classes = [
    appButtonClassName,
    type ? appButtonClassName + "-" + type : "",
    disabled ? appButtonClassName + "-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const styles = {
    "--button-background": backgroundColor,
    "--button-background-hover": backgroundColorHover,
    "--button-border-color": borderColor,
    "--button-text-color": textColor,
  } as React.CSSProperties;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setClickVisible(true);
    timerRef.current = setTimeout(() => setClickVisible(false), 1500);
    onClick?.();
  };

  const handleMouseEnter = () => {
    setHoverVisible(true);
  };

  const handleMouseLeave = () => {
    setHoverVisible(false);
  };

  return (
    <button
      type="button"
      className={classes}
      style={styles}
      disabled={disabled}
      aria-label={label}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={`${appButtonClassName}-icon`}>{icon}</span>
      <span className={`${appButtonClassName}-label`}>{label}</span>

      {tooltipVisible && tooltipMessage && (
        <div className="tooltip-container" style={{ width: 0, height: 0 }}>
          <span className="tooltip">{tooltipMessage}</span>
        </div>
      )}
    </button>
  );
};

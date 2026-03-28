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
  onClick
}: ButtonProps) => {
  const appButtonClassName = "app-button";

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
    "--button-text-color": textColor
  } as React.CSSProperties;

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={styles}
    >
      <span className="{appButtonClassName + '-icon'}">{icon}</span>
      <span className="{appButtonClassName + '-label'}">{label}</span>
    </button>
  );
};

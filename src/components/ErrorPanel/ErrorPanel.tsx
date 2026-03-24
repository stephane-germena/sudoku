import "./ErrorPanel.css";

export const ErrorPanel = () => {
  return (
    <div className="error-banner" role="alert">
      <span className="error-banner-icon">🌧️</span>
      <div className="error-banner-text">
        <span className="error-banner-title">Almost there!</span>
        <span className="error-banner-subtitle">
          Some cells are still incorrect
        </span>
      </div>
    </div>
  );
};

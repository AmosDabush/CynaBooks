import "./DarkModeSwitch.css";


function DarkModeSwitch({
  onChange,
  darkMode,
}: {
  onChange: () => void;
  darkMode: boolean;
}) {
  return (
    <div className="dark-mode-switch" onClick={onChange}>
      <label className="switch">
        <input type="checkbox" checked={darkMode} onChange={onChange} />
        <span className="slider round" onChange={onChange}></span>
      </label>
      <span className="label">
        {darkMode ? (
          "Dark Mode"
        ) : (
          <span style={{ color: "white" }}>Light Mode</span>
        )}
      </span>
    </div>
  );
}

export default DarkModeSwitch;

import TitleLogo from "../../assets/title.png";
import DarkModeSwitch from "../../partials/DarkModeSwitch/DarkModeSwitch";

const Header = ({
  handleThemeChange,
  darkMode,
}: {
  handleThemeChange: () => void;
  darkMode: boolean;
}) => {
  return (
    <div style={{ margin: "15px" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DarkModeSwitch onChange={handleThemeChange} darkMode={darkMode} />
        <img
  alt="TitleLogo"
  style={{
    position: "absolute",
    top: 0,
    zIndex: 10,
    width: "600px",
    maxHeight: "100px",
    left: "50%", 
    transform: "translateX(-50%)",
  }}
  width={"50%"}
  src={TitleLogo}
  className="TitleLogo"
/>

      </div>
    </div>
  );
};

export default Header;

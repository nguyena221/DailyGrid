import ViewTabs from "./ViewTabs";
// import ProfileButton from "./ProfileButton";
import DGLogo from "../../assets/images/DGLogo.png";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <button onClick={() => console.log("Logo Clicked!")}>
          <img src={DGLogo} alt="Logo" />
        </button>
      </div>

      <div className="header-center">
        <ViewTabs />
      </div>

      <div className="header-right">
        {/* Profile button goes here later */}
      </div>
    </header>
  );
}

export default Header;

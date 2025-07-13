import logo from "../../assets/logo.png";
import Button from "../../components/Button";
import { MdOutlineInstallMobile } from "react-icons/md";
const InstallSplashScreen = ({ handleInstallClick }) => {
  return (
    <div className="h-screen-dynamic overflow-hidden w-screen fixed inset-0 bg-primary-gradient text-white flex flex-col items-start justify-between p-8 z-50">
      <div className="flex flex-col items-center justify-center">
        <img
          src={logo}
          alt="App Logo"
          className="w-50 h-50 mb-6 object-contain"
        />
        <h2 className="text-4xl font-bold ">Santo Fitness</h2>
        <h2 className="text-xl text-bg_primary  mt-5">
          Everybody Can Train
        </h2>
      </div>

      <Button
        onClick={handleInstallClick}
        variant="secondary"
        icon={<MdOutlineInstallMobile className="text-primary" size={20} />}
      >
        Install
      </Button>
    </div>
  );
};

export default InstallSplashScreen;

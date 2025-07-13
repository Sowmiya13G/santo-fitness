import { useSelector } from "react-redux";
import AdminProfile from "../profile/admin-profile";
import ClientProfile from "../profile/client-profile";
import TrainerProfile from "../profile/trainer-profile";

const Profile = () => {
  const { userData } = useSelector((state) => state.auth);
  const renderProfile = (role) => {
    switch (role) {
      case "admin":
        return <AdminProfile />;
      case "trainer":
        return <TrainerProfile />;
      case "client":
        return <ClientProfile />;
      default:
        return <div>Role not found</div>;
    }
  };

  return (
    <div className="p-4 bg-white w-screen overflow-scroll pb-10 h-full hide-scrollbar">
      {renderProfile(userData?.role)}
    </div>
  );
};

export default Profile;

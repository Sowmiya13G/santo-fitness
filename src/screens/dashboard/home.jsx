import { useSelector } from "react-redux";
import AdminDashboard from "../home/admin-home";
import ClientDashboard from "../home/client-home";
import TrainerDashboard from "../home/trainer-home";

const Home = () => {
  const { userData } = useSelector((state) => state.auth);
  console.log("userData: ", userData);
  const renderHome = (role) => {
    console.log("role: ", role);
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "trainer":
        return <TrainerDashboard />;
      case "client":
        return <ClientDashboard />;
      default:
        return <div>Role not found</div>;
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white w-screen overflow-scroll pb-10 hide-scrollbar">
      {renderHome(userData?.role)}
    </div>
  );
};

export default Home;

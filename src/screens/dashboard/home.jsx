import { useSelector } from "react-redux";
import AdminDashboard from "../home/admin-home";
import ClientDashboard from "../home/client-home";
import TrainerDashboard from "../home/trainer-home";
import { getUsersList } from "@/features/user/user-api";
import { setUserList } from "@/features/user/user-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const renderHome = (role) => {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUsersList = async (role = "client") => {
    try {
      const response = await getUsersList(role);
      if (response?.status === 200) {
        const res = response?.users?.map((x) => ({
          value: x?._id,
          label: x?.name,
          ...x,
        }));
        dispatch(setUserList(res));
      }
    } catch (err) {
      console.error("Failed to fetch clients list:", err);
    }
  };

  useEffect(() => {
    if (userData.role === "client") {
      return;
    }
    fetchUsersList();
  }, [fetchUsersList, userData.role]);
  return (
    <div className="min-h-screen  bg-white w-screen overflow-scroll pb-10 hide-scrollbar">
      {renderHome(userData?.role)}
    </div>
  );
};

export default Home;

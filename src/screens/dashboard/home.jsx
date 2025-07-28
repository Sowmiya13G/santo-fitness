import { getTopClient, getUsersList } from "@/features/user/user-api";
import {
  setTopClient,
  setTrainerList,
  setUserList,
} from "@/features/user/user-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../home/admin-home";
import ClientDashboard from "../home/client-home";
import TrainerDashboard from "../home/trainer-home";

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
  const fetchTopClient = async () => {
    const response = await getTopClient();
    dispatch(setTopClient(response.data));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUsersList = async () => {
    try {
      const response = await getUsersList();
      if (response?.status === 200) {
        console.log("users: ", response);
        const users = response.users
          .filter((x) => x.role == "client")
          .map((x) => ({
            value: x._id,
            label: x.name,
            name: x.name,
            goal: x.goal,
            profileImg: x.profileImg,
            ...x,
          }));
        const trainers = response.users
          .filter((x) => x.role == "trainer")
          .map((x) => ({
            value: x._id,
            label: x.name,
            name: x.name,
            goal: x.goal,
            profileImg: x.profileImg,
            ...x,
          }));
        dispatch(setUserList(users));
        dispatch(setTrainerList(trainers));

        console.log("trainers: ", trainers);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    if (userData.role === "client") {
      return;
    }
    fetchUsersList();
    fetchTopClient();
  }, [fetchUsersList, userData.role]);
  return (
    <div className="min-h-screen  bg-white w-screen overflow-scroll pb-10 hide-scrollbar">
      {renderHome(userData?.role)}
    </div>
  );
};

export default Home;

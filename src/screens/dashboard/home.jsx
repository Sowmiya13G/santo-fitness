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
import { useState } from "react";

const Home = () => {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isClient = userData?.role === "client";

  const [loading, setLoading] = useState(false);
  const renderHome = (role) => {
    switch (role) {
      case "admin":
        return <AdminDashboard loading={loading} />;
      case "trainer":
        return <TrainerDashboard loading={loading} />;
      case "client":
        return <ClientDashboard loading={loading} />;
      default:
        return <div>Role not found</div>;
    }
  };

  // logoutUser(dispatch, navigate)
  const fetchTopClient = async () => {
    const response = await getTopClient();
    dispatch(setTopClient(response?.data));
    if (isClient) {
      setLoading(false);
    }
  };

  const fetchUsersList = async () => {
    try {
      const response = await getUsersList();
      if (response?.status === 200) {
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
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTopClient();
    if (userData?.role === "client") {
      return;
    } else {
      fetchUsersList();
    }
  }, [userData?.role]);
  return (
    <div className="min-h-screen  bg-white w-screen overflow-scroll pb-10 hide-scrollbar">
      {renderHome(userData?.role)}
    </div>
  );
};

export default Home;

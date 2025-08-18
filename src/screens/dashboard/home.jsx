import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopClient, getUsersList } from "@/features/user/user-api";
import {
  setTopClient,
  setTrainerList,
  setUserList,
} from "@/features/user/user-slice";
import AdminDashboard from "../home/admin-home";
import ClientDashboard from "../home/client-home";
import TrainerDashboard from "../home/trainer-home";
import DateCheckModal from "@/components/modal/date-select-modal";
import { useRef } from "react";

const Home = () => {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isClient = userData?.role === "client";
  const hasFirst = useRef(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const renderHome = (role) => {
    switch (role) {
      case "admin":
        return (
          <AdminDashboard
            loading={loading}
            setShowModal={() => setShowModal(true)}
          />
        );
      case "trainer":
        return (
          <TrainerDashboard
            loading={loading}
            setShowModal={() => setShowModal(true)}
          />
        );
      case "client":
        return (
          <ClientDashboard
            loading={loading}
            setShowModal={() => setShowModal(true)}
          />
        );
      default:
        return <div>Role not found</div>;
    }
  };

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
          .filter((x) => x.role === "client")
          .map((x) => ({
            value: x._id,
            label: x.name,
            name: x.name,
            goal: x.goal,
            profileImg: x.profileImg,
            ...x,
          }));

        const trainers = response.users
          .filter((x) => x.role === "trainer")
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
    if (showModal) {
      return;
    }
    if (hasFirst.current == true) {
      fetchTopClient();
    }

    if (userData?.role !== "client") {
      fetchUsersList();
    }
    hasFirst.current = false;
  }, [userData?.role, showModal]);

  return (
    <div className="min-h-screen relative animate-fade-in bg-white w-screen overflow-scroll pb-10 hide-scrollbar">
      {renderHome(userData?.role)}
      {showModal && (
        <DateCheckModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Home;

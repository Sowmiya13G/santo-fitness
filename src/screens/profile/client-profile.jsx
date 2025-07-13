import { useState } from "react";
// packages
import {
  FiBell,
  FiChevronRight,
  FiFileText,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// redux
import { setToken } from "@/features/auth/authSlice";
// component
import { GradientIcon } from "@/components/gradient-icon";
import RenderIconRow from "@/components/icon-row";
import ScreenHeader from "@/components/screen-header";
import ShadowView from "@/components/shadow-view";
import Switch from "@/components/switch";
import ProfileCard from "@/components/card/profile-card";

const ClientProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);

  const accountItems = [
    {
      title: "Personal Data",
      icon: FiUser,
      onAction: () => navigate("/profile/personal-data"),
    },
    {
      title: "Testing Reports",
      icon: FiFileText,
      onAction: () => navigate("/profile/testing-reports"),
    },
    {
      title: "Activity History",
      icon: FiBell,
      onAction: () => navigate("/profile/activity-history"),
    },
    {
      title: "Workout Notes",
      icon: FiFileText,
      onAction: () => navigate("/profile/workout-notes"),
    },
  ];

  return (
    <div className="h-full bg-white space-y-6">
      <ScreenHeader title="Profile" />
      <ProfileCard
        image="https://avatar.iran.liara.run/public"
        name="Stefani Wong"
        program="Lose a Fat Program"
        height={180}
        weight={65}
        age={22}
      />
      <ShadowView title="Account">
        <div className="space-y-4">
          {accountItems?.map(({ title, icon: Icon, onAction }) => (
            <RenderIconRow
              key={title}
              title={title}
              leftIcon={<GradientIcon Icon={Icon} />}
              rightIcon={<FiChevronRight />}
              onAction={onAction}
            />
          ))}
        </div>
      </ShadowView>

      <ShadowView title="Notification">
        <RenderIconRow
          title="Pop-up Notification"
          leftIcon={<GradientIcon Icon={FiBell} />}
          rightContent={<Switch checked={enabled} onChange={setEnabled} />}
        />
      </ShadowView>
      <ShadowView
        title="Logout"
        icon={<FiLogOut />}
        onAction={() => {
          dispatch(setToken(""));
          localStorage.removeItem("token");
          navigate("/login");
        }}
      />
    </div>
  );
};

export default ClientProfile;

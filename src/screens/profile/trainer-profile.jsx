import { useState } from "react";
// packages
import { FiBell, FiChevronRight, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// redux
// component
import ProfileCard from "@/components/card/profile-card";
import { GradientIcon } from "@/components/gradient-icon";
import RenderIconRow from "@/components/icon-row";
import ScreenHeader from "@/components/screen-header";
import ShadowView from "@/components/shadow-view";
import Switch from "@/components/switch";

import { trainerAccountItems } from "@/constants/static-data";
import { setToken } from "@/features/auth/auth-api";

const TrainerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  const { userData } = useSelector((state) => state.auth);

  return (
    <div className="h-full bg-white space-y-6">
      <ScreenHeader title="Profile" />
      <ProfileCard
        image={import.meta.env.VITE_AVATAR_API_URL}
        name={userData?.name}
        program="Lose a Fat Program"
        height={180}
        weight={65}
        age={22}
      />
      <ShadowView title="Account">
        <div className="space-y-4">
          {trainerAccountItems?.map(({ title, icon: Icon, toPath }) => (
            <RenderIconRow
              key={title}
              title={title}
              leftIcon={<GradientIcon Icon={Icon} />}
              rightIcon={<FiChevronRight />}
              onAction={() => navigate(toPath)}
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

export default TrainerProfile;

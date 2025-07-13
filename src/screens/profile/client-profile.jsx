import { useState } from "react";
// packages
import { FiBell, FiChevronRight, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// redux
import { setToken } from "@/features/auth/authSlice";
// component
import ProfileCard from "@/components/card/profile-card";
import { GradientIcon } from "@/components/gradient-icon";
import RenderIconRow from "@/components/icon-row";
import ScreenHeader from "@/components/screen-header";
import ShadowView from "@/components/shadow-view";
import Switch from "@/components/switch";

import { accountItems } from "@/constants/staticData";

const ClientProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);

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
          {accountItems?.map(({ title, icon: Icon, toPath }) => (
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

export default ClientProfile;

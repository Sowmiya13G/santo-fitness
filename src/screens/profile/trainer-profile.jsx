// packages
import { FiBell, FiChevronRight, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
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
import { logoutUser } from "@/utils/helper";

const TrainerProfile = ({ setShowModal, enabled, setEnabled }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="h-full bg-white space-y-6">
      <ScreenHeader title="Profile" />
      <ProfileCard setShowModal={setShowModal} />

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
        onAction={() => logoutUser(dispatch, navigate)}
      />
    </div>
  );
};

export default TrainerProfile;

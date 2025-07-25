import ProfileWrapper from "@/components/profile-wrapper";
import UserData from "@/components/user-data";
// import Workout from "../../assets/images/female.svg";
import maleProfile from "../../assets/icons/male-profile.svg";

const PersonalDataClient = () => {
  return (
    <ProfileWrapper title="Personal Data" image={maleProfile}>
      <UserData />
    </ProfileWrapper>
  );
};
export default PersonalDataClient;

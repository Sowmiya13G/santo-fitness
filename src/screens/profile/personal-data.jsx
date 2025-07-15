import ProfileWrapper from "@/components/profile-wrapper";
import UserData from "@/components/user-data";
// import Workout from "../../assets/images/female.svg";

const PersonalData = () => {
  return (
    <ProfileWrapper
      title="Personal Data"
      image={import.meta.env.VITE_AVATAR_API_URL}
    >
      <UserData />
    </ProfileWrapper>
  );
};
export default PersonalData;

import ProfileWrapper from "@/components/profile-wrapper";
import UserData from "@/components/user-data";

const PersonalData = () => {
  return (
    <ProfileWrapper title="Personal Data" image="https://avatar.iran.liara.run/public">
      <UserData />
    </ProfileWrapper>
  );
};
export default PersonalData;

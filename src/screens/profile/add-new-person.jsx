import ProfileWrapper from "@/components/profile-wrapper";
import UserData from "@/components/user-data";
// import Workout from "../../assets/images/female.svg";

const AddNewPerson = () => {
  return (
    <ProfileWrapper
      title="Personal Data"
      image={import.meta.env.VITE_AVATAR_API_URL}
    >
      <UserData isCreate />
    </ProfileWrapper>
  );
};
export default AddNewPerson;

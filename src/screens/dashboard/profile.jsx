import { useSelector } from "react-redux";
import AdminProfile from "../profile/admin-profile";
import ClientProfile from "../profile/client-profile";
import TrainerProfile from "../profile/trainer-profile";
import { useEffect } from "react";
import { showToast } from "@/components/toast";
import { setUserData } from "@/features/auth/auth-slice";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser, uploadFile } from "@/features/user/user-api";

const Profile = () => {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const firstRender = useRef(true);
  const [enabled, setEnabled] = useState(userData.notification ?? true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(userData.profileImg);
  const userId = userData._id;

  const handleImageUpload = async (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;
    setIsUploading(true);
    setPreviewImage(uploaded);
    try {
      const formData = new FormData();
      formData.append("files", uploaded);
      const response = await uploadFile(formData);
      const url = response?.urls[0];
      console.log("url: ", url);
      setPreviewImage(url);
      onSubmit(url);
    } catch (err) {
      console.error("Submission error:", err);
      showToast("error", "Something went wrong");
    } finally {
      setIsUploading(false);
      setShowModal(false);
    }
  };

  const onSubmit = async (url) => {
    try {
      const payload = {
        ...userData,
        notification: enabled,
        profileImg: url ? url : userData.profileImg,
      };
      const response = await updateUser(userId, payload);
      dispatch(setUserData(response?.user));

      showToast("success", " Updated Successfully");
    } catch (err) {
      console.error("Submission error:", err);
      showToast("error", "Something went wrong");
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // 👈 Skip first run
      return;
    }
    onSubmit(); // Only run when user toggles the switch
  }, [enabled]);

  const renderProfile = (role) => {
    switch (role) {
      case "admin":
        return (
          <AdminProfile
            setEnabled={setEnabled}
            setShowModal={setShowModal}
            enabled={enabled}
          />
        );
      case "trainer":
        return (
          <TrainerProfile
            setEnabled={setEnabled}
            setShowModal={setShowModal}
            enabled={enabled}
          />
        );
      case "client":
        return (
          <ClientProfile
            setEnabled={setEnabled}
            setShowModal={setShowModal}
            enabled={enabled}
          />
        );
      default:
        return <div>Role not found</div>;
    }
  };

  return (
    <>
      <div className="h-full w-screen bg-white space-y-6 py-5 px-2 overflow-y-auto overflow-hidden mb-5">
        {renderProfile(userData?.role)}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 h-full flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 flex flex-col items-center relative">
            {!isUploading && (
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-md font-bold"
              >
                ✕
              </button>
            )}

            <img
              src={previewImage}
              alt="preview"
              className="w-40 h-40 object-cover rounded-full mb-4 border"
              style={{ objectPosition: "0% 0%" }}
            />

            {isUploading ? (
              <div className="text-primary text-sm mt-2 flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Uploading...
              </div>
            ) : (
              <label className="bg-primary-gradient text-white px-4 py-2 rounded cursor-pointer">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import ScreenHeader from "./screen-header";
import { updateUser, uploadFile } from "@/features/user/user-api";
import { showToast } from "./toast";
import { useSelector } from "react-redux";
import { setUserData } from "@/features/auth/auth-slice";
import { useDispatch } from "react-redux";

export default function ProfileWrapper({
  title,
  image,
  isBack = true,
  children,
  bgColor = "bg-primary-gradient",
  imgClass,
  profile = false,
  isClient,
  setValue = () => {},
  watch = () => {},
}) {
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const file = watch("profileImg");
  const [previewImage, setPreviewImage] = useState(image);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      return () => URL.revokeObjectURL(url); // Clean up
    } else if (typeof file === "string") {
      setPreviewImage(file);
    }
  }, [file]);

  const handleImageClick = () => {
    if (isClient && profile && !isUploading) {
      setShowModal(true);
    }
  };

  const handleImageUpload = async (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    setIsUploading(true);

    try {
      setValue("profileImg", uploaded);
      const formData = new FormData();
      formData.append("files", uploaded);
      const response = await uploadFile(formData);
      const url = response?.urls[0];
      if (url) {
        setValue("profileImg", url);
        setPreviewImage(url);
        const id = userData._id;
        const data = { profileImg: url };
        const response = await updateUser(id, data);
        console.log("response: ", response);
        dispatch(setUserData(response?.user));
        showToast("success", "Profile Photo Updated!");
      } else {
        throw new Error("No URL returned");
      }
    } catch (err) {
      console.error("Submission error:", err);
      showToast("error", "Something went wrong");
    } finally {
      setIsUploading(false);
      setShowModal(false);
    }
  };

  return (
    <div className={`flex flex-col h-full ${bgColor} relative`}>
      <div className="h-10" />
      <ScreenHeader title={title} isBack={isBack} titleColor="text-white" />
      <div className="flex justify-center">
        <img
          src={previewImage ? previewImage : image}
          alt="profile"
          onClick={handleImageClick}
          className={`cursor-pointer ${imgClass} w-44 h-44 object-cover my-4 rounded-full`}
          style={{ objectPosition: "0% 0%" }}
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 bg-white rounded-t-3xl z-10">
        <div className="flex justify-center pt-2">
          <div className="bg-border_secondary h-1.5 w-28 rounded-full" />
        </div>
        {children}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 flex flex-col items-center relative">
            {!isUploading && (
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-lg font-bold"
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
    </div>
  );
}

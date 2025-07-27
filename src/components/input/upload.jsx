import { uploadFile } from "@/features/user/user-api";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiOutlineFileImage, AiOutlineFilePdf } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { GradientIcon } from "../gradient-icon";

const getFileType = (extension) => {
  if (["pdf"].includes(extension)) return "pdf";
  if (["doc", "docx"].includes(extension)) return "word";
  return "image";
};

const UploadInput = ({
  name = "file",
  placeholder,
  error,
  acceptFormat = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"],
}) => {
  const {
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const file = watch(name);
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState(null);

  const previewUrl = useMemo(() => {
    if (!file) return null;
    if (typeof file === "string") return file; // URL from API
    return URL.createObjectURL(file); // Local preview
  }, [file]);

useEffect(() => {
  if (!file) return;

  let extension = "";

  if (typeof file === "string") {
    try {
      const url = new URL(file);
      const pathname = url.pathname;
      extension = pathname.split(".").pop()?.toLowerCase();
    } catch {
      extension = file.split(".").pop()?.toLowerCase(); // fallback
    }
  } else {
    extension = file.name.split(".").pop()?.toLowerCase() || "";
  }

  setFileType(getFileType(extension));
}, [file]);


  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const extension = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!acceptFormat.includes("." + extension)) {
      // Optionally add toast or error message
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("files", selectedFile);

      const response = await uploadFile(formData); // API call
      setValue(name, response.data.url);
      clearErrors(name);
    } catch (err) {
      console.error("File upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setValue(name, null);
    clearErrors(name);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Upload Dropzone */}
      <div className="border-dashed border-red border-[1px] w-full h-[118px] bg-opacity_primary rounded-xl flex items-center justify-center">
        <label
          htmlFor={`file-input-${name}`}
          className={`text-icon text-10 flex flex-col items-center justify-center cursor-pointer ${
            file ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center w-full h-full space-x-1">
              {[0, 1, 2].map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></span>
              ))}
            </span>
          ) : (
            <span className="text-gradient">
              {placeholder ?? "Upload latest report"}
            </span>
          )}
        </label>
        <input
          id={`file-input-${name}`}
          type="file"
          accept={acceptFormat.join(",")}
          onChange={handleFileChange}
          className="hidden"
          disabled={!!file}
        />
      </div>

      {/* File Preview Info */}
      {previewUrl && (
        <div className="relative mt-2 flex items-center gap-2 px-3 py-4 rounded-lg bg-opacity_primary">
          <GradientIcon
            Icon={fileType === "pdf" ? AiOutlineFilePdf : AiOutlineFileImage}
          />
          <span className="text-base text-gradient">
            {typeof file === "string"
              ? file.split("/").pop()?.split("?")[0] || "Uploaded file"
              : file?.name?.slice(0, 30) || "File"}
          </span>
          <button
            type="button"
            className="ml-auto text-gradient"
            onClick={handleRemove}
          >
            <GradientIcon Icon={MdCancel} />
          </button>
        </div>
      )}

      {/* Optional: Inline Image or PDF Preview */}
      {previewUrl && fileType === "image" && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full max-h-64 object-contain mt-2 rounded"
        />
      )}
      {previewUrl && fileType === "pdf" && (
        <iframe
          src={previewUrl}
          title="PDF Preview"
          className="w-full h-64 mt-2 rounded"
        />
      )}

      {/* Error Message */}
      {!file && (error || errors?.[name]) && (
        <span className="text-red-500 text-sm">
          {errors?.[name]?.message || error}
        </span>
      )}
    </div>
  );
};

export default UploadInput;

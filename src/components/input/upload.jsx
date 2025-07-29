import { useEffect, useState } from "react";
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
  type = "reports",
  isArray = false,
}) => {
  const {
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const files = watch(name) || (isArray ? [] : null);
  const [loading, setLoading] = useState(false);
  const [fileTypes, setFileTypes] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const isReports = type === "reports";
  const MAX_FILES = 5;

  useEffect(() => {
    if (!files || (isArray && files.length === 0)) return;

    const determineType = (fileItem) => {
      let extension = "";
      if (typeof fileItem === "string") {
        try {
          const url = new URL(fileItem);
          extension = url.pathname.split(".").pop()?.toLowerCase();
        } catch {
          extension = fileItem.split(".").pop()?.toLowerCase();
        }
      } else {
        extension = fileItem.name.split(".").pop()?.toLowerCase() || "";
      }
      return getFileType(extension);
    };

    const allFiles = isArray ? files : [files];
    const types = allFiles.map(determineType);
    const urls = allFiles.map((f) =>
      typeof f === "string" ? f : URL.createObjectURL(f)
    );

    setFileTypes(types);
    setPreviewUrls(urls.filter(Boolean));
  }, [files, isArray]);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const validFiles = selectedFiles.filter((file) =>
      acceptFormat.includes("." + file.name.split(".").pop()?.toLowerCase())
    );

    if (validFiles.length === 0) return;

    if (isArray && files.length + validFiles.length > MAX_FILES) {
      return;
    }

    setLoading(true);
    try {
      const newPreviewUrls = validFiles.map((file) =>
        URL.createObjectURL(file)
      );

      if (isArray) {
        const newValue = [...files, ...validFiles];
        setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
        setValue(name, newValue);
      } else {
        setPreviewUrls([newPreviewUrls[0]]);
        setValue(name, validFiles[0]);
      }

      clearErrors(name);
    } catch (err) {
      console.error("Local file handling failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index) => {
    if (isArray && index >= 0 && index < files.length) {
      const updatedFiles = files.filter((_, i) => i !== index);
      const updatedPreviews = previewUrls.filter((_, i) => i !== index);
      setValue(name, updatedFiles);
      setPreviewUrls(updatedPreviews);
    } else {
      setValue(name, null);
      setPreviewUrls([]);
    }
    clearErrors(name);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Upload Dropzone */}
      <div className="border-dashed border-red border-[1px] w-full h-[118px] bg-opacity_primary rounded-xl flex items-center justify-center">
        <label
          htmlFor={`file-input-${name}`}
          className={`text-icon text-10 flex flex-col items-center justify-center cursor-pointer ${
            files && (!isArray || files.length >= MAX_FILES)
              ? "opacity-50 cursor-not-allowed"
              : ""
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
          multiple={isArray}
          accept={acceptFormat.join(",")}
          onChange={handleFileChange}
          className="hidden"
          disabled={files && (!isArray || files.length >= MAX_FILES)}
        />
      </div>

      {isArray && previewUrls.length > 0 ? (
        <div className="relative overflow-x-auto flex gap-4 py-2 scroll-smooth no-scrollbar">
          {previewUrls.map((url, idx) => {
            if (!url) return null;
            const fileType = fileTypes[idx] || "image";
            const fileLabel =
              typeof files[idx] === "string"
                ? files[idx]?.split("/").pop()?.split("?")[0]
                : files[idx]?.name?.slice(0, 30) || "File";

            return fileType === "image" ? (
              <div key={idx} className="relative min-w-[250px] max-w-[250px]">
                <img
                  src={url}
                  alt={fileLabel}
                  className="rounded-lg object-fit w-full h-48"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 text-white  p-1 rounded-full"
                  onClick={() => handleRemove(idx)}
                >
                  <GradientIcon Icon={MdCancel} />
                </button>
              </div>
            ) : isReports ? (
              <div
                key={idx}
                className="relative flex items-center gap-2 px-3 py-4 rounded-lg bg-opacity_primary"
              >
                <GradientIcon
                  Icon={
                    fileType === "pdf" ? AiOutlineFilePdf : AiOutlineFileImage
                  }
                />
                <span className="text-base text-gradient">{fileLabel}</span>
                <button
                  type="button"
                  className="ml-auto text-gradient"
                  onClick={() => handleRemove(idx)}
                >
                  <GradientIcon Icon={MdCancel} />
                </button>
              </div>
            ) : null;
          })}
        </div>
      ) : (
        // fallback for single file
        previewUrls.map((url, idx) => {
          if (!url) return null;
          const fileType = fileTypes[idx] || "image";
          const fileLabel =
            typeof files === "string"
              ? files?.split("/").pop()?.split("?")[0]
              : files?.name?.slice(0, 30) || "File";

          return fileType === "image" ? (
            <div key={idx} className="relative mt-2">
              <img
                src={url}
                alt={fileLabel}
                className="w-full max-h-64 object-contain rounded"
              />
              <button
                type="button"
                className="absolute top-1 right-1 text-gradient"
                onClick={() => handleRemove(idx)}
              >
                <GradientIcon Icon={MdCancel} />
              </button>
            </div>
          ) : fileType === "pdf" ? (
            <div key={idx} className="relative mt-2">
              <iframe
                src={url}
                title={`PDF Preview ${idx}`}
                className="w-full h-64 rounded"
              />
              <button
                type="button"
                className="absolute top-1 right-1 text-gradient"
                onClick={() => handleRemove(idx)}
              >
                <GradientIcon Icon={MdCancel} />
              </button>
            </div>
          ) : null;
        })
      )}

      {(!files || (isArray && files.length === 0)) &&
        (error || errors?.[name]) && (
          <span className="text-red-500 text-sm">
            {errors?.[name]?.message || error}
          </span>
        )}
    </div>
  );
};

export default UploadInput;

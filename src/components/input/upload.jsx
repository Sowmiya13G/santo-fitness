import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiOutlineFileImage, AiOutlineFilePdf } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { GradientIcon } from "../gradient-icon";

const getFileType = (fileItem) => {
  let extension = "";
  let mimeType = "";

  if (typeof fileItem === "string") {
    try {
      const url = new URL(fileItem);
      extension = url.pathname.split(".").pop()?.toLowerCase();
    } catch {
      extension = fileItem.split(".").pop()?.toLowerCase();
    }
  } else {
    mimeType = fileItem.type;
    extension = fileItem.name.split(".").pop()?.toLowerCase() || "";
  }

  if (mimeType === "application/pdf" || extension === "pdf") return "pdf";
  if (["doc", "docx"].includes(extension)) return "word";
  return "image";
};

const formatFileSize = (size) => {
  if (!size) return "";
  const kb = size / 1024;
  return kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(1)} KB`;
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

    const allFiles = isArray ? files : [files];
    const types = allFiles.map(getFileType);
    const urls = allFiles.map((f) =>
      typeof f === "string" ? f : URL.createObjectURL(f)
    );

    setFileTypes(types);
    setPreviewUrls(urls.filter(Boolean));

    return () => {
      urls.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
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
      <div className="border-dashed border-primary border-[1px] w-full h-[118px] bg-opacity_primary rounded-xl flex items-center justify-center">
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

      {/* Multiple files preview */}
      {isArray && previewUrls.length > 0 ? (
        <div className="relative overflow-x-auto flex gap-4 py-2 scroll-smooth no-scrollbar snap-mandatory snap-x">
          {previewUrls.map((url, idx) => {
            const fileType = fileTypes[idx] || "image";
            const fileObj = files[idx];
            const fileLabel =
              typeof fileObj === "string"
                ? fileObj?.split("/").pop()?.split("?")[0]
                : fileObj?.name || "File";
            const fileSize =
              typeof fileObj !== "string" ? formatFileSize(fileObj.size) : "";

            return fileType === "image" ? (
              <div key={idx} className="relative min-w-[50%] snap-center ">
                <img
                  src={url}
                  alt={fileLabel}
                  style={{ objectPosition: "0% 0%" }}
                  className="rounded-lg object-cover w-full h-48 border border-gray-300"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 text-white p-1 rounded-full"
                  onClick={() => handleRemove(idx)}
                >
                  <GradientIcon Icon={MdCancel} />
                </button>
              </div>
            ) : fileType === "pdf" ? (
              <div
                key={idx}
                className="relative flex items-center gap-3 p-3 rounded-lg border border-gray-300 bg-white min-w-[250px]"
              >
                <AiOutlineFilePdf className="text-red-500 text-3xl" />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium truncate max-w-[150px]">
                    {fileLabel}
                  </span>
                  <span className="text-xs text-gray-500">{fileSize}</span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-blue-500 underline text-xs"
                >
                  View
                </a>
                <button
                  type="button"
                  className="ml-2 text-gradient"
                  onClick={() => handleRemove(idx)}
                >
                  <GradientIcon Icon={MdCancel} />
                </button>
              </div>
            ) : null;
          })}
        </div>
      ) : (
        // Single file preview
        previewUrls.map((url, idx) => {
          const fileType = fileTypes[idx] || "image";
          const fileObj = files;
          const fileLabel =
            typeof fileObj === "string"
              ? fileObj?.split("/").pop()?.split("?")[0]
              : fileObj?.name || "File";
          const fileSize =
            typeof fileObj !== "string" ? formatFileSize(fileObj.size) : "";

          return fileType === "image" ? (
            <div key={idx} className="relative mt-2">
              <img
                src={url}
                alt={fileLabel}
                className="w-full max-h-64 object-contain rounded border border-gray-300"
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
            <a
              href={url}
              target="_blank"
              key={idx}
              className="relative flex items-center gap-3 p-3 rounded-lg border  border-gray-300 bg-white"
            >
              <AiOutlineFilePdf className="text-red-500 text-3xl" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate w-80">
                  {fileLabel}
                </span>
                <span className="text-xs text-gray-500">{fileSize}</span>
              </div>

              <button
                type="button"
                className="ml-2 text-gradient"
                onClick={() => handleRemove(idx)}
              >
                <GradientIcon Icon={MdCancel} />
              </button>
            </a>
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

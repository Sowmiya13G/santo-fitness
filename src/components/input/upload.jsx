import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

// icons
import { AiOutlineFileImage, AiOutlineFilePdf } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { GradientIcon } from "../gradient-icon";

// components

const getFileType = (extension) => {
  if (["pdf"].includes(extension)) return "pdf";
  if (["doc", "docx"].includes(extension)) return "word";
  return "image";
};

const UploadInput = ({
  name = "file",
  placeholder,
  error,
  acceptFormat = [".pdf", ".doc", ".docx"],
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
    if (typeof file === "string") return file;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    if (file && typeof file !== "string") {
      const extension = file.name.split(".").pop()?.toLowerCase() || "";
      setFileType(getFileType(extension));
    }
  }, [file]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const extension = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!acceptFormat.includes("." + extension)) {
      //   toast.error("Invalid file type.");
      return;
    }

    setLoading(true);

    // Simulate async upload (replace with actual upload logic if needed)
    setTimeout(() => {
      setValue(name, selectedFile);
      clearErrors(name);
      setLoading(false);
    }, 1000);
  };

  const handleRemove = () => {
    setValue(name, null);
    clearErrors(name);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="border-dashed border-red border-[1px] w-full h-[118px] bg-opacity_primary rounded-xl flex items-center justify-center">
        <label
          htmlFor={`file-input-${name}`}
          className={
            ("text-icon cursor-pointer text-10 flex flex-col items-center justify-center",
            { "opacity-50 cursor-not-allowed": !!file })
          }
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

      {previewUrl && (
        <div className="relative mt-2 flex items-center gap-2 px-3 py-4 rounded-lg bg-opacity_primary">
          <GradientIcon
            Icon={fileType === "pdf" ? AiOutlineFilePdf : AiOutlineFileImage}
          />
          <span className="text-base text-gradient">
            {typeof file === "string"
              ? file
              : file?.name?.slice(0, 20) || "File"}
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

      {!file && (error || errors?.[name]) && (
        <span className="text-red-500 text-sm">
          {errors?.[name]?.message || error}
        </span>
      )}
    </div>
  );
};

export default UploadInput;

import { toast } from "react-toastify";

const defaultClasses = {
  success:
    "bg-green-100 text-green-800 font-medium rounded-md shadow-md px-4 py-3 my-3 mx-3 w-[85%] border-rounded",
  error:
    "bg-red-100 text-red-800 font-medium rounded-md shadow-md px-4 py-3 my-3 mx-3 w-[85%] border-rounded",
  warning:
    "bg-yellow-100 text-yellow-800 font-medium rounded-md shadow-md px-4 py-3 my-3 mx-3 w-[85%] border-rounded",
};

const defaultProgressClasses = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
};

export const showToast = (type, message) => {
  toast[type](message, {
    className: defaultClasses[type],
    bodyClassName: "text-sm",
    progressClassName: defaultProgressClasses[type],
  });
};

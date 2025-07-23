import { setToken } from "@/features/auth/auth-slice";

export const parseFatValue = (val) => {
  const match = val.match(/^(\d+(\.\d+)?)/);
  return match[0];
};

export const logoutUser = (dispatch, navigate) => {
  dispatch(setToken(""));
  localStorage.removeItem("token");
  navigate("/login");
};
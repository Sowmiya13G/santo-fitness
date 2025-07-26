import { clearToken } from "@/features/auth/auth-slice";

export const parseFatValue = (val) => {
  const match = val.match(/^(\d+(\.\d+)?)/);
  return match[0];
};

export const logoutUser = (dispatch) => {

  dispatch(clearToken(""));
  window.location.href = "/login";
};

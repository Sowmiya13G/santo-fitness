import axiosInstance from "../../apiService/axiosInstance";
import API_ENDPOINTS from "../../apiService/endpoints";

export const login = async (credentials) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials
  );
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.AUTH.FORGET_PASSWORD,
    data
  );
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.AUTH.RESET_PASSWORD,
    data
  );
  return response.data;
};

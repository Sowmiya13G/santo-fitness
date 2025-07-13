import axiosInstance from "../../apiService/axiosInstance";
import API_ENDPOINTS from "../../apiService/endpoints";

export const sendFCMToken = async (data) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.USER.SAVE_FCM_TOKEN,
    data
  );
  return response.data;
};

export const getUserData = async (data) => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER.USER, {
    id: data,
  });
  return response.data;
};

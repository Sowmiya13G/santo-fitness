import axiosInstance from "../../apiService/axiosInstance";
import API_ENDPOINTS from "../../apiService/endpoints";

export const sendFCMToken = async (data) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.USER.SAVE_FCM_TOKEN,
    data,
  );
  return response.data;
};

export const getUserData = async (data) => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER.USER, {
    id: data,
  });
  return response.data;
};

export const getUsersList = async (role) => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER.USERS, {
    role: role,
  });
  return response.data;
};

export const createUser = async (data) => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER.USER, data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await axiosInstance.get(
    `${API_ENDPOINTS.USER.USER}/${id}`,
    data,
  );
  return response.data;
};

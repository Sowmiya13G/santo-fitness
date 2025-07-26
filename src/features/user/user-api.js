import axiosInstance from "../../apiService/axios-instance";
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
  const response = await axiosInstance.post(API_ENDPOINTS.USER.CREATE_USER, data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_ENDPOINTS.USER.USER}/${id}`,
    data,
  );
  return response.data;
};

export const getUserReport = async () => {
  const response = await axiosInstance.get(
    `${API_ENDPOINTS.REPORT.GET_REPORT}`,
  );
  return response.data;
};

export const uploadFile = async (formData) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.FILE.UPLOAD_FILE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};


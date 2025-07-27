import axiosInstance from "../../apiService/axios-instance";
import API_ENDPOINTS from "../../apiService/endpoints";

export const getProgressData = async (params) => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.PROGRESS.BODY_PROGRESS,
    params
  );
  return response.data;
};

export const uploadProgressData = async (formData) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.PROGRESS.BODY_PROGRESS,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

import axiosInstance from "../../apiService/axios-instance";
import API_ENDPOINTS from "../../apiService/endpoints";

export const getProgressData = async (data) => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.PROGRESS.BODY_PROGRESS
  );
  return response.data;
};

import axiosInstance from "../../apiService/axios-instance";
import API_ENDPOINTS from "../../apiService/endpoints";

export const createDailyLogs = async (data) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.DAILY_LOGS.CREATE_DAILY_LOGS,
    data
  );
  return response.data;
};

export const getDietProgress = async (params = {}) => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.DAILY_LOGS.GET_DIET_PROGRESS,
    params
  );

  return response.data.data;
};

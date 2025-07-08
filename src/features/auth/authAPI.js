import axiosInstance from '../../apiService/axiosInstance';
import API_ENDPOINTS from '../../apiService/endpoints';

export const login = async (credentials) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return response.data; 
};

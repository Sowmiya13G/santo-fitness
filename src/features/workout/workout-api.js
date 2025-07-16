import axiosInstance from "../../apiService/axios-instance";
import API_ENDPOINTS from "../../apiService/endpoints";

export const createWorkout = async (data) => {
  const response = await axiosInstance.post(
    API_ENDPOINTS.WORKOUT.CREATE_WORKOUT,
    data
  );
  return response.data;
};

export const getClientWorkout = async () => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.WORKOUT.GET_CLIENT_WORKOUT
  );
  return response.data;
};
export const updateWorkout = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_ENDPOINTS.WORKOUT.UPDATE_WORKOUT}/${id}`,
    data
  );
  return response.data;
};

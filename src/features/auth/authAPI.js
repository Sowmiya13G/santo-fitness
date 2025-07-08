import { useQuery, useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axiosInstance';
import API_ENDPOINTS from '../../api/endpoints';

const fetchUser = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.user.profile);
  return data;
};

const updateUser = async (userData) => {
  const { data } = await axiosInstance.put(API_ENDPOINTS.user.update, userData);
  return data;
};

export const useUserQuery = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

export const useUpdateUser = () =>
  useMutation({
    mutationFn: updateUser,
  });

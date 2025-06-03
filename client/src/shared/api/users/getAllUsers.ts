import apiUrls from "../apiUrls";
import axiosInstance from "../axiosInstance";

const getAllUsers = async () => {
  const { data } = await axiosInstance.get(apiUrls.users.allUsers());
  return data;
};

export default getAllUsers;

import apiUrls from "../apiUrls";
import axiosInstance from "../axiosInstance";

const getAllIssues = async () => {
  const { data } = await axiosInstance.get(apiUrls.issues.allIssues());
  return data;
};

export default getAllIssues;

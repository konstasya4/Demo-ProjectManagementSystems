import { NewIssues } from "../../../types/types";
import apiUrls from "../apiUrls";
import axiosInstance from "../axiosInstance";

const updateIssue = async (id: number, params: NewIssues) => {
  const { data } = await axiosInstance.put(
    apiUrls.issues.updateIssue(id),
    params
  );
  return data;
};

export default updateIssue;

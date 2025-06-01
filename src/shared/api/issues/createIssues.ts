import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const  createIssues = async (params:string) => {
  const { data } = await axiosInstance.post(apiUrls.issues.createIssue(), {
    params,
  })
  return data
}

export default createIssues

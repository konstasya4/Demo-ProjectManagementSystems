import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const  updateStatusIssue = async (params:string, id:number) => {
  const { data } = await axiosInstance.put(apiUrls.issues.updateStatusIssue(id), {
    params,
  })
  return data
}

export default updateStatusIssue
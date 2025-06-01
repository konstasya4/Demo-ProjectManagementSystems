import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const  updateIssue = async (params:string, id:number) => {
  const { data } = await axiosInstance.put(apiUrls.issues.updateIssue(id), {
    params,
  })
  return data
}

export default updateIssue
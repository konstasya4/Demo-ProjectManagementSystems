import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const  updateStatusIssue = async ( id:number, status:string,) => {
  const { data } = await axiosInstance.put(apiUrls.issues.updateStatusIssue(id), {
    status,
  })
  return data
}

export default updateStatusIssue
import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const  getItemIssues = async ( id:number) => {
  const { data } = await axiosInstance.post(apiUrls.issues.itemIssue(id))
  return data
}

export default getItemIssues
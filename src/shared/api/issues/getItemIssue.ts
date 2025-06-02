import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const  getItemIssues = async ( id:number) => {
  const { data } = await axiosInstance.get(apiUrls.issues.itemIssue(id))
  return data
}

export default getItemIssues
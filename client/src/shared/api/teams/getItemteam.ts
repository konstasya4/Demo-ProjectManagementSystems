import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const getItemteam = async (id:number) => {
  const { data } = await axiosInstance.get(apiUrls.teams.itemTeam(id))
  return data
}

export default getItemteam

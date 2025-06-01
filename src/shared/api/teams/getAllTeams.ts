import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const getAllTeams = async () => {
  const { data } = await axiosInstance.get(apiUrls.teams.allTeams())
  return data
}

export default getAllTeams

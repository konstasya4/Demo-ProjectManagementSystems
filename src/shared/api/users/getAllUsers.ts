import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const getAllUsers = async () => {
  const { data } = await axiosInstance.get(apiUrls.teams.allTeams())
  return data
}

export default getAllUsers

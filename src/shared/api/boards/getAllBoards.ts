import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const getAllBoards = async () => {
  const { data } = await axiosInstance.get(apiUrls.boards.allBoards())
  return data
}

export default getAllBoards

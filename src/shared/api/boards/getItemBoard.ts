import apiUrls from '../apiUrls'
import axiosInstance from '../axiosInstance'

const getItemBoard = async (id:number) => {
  const { data } = await axiosInstance.get(apiUrls.boards.itemBoard(id))
  return data
}

export default getItemBoard

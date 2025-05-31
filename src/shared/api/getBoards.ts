import axiosInstance from './axiosInstance'

const getBoards = async () => {
  const { data } = await axiosInstance.get(`/boards`)
  return data
}

export default getBoards

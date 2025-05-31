import axiosInstance from './axiosInstance'

const getToDoProject = async (id: string) => {
  const { data } = await axiosInstance.get(`/boards/${id}`)
  return data
}

export default getToDoProject

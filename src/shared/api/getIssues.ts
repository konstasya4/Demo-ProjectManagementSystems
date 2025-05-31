import axiosInstance from './axiosInstance'

const getIssues = async (id: string) => {
  const { data } = await axiosInstance.get(`/tasks/${id}`)
  return data
}

export default getIssues

import axios from "axios";

const axiosApi = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://task-management-app-server-livid.vercel.app",
});

const useAxiosApi = () => {
  return axiosApi;
};

export default useAxiosApi;

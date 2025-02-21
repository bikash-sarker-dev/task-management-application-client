import axios from "axios";

const createInstance = axios.create({
  baseURL: "http://localhost:8000",
});

const useAxiosApi = () => {
  return createInstance;
};

export default useAxiosApi;

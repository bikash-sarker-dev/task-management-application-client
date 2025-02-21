import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

const useAuth = () => {
  const result = useContext(AuthContext);
  return result;
};

export default useAuth;

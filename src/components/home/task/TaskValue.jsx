import { useEffect, useState } from "react";
import useAxiosApi from "./../../../hooks/useAxiosApi";

const taskValue = () => {
  const axiosApi = useAxiosApi();
  const [todoValue, setTodoValue] = useState([]);
  const [progressValue, setProgressValue] = useState([]);
  const [doneValue, setDoneValue] = useState([]);

  async function todoGet() {
    let res = await axiosApi.get("/tasks/todo");
    setTodoValue(res.data);
  }
  console.log(todoValue);
  useEffect(() => {
    todoGet();
  }, []);

  const initialData = {
    todo: todoValue,
    inProgress: ["Task 3"],
    done: ["Task 4"],
  };

  return initialData;
};

export default taskValue;

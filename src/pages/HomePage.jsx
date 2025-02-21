import React from "react";
import TaskShow from "../components/home/task/TaskShow";
import TaskForm from "../components/home/taskForm/TaskForm";

const HomePage = () => {
  return (
    <div>
      <TaskForm />
      <TaskShow />
    </div>
  );
};

export default HomePage;

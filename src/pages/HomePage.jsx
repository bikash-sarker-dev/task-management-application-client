import React from "react";
import KanbanBoard from "../components/home/task/TaskDrop";
import TaskForm from "../components/home/taskForm/TaskForm";

const HomePage = () => {
  return (
    <div>
      <TaskForm />
      {/* <TaskShow /> */}
      {/* <NewShowTask /> */}
      {/* <LatestDrop /> */}
      <KanbanBoard />
    </div>
  );
};

export default HomePage;

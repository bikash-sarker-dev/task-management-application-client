import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import Swal from "sweetalert2";
import useAxiosApi from "./../../../hooks/useAxiosApi";

export default function KanbanBoard() {
  const axiosApi = useAxiosApi();
  const [todoValue, setTodoValue] = useState([]);
  const [progressValue, setProgressValue] = useState([]);
  const [doneValue, setDoneValue] = useState([]);
  const [run, setRun] = useState(false);
  const [columns, setColumns] = useState({
    todo: [],
    progress: [],
    done: [],
  });

  useEffect(() => {
    axiosApi.get("/tasks").then((response) => {
      const tasks = response.data.reduce(
        (acc, task) => {
          acc[task.category] = [...(acc[task.category] || []), task];
          return acc;
        },
        { todo: [], progress: [], done: [] }
      );

      setColumns(tasks);
    });
  }, [run]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setColumns((prevColumns) => {
      const newColumns = { ...prevColumns };
      const sourceColumn = newColumns[source.droppableId];
      const destinationColumn = newColumns[destination.droppableId];
      const [movedTask] = sourceColumn.splice(source.index, 1);
      destinationColumn.splice(destination.index, 0, movedTask);

      return newColumns;
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosApi.delete(`/tasks/${id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          setRun(!run);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-6 p-6 ">
        {Object.entries(columns).map(([colId, tasks]) => (
          <Droppable key={colId} droppableId={colId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-4 bg-cyan-900 rounded-lg  shadow-md min-h-screen"
              >
                <h2 className="font-bold text-lg text-white mb-3">
                  {colId.toUpperCase()}
                </h2>
                {tasks.map((task, index) => (
                  // Ensure that the draggableId is unique for each task
                  <Draggable
                    key={`${colId}-${task}-${index}`}
                    draggableId={`${colId}-${task}-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`  shadow-md rounded-md cursor-grab`}
                      >
                        <div className="card bg-base-100  shadow-xl my-3">
                          <div className="card-actions justify-end pt-5 pr-5">
                            <button className="text-xl">
                              <TiPencil />
                            </button>
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="text-xl"
                            >
                              <IoMdClose />
                            </button>
                          </div>
                          <div className="card-body pt-2">
                            <h2 className="card-title">{task?.title}</h2>
                            <p>{task?.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

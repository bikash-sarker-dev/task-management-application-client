import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import Swal from "sweetalert2";
import useAxiosApi from "./../../../hooks/useAxiosApi";

export default function KanbanBoard() {
  const axiosApi = useAxiosApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [upTask, setUpTask] = useState({});
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

  const onSubmit = async (data) => {
    const taskInfo = {
      ...data,
    };

    try {
      let res = await axiosApi.patch(`/tasks/${upTask._id}`, taskInfo);
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
    reset();
    document.getElementById("my_modal_1").close();
    console.log(taskInfo);
  };

  const handleUpdateTask = async (id) => {
    document.getElementById("my_modal_1").showModal();
    console.log(id);
    const res = await axiosApi.get(`/tasks/${id}`);
    setUpTask(res.data);
  };

  return (
    <>
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
                          {task && (
                            <div className="card bg-base-100  shadow-xl my-3">
                              <div className="card-actions justify-end pt-5 pr-5">
                                <button
                                  onClick={() => handleUpdateTask(task._id)}
                                  className="text-xl"
                                >
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
                          )}
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
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="modal-action mt-0">
            <form method="dialog">
              <button className="btn btn-sm text-xl bg-red-500  text-white">
                <IoMdClose />
              </button>
            </form>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="dialog"
            className="card-body"
          >
            <div className="flex gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  {...register("title", { required: true, maxLength: 50 })}
                  type="text"
                  placeholder="title"
                  className="input input-bordered"
                  defaultValue={upTask?.title}
                  required
                />
                {errors.title && (
                  <span className="text-red-500">
                    This is max 50 characters
                  </span>
                )}
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  className="select select-bordered w-full "
                  {...register("category", { required: true })}
                  defaultValue={
                    upTask?.category ? upTask?.category : "Choose your category"
                  }
                >
                  <option disabled>
                    {upTask?.category
                      ? upTask?.category
                      : "Choose your category"}
                  </option>
                  <option value="todo">To-Do</option>
                  <option value="progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description", {
                  required: true,
                  maxLength: 200,
                })}
                defaultValue={upTask?.description}
                placeholder="description"
                className="textarea textarea-bordered textarea-md w-full "
              ></textarea>
            </div>
            {errors.description && (
              <span className="text-red-500">This is max 200 characters</span>
            )}
            <div className="form-control mt-6">
              <button className="btn bg-cyan-700 text-white text-xl">
                Update Task
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

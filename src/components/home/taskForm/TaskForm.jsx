import React from "react";
import { useForm } from "react-hook-form";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="max-w-6xl mx-auto">
      <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="flex gap-5">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register("title", { required: true, maxLength: 20 })}
                type="text"
                placeholder="title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                defaultValue="Choose your category"
                className="select select-bordered w-full "
                {...register("category", { required: true, maxLength: 20 })}
              >
                <option disabled>Choose your category</option>
                <option className="to-do">To-Do</option>
                <option className="progress">In Progress</option>
                <option className="done">Done</option>
              </select>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", { required: true, maxLength: 20 })}
              placeholder="description"
              className="textarea textarea-bordered textarea-md w-full "
            ></textarea>
          </div>
          {errors.title && <span>This field is required</span>}
          <div className="form-control mt-6">
            <button className="btn bg-cyan-700 text-white text-xl">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

import React from "react";

const TaskShow = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center ">The Task Show </h1>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          <div className="min-h-screen bg-cyan-950">
            <h2 className="text-2xl text-white bg-cyan-500 text-center py-3 font-bold">
              To-Do
            </h2>
            <div>
              <div className="card bg-base-100 w-96 mx-auto shadow-xl my-3">
                <div className="card-body">
                  <h2 className="card-title">Card title!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-screen bg-cyan-950">
            <h2 className="text-2xl text-white bg-cyan-500 text-center py-3 font-bold">
              In Progress
            </h2>
          </div>
          <div className="min-h-screen bg-cyan-950">
            <h2 className="text-2xl text-white bg-cyan-500 text-center py-3 font-bold">
              Done
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskShow;

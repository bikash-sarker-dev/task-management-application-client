import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

const initialData = {
  todo: ["Task 1", "Task 2"],
  inProgress: ["Task 3"],
  done: ["Task 4"],
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If the task is moved to the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setColumns((prevColumns) => {
      // Create a new copy of the columns state
      const newColumns = { ...prevColumns };

      // Get the source and destination columns
      const sourceColumn = newColumns[source.droppableId];
      const destinationColumn = newColumns[destination.droppableId];

      // Remove the task from the source column
      const [movedTask] = sourceColumn.splice(source.index, 1);

      // Add the task to the destination column
      destinationColumn.splice(destination.index, 0, movedTask);

      // Return the updated state without copying the entire column object
      return newColumns;
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
                        className={`${
                          task && "p-4"
                        } bg-white  shadow-md rounded-md cursor-grab my-3`}
                      >
                        {task}
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

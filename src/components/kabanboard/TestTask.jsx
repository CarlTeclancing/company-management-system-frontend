import React, { useState } from "react";
import "./testTask.css";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


// Individual Task Item
function Task({ id, content }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={`task ${isDragging ? "task-dragging" : ""}`}
      style={style}
      {...attributes}
      {...listeners}
    >
      {content}
    </div>
  );
}

// Column Component
function Column({ columnId, title, tasks }) {
  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} content={task.content} />
        ))}
      </SortableContext>
    </div>
  );
}

// Main Kanban Board
export default function KanbanBoard() {
  const [columns, setColumns] = useState({
    todo: {
      id: "todo",
      title: "To Do",
      tasks: [
        { id: "1", content: "Design Homepage" },
        { id: "2", content: "Write Documentation" },
      ],
    },
    inprogress: {
      id: "inprogress",
      title: "In Progress",
      tasks: [{ id: "3", content: "Build API" }],
    },
    done: {
      id: "done",
      title: "Done",
      tasks: [{ id: "4", content: "Setup Database" }],
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const findColumn = (taskId) => {
    return Object.values(columns).find((col) =>
      col.tasks.some((task) => task.id === taskId)
    );
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const sourceColumn = findColumn(active.id);
      const destColumn = findColumn(over.id);

      if (!sourceColumn || !destColumn) return;

      if (sourceColumn.id === destColumn.id) {
        // Reorder within the same column
        const updatedTasks = arrayMove(
          sourceColumn.tasks,
          sourceColumn.tasks.findIndex((t) => t.id === active.id),
          sourceColumn.tasks.findIndex((t) => t.id === over.id)
        );

        setColumns({
          ...columns,
          [sourceColumn.id]: { ...sourceColumn, tasks: updatedTasks },
        });
      } else {
        // Move to another column
        const sourceTasks = [...sourceColumn.tasks];
        const destTasks = [...destColumn.tasks];

        const [movedTask] = sourceTasks.splice(
          sourceTasks.findIndex((t) => t.id === active.id),
          1
        );

        destTasks.splice(
          destColumn.tasks.findIndex((t) => t.id === over.id),
          0,
          movedTask
        );

        setColumns({
          ...columns,
          [sourceColumn.id]: { ...sourceColumn, tasks: sourceTasks },
          [destColumn.id]: { ...destColumn, tasks: destTasks },
        });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
    >
      <div className="board">
        {Object.values(columns).map((col) => (
          <Column
            key={col.id}
            columnId={col.id}
            title={col.title}
            tasks={col.tasks}
          />
        ))}
      </div>
    </DndContext>
  );
}

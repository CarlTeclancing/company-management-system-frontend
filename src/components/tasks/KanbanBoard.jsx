import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./KanbanColumn";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../globals";

export default function KanbanBoard() {
  const { companyId } = useAuth(); // assuming AuthContext provides companyId
  const [pending, setPending] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorFetching, setErrorFetching] = useState(null);

  // fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/tasks/${companyId}`);
        const tasks = res.data;

        // group by status (match your backend enums!)
        setPending(tasks.filter((task) => task.status === "pending"));
        setInProgress(tasks.filter((task) => task.status === "in_progress"));
        setCompleted(tasks.filter((task) => task.status === "completed"));

        console.log("Fetched Tasks:", tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setErrorFetching(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) fetchTasks();
  }, [companyId]);

  // drag handling
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const task = findItemById(draggableId, [
      ...pending,
      ...inProgress,
      ...completed,
    ]);

    // remove from old list
    deleteFromState(source.droppableId, draggableId);

    // add to new list with updated status
    const newStatus = mapIdToStatus(destination.droppableId);
    setToNewState(destination.droppableId, { ...task, status: newStatus });

    // 👉 sync with backend
    axios
      .patch(`${BASE_URL}/tasks/${task.id}`, { status: newStatus })
      .catch((err) => console.error("Failed to update task status:", err));
  };

  // map droppableId → backend status
  function mapIdToStatus(id) {
    switch (id) {
      case "1":
        return "pending";
      case "2":
        return "in_progress";
      case "3":
        return "completed";
      default:
        return "pending";
    }
  }

  function deleteFromState(sourceId, taskId) {
    switch (sourceId) {
      case "1":
        setPending(removeById(taskId, pending));
        break;
      case "2":
        setInProgress(removeById(taskId, inProgress));
        break;
      case "3":
        setCompleted(removeById(taskId, completed));
        break;
    }
  }

  function setToNewState(destId, task) {
    switch (destId) {
      case "1":
        setPending([task, ...pending]);
        break;
      case "2":
        setInProgress([task, ...inProgress]);
        break;
      case "3":
        setCompleted([task, ...completed]);
        break;
    }
  }

  function findItemById(id, array) {
    return array.find((item) => String(item.id) === String(id));
  }

  function removeById(id, array) {
    return array.filter((item) => String(item.id) !== String(id));
  }

  if (loading) return <h3>Loading tasks...</h3>;
  if (errorFetching) return <h3>Error: {errorFetching}</h3>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          flexDirection: "row",
          width: "1300px",
          margin: "0 auto",
        }}
      >
        <Column title="Pending" tasks={pending} id="1" />
        <Column title="In Progress" tasks={inProgress} id="2" />
        <Column title="Completed" tasks={completed} id="3" />
      </div>
    </DragDropContext>
  );
}

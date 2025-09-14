// KanbanTaskCard.jsx
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Avatar } from "antd";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 80px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "#EAF4FC")};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TextContent = styled.div`
  font-weight: 600;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #444;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Card({ task, index }) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <small>#{task.id}</small>
            <Avatar src={"https://joesch.moe/api/v1/random?key=" + task.id} />
          </div>

          <TextContent>{task.title}</TextContent>

          <Meta>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 250 }}>
              {task.description || ""}
            </div>
            <div>
              <small>{task.priority || ""}</small>
            </div>
          </Meta>
        </Container>
      )}
    </Draggable>
  );
}

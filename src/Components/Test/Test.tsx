import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import React, { useState } from "react";
import "./Test.css";

export const Test = () => {
  const [ul1, setUl1] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [ul2, setUl2] = useState([8, 9, 10, 11, 12, 13]);

  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style1 = {
    color: isOver ? "green" : undefined,
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && over.id === "droppable") {
      const draggedItem = ul2.find((el) => el === active.id);
      if (draggedItem) {
        setUl1([...ul1, draggedItem]);
        setUl2(ul2.filter((el) => el !== draggedItem));
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container">
        <div>
          <ul ref={setNodeRef} style={style1}>
            {ul1.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {ul2.map((el, index) => (
              <DraggableItem key={index} id={el}>
                {el}
              </DraggableItem>
            ))}
          </ul>
        </div>
      </div>
    </DndContext>
  );
};

interface DraggableItemProps {
  id: number;
  children: React.ReactNode;
}

const DraggableItem = ({ id, children }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </li>
  );
};

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { useState } from "react";
import DraggableField from "./DraggableField";

export default function Canvas() {
  const [fields, setFields] = useState([]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDropFromSidebar = (e) => {
    const fieldType = e.dataTransfer.getData("fieldType");
    if (fieldType) {
      setFields([...fields, { id: Date.now().toString(), type: fieldType }]);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over?.id);
      setFields((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div
      className="flex-1 p-6 bg-gray-50 border border-dashed border-gray-300 rounded-lg min-h-[400px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropFromSidebar}
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Form Canvas</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {fields.map((field) => (
              <DraggableField key={field.id} field={field} id={field.id} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

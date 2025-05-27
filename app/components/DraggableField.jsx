import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function DraggableField({ field, id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  };

  let content;
  switch (field.type) {
    case "text":
      content = <input type="text" placeholder="Text input" className="border p-2 w-full rounded" />;
      break;
    case "textarea":
      content = <textarea placeholder="Textarea" className="border p-2 w-full rounded" />;
      break;
    case "dropdown":
      content = (
        <select className="border p-2 w-full rounded">
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      );
      break;
    case "checkbox":
      content = (
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Checkbox
        </label>
      );
      break;
    case "date":
      content = <input type="date" className="border p-2 w-full rounded" />;
      break;
    default:
      content = null;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-md shadow border border-gray-200"
    >
      {content}
    </div>
  );
}

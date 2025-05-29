import { PencilIcon, TrashIcon, Bars2Icon } from "@heroicons/react/24/outline";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function DraggableField({ field, id, onClick, onDelete }) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white dark:bg-gray-900 p-4 rounded-md shadow border border-gray-200 dark:border-gray-700 hover:ring hover:ring-blue-300 dark:hover:ring-blue-700"
    >
      {/* Top-right controls */}
      <div className="absolute top-2 right-2 flex gap-2 items-center">
        <button onClick={onClick} title="Edit field">
          <PencilIcon className="h-5 w-5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" />
        </button>
        <button onClick={() => onDelete(field.id)} title="Delete field">
          <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" />
        </button>
        <div {...attributes} {...listeners} title="Drag">
          <Bars2Icon className="h-5 w-5 text-gray-500 cursor-move hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
        </div>
      </div>

      {/* Label */}
      {field.label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {field.label}
          {field.required && (
            <span className="text-red-500 dark:text-red-400"> *</span>
          )}
        </label>
      )}

      {/* Non-interactive preview */}
      {field.type === "text" && (
        <input
          type="text"
          placeholder={field.placeholder}
          disabled
          className="border p-2 w-full rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 cursor-not-allowed"
        />
      )}

      {field.type === "textarea" && (
        <textarea
          placeholder={field.placeholder}
          disabled
          className="border p-2 w-full rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 cursor-not-allowed"
        />
      )}

      {field.type === "dropdown" && (
        <select
          disabled
          className="border p-2 w-full rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 cursor-not-allowed"
        >
          <option>Select an option</option>
          {field.options?.map((opt, i) => (
            <option key={i}>{opt}</option>
          ))}
        </select>
      )}

      {field.type === "checkbox" &&
        field.options?.map((opt, i) => (
          <label
            key={i}
            className="block text-gray-600 dark:text-gray-300 cursor-not-allowed"
          >
            <input type="checkbox" className="mr-2" disabled /> {opt}
          </label>
        ))}

      {field.type === "date" && (
        <input
          type="date"
          disabled
          className="border p-2 w-full rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 cursor-not-allowed"
        />
      )}
      {field.type === "email" && (
        <input
          type="email"
          placeholder={field.placeholder}
          disabled
          className="border p-2 w-full rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 cursor-not-allowed"
        />
      )}

      {field.type === "number" && (
        <input
          type="number"
          placeholder={field.placeholder}
          disabled
          className="border p-2 w-full rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 cursor-not-allowed"
        />
      )}

      {field.type === "phone" && (
        <input
          type="tel"
          placeholder={field.placeholder}
          disabled
          className="border p-2 w-full rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 cursor-not-allowed"
        />
      )}

      {field.type === "file" && (
        <input
          type="file"
          disabled
          className="border p-2 w-full rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 cursor-not-allowed"
        />
      )}

      {field.type === "radio" &&
        field.options?.map((opt, i) => (
          <label
            key={i}
            className="block text-gray-600 dark:text-gray-300 cursor-not-allowed"
          >
            <input type="radio" name={field.id} className="mr-2" disabled />{" "}
            {opt}
          </label>
        ))}

      {field.type === "toggle" && (
        <label className="flex items-center gap-2 cursor-not-allowed">
          <span className="text-gray-600 dark:text-gray-300">
            {field.placeholder || "Toggle"}
          </span>
          <span className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              disabled
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-4 appearance-none cursor-not-allowed"
              style={{ left: 0, top: 0 }}
            />
            <span className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-800 cursor-not-allowed"></span>
          </span>
        </label>
      )}

      {field.type === "time" && (
        <input
          type="time"
          disabled
          className="border p-2 w-full rounded bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 cursor-not-allowed"
        />
      )}

      {field.helpText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {field.helpText}
        </p>
      )}
    </div>
  );
}

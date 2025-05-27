// app/components/Sidebar.jsx
const fieldTypes = [
  { type: "text", label: "Text Input" },
  { type: "textarea", label: "Textarea" },
  { type: "dropdown", label: "Dropdown" },
  { type: "checkbox", label: "Checkbox" },
  { type: "date", label: "Date" }
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Field Types</h2>
      <div className="space-y-3">
        {fieldTypes.map((field) => (
          <div
            key={field.type}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("fieldType", field.type);
            }}
            className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg cursor-move shadow-sm hover:bg-blue-200"
          >
            {field.label}
          </div>
        ))}
      </div>
    </div>
  );
}

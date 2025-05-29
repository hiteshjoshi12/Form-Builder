import {
  DocumentTextIcon,
  CalendarIcon,
  ClockIcon,
  InboxArrowDownIcon,
  CameraIcon,
  CheckCircleIcon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon,
  ClipboardIcon,
  PencilSquareIcon,
 
} from "@heroicons/react/24/outline";

const groupedFields = [
  {
    title: "Text Elements",
    fields: [
      { type: "text", label: "Text Field", icon: PencilSquareIcon },
      { type: "textarea", label: "Notes", icon: DocumentTextIcon },
    ],
  },
  {
    title: "Date Elements",
    fields: [
      { type: "date", label: "Date Picker", icon: CalendarIcon },
      { type: "time", label: "Time", icon: ClockIcon },
    ],
  },
  {
    title: "Other Elements",
    fields: [
      { type: "radio", label: "Radio", icon: AdjustmentsHorizontalIcon },
      { type: "toggle", label: "Toggle", icon: ClipboardIcon },
      { type: "checkbox", label: "Checkbox", icon: CheckCircleIcon },
      { type: "dropdown", label: "Dropdown", icon: ListBulletIcon },
      
    ],
  },
  {
    title: "Media Elements",
    fields: [
      { type: "file", label: "Upload", icon: InboxArrowDownIcon },

    ],
  },
];

export default function Sidebar({ currentView }) {
  return (
  <>
    {/* Mobile/Tablet: horizontal scrollable bar at the top */}
    <nav className="flex md:hidden w-full bg-white dark:bg-gray-900 shadow-md p-2 overflow-x-auto gap-4 transition-colors duration-300">
      {currentView === "builder" &&
        groupedFields.map((group) => (
          <div key={group.title} className="min-w-[160px]">
            <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {group.title}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {group.fields.map((field) => (
                <div
                  key={field.type}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("fieldType", field.type);
                  }}
                  className="flex items-center gap-2 px-2 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-xs text-gray-800 dark:text-gray-100 shadow cursor-move transition"
                >
                  <field.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span>{field.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </nav>

    {/* Desktop: vertical sidebar */}
    <aside className="hidden md:flex flex-col w-64 min-h-screen shadow-md bg-white dark:bg-gray-900 p-4 space-y-6 transition-colors duration-300">
      {currentView === "builder" &&
        groupedFields.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {group.title}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {group.fields.map((field) => (
                <div
                  key={field.type}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("fieldType", field.type);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-100 shadow cursor-move transition"
                >
                  <field.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span>{field.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </aside>
  </>
);

}

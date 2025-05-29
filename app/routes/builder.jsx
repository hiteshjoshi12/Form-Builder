import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas";
import GrowformPreview from "../components/GrowformPreview";
import Navbar from "../components/Navbar";

export default function Builder() {
  const [fields, setFields] = useState([]);
  const [mode, setMode] = useState("desktop");
  const [currentView, setCurrentView] = useState("builder");

  return (
  <>
    <Navbar />
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Sidebar: full width on mobile, fixed width on md+ */}
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar
          mode={mode}
          setMode={setMode}
          currentView={currentView}
          fields={fields}
          setFields={setFields}
          setCurrentView={setCurrentView}
        />
      </div>

      {/* Main content: grows and scrolls */}
      <main className="flex-1 p-3 sm:p-4 md:p-6 space-y-6 overflow-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        {currentView === "builder" ? (
          <Canvas fields={fields} setFields={setFields} />
        ) : (
          <GrowformPreview fields={fields} />
        )}
      </main>
    </div>
  </>
);

}

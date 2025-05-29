import { useState } from "react";
import { XMarkIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function FormNameModal({ onCreate, onClose }) {
  const [formName, setFormName] = useState("");

  return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 w-full max-w-md shadow-xl relative border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onClose}>
          <ArrowLeftIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        </button>
        <button onClick={onClose}>
          <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        </button>
      </div>

      <h2 className="text-xl font-semibold text-center mb-4 text-gray-900 dark:text-gray-100">
        Enter the following details:
      </h2>

      <input
        type="text"
        placeholder="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />

      <div className="flex justify-center gap-4">
        <button
          onClick={() => onCreate(formName)}
          disabled={!formName}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800 disabled:bg-gray-300 dark:disabled:bg-gray-700"
        >
          Create Form
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

}

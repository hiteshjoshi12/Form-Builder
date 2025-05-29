import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { PlusIcon, BookOpenIcon, TrashIcon } from "@heroicons/react/24/outline";
import FormNameModal from "../components/FormNameModal";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function Index() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState({});
  const [sharedForms, setSharedForms] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch saved templates
    const stored = localStorage.getItem("formTemplates");
    if (stored) setTemplates(JSON.parse(stored));

    // Fetch shared forms
    const shared = localStorage.getItem("sharedForms");
    if (shared) setSharedForms(JSON.parse(shared));
  }, []);

  const handleCreate = (name) => {
    localStorage.setItem("liveFormName", name);
    localStorage.setItem("liveForm", JSON.stringify([]));
    setShowModal(false);
    navigate("/builder");
  };

  const deleteTemplate = (name) => {
    const copy = { ...templates };
    delete copy[name];
    localStorage.setItem("formTemplates", JSON.stringify(copy));
    setTemplates(copy);
  };

 return (
  <>
  
    <Navbar />
  <div className="min-h-screen bg-white dark:bg-gray-900 p-4 sm:p-8 transition-colors duration-300">
    <h1 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
      All Form Templates
    </h1>

    {/* Templates Flexbox Grid */}
    <div className="flex flex-wrap gap-6 justify-center">
      {/* Blank Form */}
      <div
        onClick={() => setShowModal(true)}
        className="w-40 h-40 sm:w-48 sm:h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <PlusIcon className="w-10 h-10 text-gray-500 dark:text-gray-400" />
        <p className="mt-2 font-medium text-gray-700 dark:text-gray-200">Blank Form</p>
      </div>

      {/* Saved Templates */}
      {Object.entries(templates).map(([name, fields]) => (
        <div key={name} className="w-40 sm:w-48 flex flex-col items-center">
          <div
            onClick={() => {
              localStorage.setItem("liveFormName", name);
              localStorage.setItem("liveForm", JSON.stringify(fields));
              navigate("/builder");
            }}
            className="w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center border border-gray-300 dark:border-gray-600 rounded p-4 sm:p-6 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <BookOpenIcon className="w-10 h-10 mx-auto text-gray-600 dark:text-gray-400" />
            <p className="mt-2 font-medium text-green-600 dark:text-green-400 break-words">{name}</p>
          </div>
          <button
            onClick={() => deleteTemplate(name)}
            className="mt-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
            aria-label={`Delete template ${name}`}
          >
            <TrashIcon className="w-5 h-5 mx-auto" />
          </button>
        </div>
      ))}
    </div>

    {/* Modal */}
    {showModal && (
      <FormNameModal
        onCreate={handleCreate}
        onClose={() => setShowModal(false)}
      />
    )}

    {/* Shared Forms Section */}
    {Object.keys(sharedForms).length > 0 && (
      <div className="mt-12">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          🔗 Shared Forms
        </h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(sharedForms).map(([id, data]) => (
            <div
              key={id}
              className="w-full max-w-xs border border-gray-300 dark:border-gray-600 p-3 sm:p-4 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow hover:shadow-md transition"
            >
              <h3 className="font-medium text-base sm:text-lg break-words">
                {data.name}
              </h3>
              <div className="mt-3 flex justify-between text-sm">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/form/${id}`
                    );
                    toast.success("Link copied to clipboard!");
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => window.open(`/form/${id}`, "_blank")}
                  className="text-green-600 dark:text-green-400 hover:underline"
                >
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  </>
);

}

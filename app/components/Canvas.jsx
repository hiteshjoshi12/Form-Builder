import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
  XMarkIcon,
  EyeIcon,
  ArrowUpTrayIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { nanoid } from "nanoid";

import { useEffect, useState } from "react";
import DraggableField from "./DraggableField";
import FieldConfigPanel from "./FieldConfigPanel"; 
import GrowformPreview from "./GrowformPreview";
import { useNavigate } from "@remix-run/react";
import toast from "react-hot-toast";

export default function Canvas({ fields, setFields }) {
  const [selectedField, setSelectedField] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [steps, setSteps] = useState([1]);
  const [showPreview, setShowPreview] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);
  const [formName, setFormName] = useState("Untitled Form");

  const [previewMode, setPreviewMode] = useState("desktop"); // desktop | tablet | mobile
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  useEffect(() => {
    const uniqueSteps = [...new Set(fields.map((f) => f.step || 1))].sort(
      (a, b) => a - b
    );
    setSteps(uniqueSteps.length > 0 ? uniqueSteps : [1]);
  }, [fields]);

  useEffect(() => {
    if (!steps.includes(activeStep)) {
      setActiveStep(steps[0]);
    }
  }, [steps]);

  const handleDropFromSidebar = (e) => {
    const fieldType = e.dataTransfer.getData("fieldType");
    if (fieldType) {
      const newField = {
        id: Date.now().toString(),
        type: fieldType,
        label: "Untitled",
        placeholder: "",
        required: false,
        helpText: "",
        options: ["dropdown", "checkbox", "radio"].includes(fieldType)
          ? ["Option 1", "Option 2"]
          : [],
        minLength: "",
        maxLength: "",
        pattern: "",
        step: activeStep,
      };
      setFields([...fields, newField]);
      setSelectedField(newField); // auto select it for config
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const allIndex = (id) => fields.findIndex((f) => f.id === id);
      const oldIndex = allIndex(active.id);
      const newIndex = allIndex(over.id);
      setFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  const updateField = (updated) => {
    setFields(fields.map((f) => (f.id === updated.id ? updated : f)));
    setSelectedField(updated);
  };

  const deleteStep = () => {
    if (steps.length === 1) return toast.error("At least one step is required.");
    const updatedSteps = steps.filter((s) => s !== activeStep);
    setFields(fields.filter((f) => f.step !== activeStep));
    setSteps(updatedSteps);
    setActiveStep(updatedSteps[0]);
    setSelectedField(null);
  };

  const saveForm = () => {
    const formTemplates = JSON.parse(localStorage.getItem("formTemplates") || "{}");
    formTemplates[formName] = fields;
    localStorage.setItem("formTemplates", JSON.stringify(formTemplates));
    localStorage.setItem("liveForm", JSON.stringify(fields));

    toast.success("Form manually saved to localStorage.");
  };

  useEffect(() => {
    if (saveTimeout) clearTimeout(saveTimeout);

    const timeout = setTimeout(() => {
      const formTemplates = JSON.parse(localStorage.getItem("formTemplates") || "{}");
    formTemplates[formName] = fields;
    localStorage.setItem("formTemplates", JSON.stringify(formTemplates));
      
      localStorage.setItem("liveForm", JSON.stringify(fields));
      toast.success("Auto-saved form to localStorage");
    }, 5000);

    setSaveTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [fields]);

  const openPreview = () => {
    localStorage.setItem("liveForm", JSON.stringify(fields));
    setShowPreview(true);
  };

  useEffect(() => {
    const FormName = localStorage.getItem("liveFormName");
    const templates = JSON.parse(localStorage.getItem("formTemplates") || "{}");

    if (FormName) {
      setFormName(FormName);
      if (templates[FormName]) {
        setFields(templates[FormName]);
      }
    }
  }, []);

const publishForm = () => {
  const formTemplates = JSON.parse(localStorage.getItem("formTemplates") || "{}");
  const sharedForms = JSON.parse(localStorage.getItem("sharedForms") || "{}");

  // Save to named templates
  formTemplates[formName] = fields;
  localStorage.setItem("formTemplates", JSON.stringify(formTemplates));

  // Generate unique ID for shared form
  const shareId = Date.now().toString(36);
  sharedForms[shareId] = {name: formName,fields,};
  localStorage.setItem("sharedForms", JSON.stringify(sharedForms));

  const shareURL = `${window.location.origin}/form/${shareId}`;
  navigator.clipboard.writeText(shareURL);

  toast.success(`Form published!\nShareable Link copied to clipboard:\n${shareURL}`);
};
  return (
  <div className="flex flex-col md:flex-row w-full h-full">
    {/* Left: Form Canvas */}
    <div className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-50 dark:bg-gray-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 overflow-y-auto min-h-[300px] transition-colors">
      {/* Top Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{formName}</h2>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 dark:text-blue-400 uppercase tracking-wide font-medium hover:underline"
          >
            Cancel
          </button>
          <span className="hidden sm:inline w-px h-4 bg-gray-300 dark:bg-gray-600" />
          <button
            onClick={saveForm}
            className="text-blue-600 dark:text-blue-400 uppercase tracking-wide font-medium hover:underline"
          >
            Save
          </button>
          <button
            onClick={openPreview}
            className="flex items-center gap-1 px-4 py-1 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Preview <EyeIcon className="h-4 w-4" />
          </button>
          <button
            onClick={publishForm}
            className="flex items-center gap-1 px-4 py-1 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Publish <ArrowUpTrayIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Step Switcher */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        {steps.map((step) => (
          <button
            key={step}
            onClick={() => {
              setActiveStep(step);
              setSelectedField(null);
            }}
            className={`px-4 py-1 rounded border text-sm font-medium transition-colors ${
              activeStep === step
                ? "bg-blue-600 text-white font-semibold"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            }`}
          >
            Step {step}
          </button>
        ))}
        <button
          onClick={() => {
            const next = Math.max(...steps) + 1;
            setSteps([...steps, next]);
            setActiveStep(next);
            setSelectedField(null);
          }}
          className="px-3 py-1 text-sm rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
        >
          <PlusIcon className="h-4 w-4 inline-block mr-1" />
        </button>
        <button
          onClick={deleteStep}
          className="px-3 py-1 text-sm rounded bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
        >
          <MinusIcon className="h-4 w-4 inline-block mr-1" />
        </button>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropFromSidebar}
        className="min-h-[200px] p-4 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg transition-colors"
      >
        {fields.filter((f) => f.step === activeStep).length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            🚀 Drag and drop a field here to get started
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={fields.filter((f) => f.step === activeStep).map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {fields
                  .filter((f) => f.step === activeStep)
                  .map((field) => (
                    <DraggableField
                      key={field.id}
                      field={field}
                      id={field.id}
                      isSelected={selectedField?.id === field.id}
                      onClick={() => setSelectedField(field)}
                      onDelete={(id) => {
                        setFields(fields.filter((f) => f.id !== id));
                        if (selectedField?.id === id) setSelectedField(null);
                      }}
                    />
                  ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>

    {/* Right: Configuration Panel */}
    <div className="w-full md:w-[340px] bg-gray-100 dark:bg-gray-900 p-4 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 transition-colors">
      <h3 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-100">Edit Properties</h3>
      {selectedField ? (
        <FieldConfigPanel field={selectedField} onSave={updateField} />
      ) : (
        <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded text-sm text-gray-700 dark:text-gray-300">
          <strong>Note!</strong>
          <p className="mt-1">You need to select a field to edit properties.</p>
        </div>
      )}
    </div>

    {/* Slide-in Preview Drawer */}
    <div
      className={`fixed top-0 right-0 h-full z-50 bg-gray-100 dark:bg-gray-900 border-l dark:border-gray-700 shadow-lg transition-transform duration-500 ease-in-out ${
        showPreview ? "translate-x-0" : "translate-x-full"
      } w-full sm:w-[450px] md:w-[600px]`}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b bg-white dark:bg-gray-800">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Preview</h3>
        <div className="flex items-center gap-3">
          {/* Mode toggle */}
          <div className="flex gap-2">
            {["desktop", "tablet", "mobile"].map((mode) => {
              const Icon =
                mode === "desktop"
                  ? ComputerDesktopIcon
                  : mode === "tablet"
                  ? DeviceTabletIcon
                  : DevicePhoneMobileIcon;
              return (
                <button
                  key={mode}
                  onClick={() => setPreviewMode(mode)}
                  className={`p-2 rounded ${
                    previewMode === mode
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setShowPreview(false)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-64px)] overflow-y-auto p-6">
        <div className="flex justify-center">
          <div
            className={`rounded overflow-hidden shadow-md ${
              previewMode === "desktop"
                ? "w-full max-w-[600px]"
                : previewMode === "tablet"
                ? "w-[450px]"
                : "w-[320px]"
            }`}
          >
            <GrowformPreview fields={fields} />
          </div>
        </div>
      </div>
    </div>
  </div>
);


}

import { useEffect, useState } from "react";

export default function FieldConfigPanel({ field, onSave }) {
  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [required, setRequired] = useState(false);
  const [helpText, setHelpText] = useState("");
  const [options, setOptions] = useState([]);
  const [minLength, setMinLength] = useState("");
  const [maxLength, setMaxLength] = useState("");
  const [pattern, setPattern] = useState("");

  useEffect(() => {
    if (field) {
      setLabel(field.label || "");
      setPlaceholder(field.placeholder || "");
      setRequired(field.required || false);
      setHelpText(field.helpText || "");
      setOptions(field.options || []);
      setMinLength(field.minLength || "");
      setMaxLength(field.maxLength || "");
      setPattern(field.pattern || "");
    }
  }, [field]);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => setOptions([...options, "New Option"]);
  const removeOption = (index) => setOptions(options.filter((_, i) => i !== index));

  const handleSave = () => {
    onSave({
      ...field,
      label,
      placeholder,
      required,
      helpText,
      options,
      minLength,
      maxLength,
      pattern,
    });
  };

  return (
  <div className="space-y-4 text-sm">
    <div>
      <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Label:</label>
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>

    {["text", "textarea", "email", "number", "phone"].includes(field.type) && (
      <div>
        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Placeholder:</label>
        <input
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>
    )}

    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={required}
        onChange={(e) => setRequired(e.target.checked)}
      />
      <label className="text-gray-700 dark:text-gray-200">Required</label>
    </div>

    <div>
      <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Help Text:</label>
      <input
        value={helpText}
        onChange={(e) => setHelpText(e.target.value)}
        className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
      />
    </div>

    {(field.type === "dropdown" ||
      field.type === "checkbox" ||
      field.type === "radio") && (
      <div>
        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Options:</label>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="border p-1 flex-1 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
              />
              <button
                onClick={() => removeOption(i)}
                className="text-red-500 dark:text-red-400"
                title="Remove option"
                type="button"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addOption}
            className="text-blue-600 dark:text-blue-400 text-sm mt-1"
            type="button"
          >
            + Add Option
          </button>
        </div>
      </div>
    )}

    {["text", "textarea", "email", "number", "phone"].includes(field.type) && (
      <>
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Min Length:</label>
          <input
            type="number"
            value={minLength}
            onChange={(e) => setMinLength(e.target.value)}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Max Length:</label>
          <input
            type="number"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Pattern (RegEx):</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="e.g. ^\\d{10}$"
          />
        </div>
      </>
    )}

    <button
      onClick={handleSave}
      className="w-full py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-800"
      type="button"
    >
      Save Changes
    </button>
  </div>
);

}

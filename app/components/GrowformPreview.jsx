import { useState } from "react";
import toast from "react-hot-toast";

export default function GrowformPreview({ fields }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isWaiting, setIsWaiting] = useState(false);

  const steps = [...new Set(fields.map((f) => f.step || 1))].sort(
    (a, b) => a - b
  );
  const currentFields = fields.filter((f) => f.step === currentStep);

  const validate = () => {
    const newErrors = {};
    for (const field of currentFields) {
      const value = formData[field.id] || "";

      if (field.required && !value) {
        newErrors[field.id] = "This field is required.";
        continue;
      }

      if (field.minLength && value.length < Number(field.minLength)) {
        newErrors[field.id] = `Minimum ${field.minLength} characters.`;
        continue;
      }

      if (field.maxLength && value.length > Number(field.maxLength)) {
        newErrors[field.id] = `Maximum ${field.maxLength} characters.`;
        continue;
      }

      if (field.pattern) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(value)) {
          newErrors[field.id] = "Invalid format.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleNext = () => {
    if (!validate()) return;
    setIsWaiting(true);
    setTimeout(() => {
      setIsWaiting(false);
      setCurrentStep((prev) => prev + 1);
    }, 1000);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success("Form submitted!");
    }
  };

  const BUTTON_STYLE = "px-6 py-2 rounded text-white font-medium";
  const secondaryBtn = "bg-gray-400  hover:bg-gray-500";
  const primaryBtn = " bg-blue-600 text-white font-semibold hover:bg-blue-700";

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md text-center dark:shadow-lg dark:border dark:border-gray-700">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-6 gap-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                currentStep === step
                  ? "border-pink-600 text-pink-600 font-bold dark:border-pink-400 dark:text-pink-400"
                  : "border-blue-400 text-gray-400 dark:border-blue-300 dark:text-gray-500"
              }`}
            >
              {step}
            </div>
            {index !== steps.length - 1 && (
              <div className="w-10 h-[2px] bg-gray-300 dark:bg-gray-700" />
            )}
          </div>
        ))}
      </div>

      {/* If no fields */}
      {fields.length === 0 && (
        <p className="text-gray-500 text-sm py-8 font-medium dark:text-gray-400">
          You need to add Controls to see output here.
        </p>
      )}

      {/* Form */}
      {fields.length > 0 && (
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {isWaiting ? (
            <div className="text-center text-lg bg-yellow-100 py-3 rounded font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Please Wait
            </div>
          ) : (
            currentFields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {["text", "email", "number", "phone", "date"].includes(
                  field.type
                ) && (
                  <input
                    type={field.type === "phone" ? "tel" : field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 p-2 rounded w-full"
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    placeholder={field.placeholder}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 p-2 rounded w-full"
                  />
                )}

                {field.type === "dropdown" && (
                  <select
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 p-2 rounded w-full"
                  >
                    <option value="">Select an option</option>
                    {field.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "checkbox" &&
                  field.options.map((opt, i) => (
                    <label key={i} className="block dark:text-gray-200">
                      <input
                        type="checkbox"
                        checked={(formData[field.id] || []).includes(opt)}
                        onChange={(e) => {
                          const prev = formData[field.id] || [];
                          const newVal = e.target.checked
                            ? [...prev, opt]
                            : prev.filter((val) => val !== opt);
                          handleChange(field.id, newVal);
                        }}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}

                {field.type === "toggle" && (
                  <label className="flex items-center gap-2 py-2 cursor-pointer">
                    <span className="dark:text-gray-200">
                      {field.placeholder || "Toggle"}
                    </span>
                    <input
                      type="checkbox"
                      checked={!!formData[field.id]}
                      onChange={(e) => handleChange(field.id, e.target.checked)}
                      className="toggle-checkbox h-5 w-5 rounded bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </label>
                )}

                {field.type === "time" && (
                  <input
                    type="time"
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 p-2 rounded w-full"
                  />
                )}

                {field.type === "radio" &&
                  field.options.map((opt, i) => (
                    <label key={i} className="block dark:text-gray-200">
                      <input
                        type="radio"
                        name={field.id}
                        value={opt}
                        checked={formData[field.id] === opt}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}

                {field.type === "file" && (
                  <input
                    type="file"
                    onChange={(e) =>
                      handleChange(field.id, e.target.files?.[0])
                    }
                    className="border p-2 w-full rounded dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                )}

                {errors[field.id] && (
                  <p className="text-sm text-red-500 mt-1 dark:text-red-400">
                    {errors[field.id]}
                  </p>
                )}
              </div>
            ))
          )}

          {/* Navigation Buttons */}
          {!isWaiting && (
            <div className="flex justify-between pt-4">
              {currentStep > steps[0] ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className={`${BUTTON_STYLE} ${secondaryBtn} dark:bg-gray-700 dark:text-gray-100`}
                >
                  Back
                </button>
              ) : (
                <span />
              )}

              {currentStep < steps[steps.length - 1] ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className={`${BUTTON_STYLE} ${primaryBtn} dark:bg-pink-600 dark:text-white`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className={`${BUTTON_STYLE} ${primaryBtn} dark:bg-pink-600 dark:text-white`}
                >
                  Submit
                </button>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

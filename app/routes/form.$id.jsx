import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import GrowformPreview from "../components/GrowformPreview";

export default function SharedFormPage() {
  const { id } = useParams();
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("Loading...");

  useEffect(() => {
    const sharedForms = JSON.parse(localStorage.getItem("sharedForms") || "{}");
    const form = sharedForms[id];

    if (form) {
      setFields(form.fields || []);
      setFormName(form.name || "Untitled Form");
      localStorage.setItem("liveForm", JSON.stringify(form.fields || []));
    } else {
      setFormName("Form not found");
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-xl font-semibold mb-6 text-center">{formName}</h1>
        <GrowformPreview fields={fields} />
      </div>
    </div>
  );
}

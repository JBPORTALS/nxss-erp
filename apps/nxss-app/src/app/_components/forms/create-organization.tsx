"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { SessionData } from "~/utils/lib/session";
import ExamPatternStep from "./steps/exam-pattern";
import NameStep from "./steps/name";
import WelcomeStep from "./steps/welcome";

export default function CreateOrganizationForm() {
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();
  const params = useParams<{ "create-organization": string[] }>();
  const step = params["create-organization"]?.at(0) ?? "";

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    const res = await fetch("/api/session/org");
    const { formData } = await res.json();

    console.log("formData", formData);
    if (formData) {
      setFormData(formData.data);
      router.push(`/create-organization/${formData.step ?? ""}`);
    }
  };

  const updateSessionData = async (step: string, data: any) => {
    const newData = { ...formData, ...data };
    setFormData(newData);
    console.log(newData);
    await fetch("/api/session/org", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step, data: newData }),
    });
    router.push(`/create-organization/${step}`);
  };

  const resetSession = async () => {
    await fetch("/api/session/org", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  const renderStep = () => {
    switch (step) {
      case "":
        return (
          <NameStep
            onNext={(data: SessionData) =>
              updateSessionData("exam-pattern", data)
            }
            initialData={formData}
          />
        );
      case "exam-pattern":
        return (
          <ExamPatternStep
            onNext={(data: SessionData) => updateSessionData("welcome", data)}
            initialData={formData}
          />
        );
      case "welcome":
        return (
          <WelcomeStep data={formData} onNext={(data) => resetSession()} />
        );
      default:
        return null;
    }
  };

  return <div className="w-full max-w-sm">{renderStep()}</div>;
}

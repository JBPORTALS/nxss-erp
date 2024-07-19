

// StaffForm.tsx
import React, { useState } from "react";
import { MultiStepForm, Step } from "./multi-step-form"; // Adjust the import path
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import ImageUploader from "./image-placeholder";

const StaffForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmitStep1 = () => {
    setCurrentStep(2);
  };

  const handleSubmitStep2 = () => {
    // Final submission logic here
  };

  return (
    <MultiStepForm>
      <Step variant={currentStep > 1 ? "completed" : "inProcess"}>
        <h1 className="text-2xl font-semibold">Add Staff Details</h1>
        <span>Submit Your Staff Details to collaborate with the institution</span>
        <Label>Name</Label>
        <Input placeholder="Acme" />
        <Label>Institution Staff Id</Label>
        <Input placeholder="465UA123" />
        <span>Upload Your Staff ID for verification</span>
        <ImageUploader />
        <Button onClick={handleSubmitStep1} disabled={currentStep !== 1}>
          Submit
        </Button>
      </Step>
    </MultiStepForm>
  );
};

export default StaffForm;
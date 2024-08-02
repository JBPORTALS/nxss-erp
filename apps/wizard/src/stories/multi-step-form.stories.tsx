import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "@nxss/ui/button";
import ImageUploader from "@nxss/ui/image-placeholder";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { MultiStepForm, Step } from "@nxss/ui/multi-step-form";
import StaffForm from "@nxss/ui/multi-step-formdemo";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Multi Step Form",

  component: () => <StaffForm />,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   variant: "default"
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof StaffForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  render: () => (
    <MultiStepForm>
      <Step>
        <h1 className="text-2xl font-semibold">Add Staff Details</h1>
        <span>
          Submit Your Staff Details to collaborate with the institution
        </span>
        <Label>Name</Label>
        <Input placeholder="Acme" />
        <Label>Institution Staff Id</Label>
        <Input placeholder="465UA123" />
        <Button>Submit</Button>
      </Step>

      <Step>
        <h1 className="text-2xl font-semibold">Upload Staff ID</h1>
        <span>Upload Your Staff ID for verification</span>
        <ImageUploader />
        <Button>Submit</Button>
      </Step>
    </MultiStepForm>
  ),
};

export const Basic: Story = {
  args: {},
  render: () => <StaffForm />,
};

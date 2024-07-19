import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { Step, MultiStepForm } from "@nxss/ui/multi-step-form";
import ImageUploader from "@nxss/ui/image-placeholder";
import { Button } from "@nxss/ui/button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Multi Step Form",
  component: () => (
    <MultiStepForm >
      <Step variant={"completed"}>
        <h1 className="text-2xl font-semibold">Add Staff Details</h1>
        <span>
          Submit Your Staff Details to collaborate with the institution
        </span>
        <Label>Name</Label>
        <Input placeholder="Acme" />
        <Label>Institution Staff Id</Label>
        <Input placeholder="465UA123" />
      </Step>

      <Step>
        <h1 className="text-2xl font-semibold">Upload Staff ID</h1>
        <span>Upload Your Staff ID for verification</span>
        <ImageUploader />
        <Button className="w-40">Submit</Button>
      </Step>
    </MultiStepForm>
  ),
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
} satisfies Meta<typeof MultiStepForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};

import { Meta, StoryObj } from "@storybook/react";
import ImageUploader from "@nxss/ui/image-placeholder";

const meta: Meta<typeof ImageUploader> = {
  title: "UI/Image Placeholder",
  component: ImageUploader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageUploader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return <ImageUploader />;
  },
};

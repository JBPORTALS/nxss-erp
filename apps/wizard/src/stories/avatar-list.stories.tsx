import React from "react";

import AvatarList, { AvatarListProps } from "@nxss/ui/avatar-list";

export default {
  title: "AvatarList",
  component: AvatarList,
  argTypes: {
    images: {
      control: {
        type: "array",
      },
      description: "Array of image URLs for avatars",
    },
    maxAvatars: {
      control: {
        type: "number",
        min: 1,
        max: 10,
        step: 1,
      },
      description: "Maximum number of avatars to display",
      defaultValue: 3,
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"], // Options for size
      },
      description: "Size of avatars",
      defaultValue: "medium",
    },
  },
};

const Template = (args: AvatarListProps) => (
  <div className="p-4">
    <AvatarList {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  images: [
    "https://avatars2.githubusercontent.com/u/263385",
    "https://avatars2.githubusercontent.com/u/132554",
    "https://avatars0.githubusercontent.com/u/81672",
    "https://avatars3.githubusercontent.com/u/1831709",
  ],
  maxAvatars: 3,
};

export const Default = () => (
  <div className="p-4">
    <AvatarList
      images={[
        "https://avatars2.githubusercontent.com/u/263385",
        "https://avatars2.githubusercontent.com/u/132554",
      ]}
      maxAvatars={1}
      size="large"
    />
  </div>
);
// Example Storybook setup for @nxss/ui/text components

import { Meta, StoryObj } from "@storybook/react";

import {
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  List,
  Muted,
  P,
  Small,
  TableHead,
  TableItem,
} from "@nxss/ui/text";

const meta: Meta = {
  title: "Text Components",
  component: H1,
  argTypes: {
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const H1Story: Story = (args: any) => <H1 {...args} />;
H1Story.args = {
  children: "Heading 1",
};

export const H2Story: Story = (args: any) => <H2 {...args} />;
H2Story.args = {
  children: "Heading 2",
};

export const H3Story: Story = (args: any) => <H3 {...args} />;
H3Story.args = {
  children: "Heading 3",
};

export const H4Story: Story = (args: any) => <H4 {...args} />;
H4Story.args = {
  children: "Heading 4",
};

export const InlineCodeStory: Story = (args: any) => <InlineCode {...args} />;
InlineCodeStory.args = {
  children: "Inline Code",
};

export const LargeStory: Story = (args: any) => <Large {...args} />;
LargeStory.args = {
  children: "Large Text",
};

export const LeadStory: Story = (args: any) => <Lead {...args} />;
LeadStory.args = {
  children: "Lead Text",
};

export const ListStory: Story = (args: any) => <List {...args} />;
ListStory.args = {
  children: (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </>
  ),
};

export const MutedStory: Story = (args: any) => <Muted {...args} />;
MutedStory.args = {
  children: "Muted Text",
};

export const PStory: Story = (args: any) => <P {...args} />;
PStory.args = {
  children: "Paragraph Text",
};

export const SmallStory: Story = (args: any) => <Small {...args} />;
SmallStory.args = {
  children: "Small Text",
};

export const TableHeadStory: Story = (args: any) => <TableHead {...args} />;
TableHeadStory.args = {
  children: "Table Head",
};

export const TableItemStory: Story = (args: any) => <TableItem {...args} />;
TableItemStory.args = {
  children: "Table Item",
};

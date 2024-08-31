import { Meta, StoryObj } from "@storybook/react";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@nxss/ui/dialog";
import { Label } from "@nxss/ui/label";
import { Button } from "@nxss/ui/button";
import { Dialog } from "@nxss/ui/dialog";
import { SlidersHorizontal ,Check} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@nxss/ui/select";
import { Checkbox } from "@nxss/ui/checkbox";
import { DatePickerWithPresets } from "@nxss/ui/date-range-picker";

const meta: Meta<typeof Dialog> = {
  title: "UI/Attendance filter",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-lg">Filters <SlidersHorizontal /></Button>
        </DialogTrigger>
        <DialogContent >
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Filters
              <Button variant="ghost" size="icon">
              </Button>
            </DialogTitle>
            <DialogDescription>
              View the students attendance data with specific filters
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-4">
              <Label htmlFor="subject" className="text-lg font-semibold">Subject</Label>
              <Select>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {/* Add other subject options here */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4">
              <Label className="text-lg font-semibold">Date Range</Label>
              <div className="w-full">
                <DatePickerWithPresets />
              </div>
            </div>
            <div className="grid gap-4">
              <Label className="text-lg font-semibold">Attendance Percentage</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="less-than-50" />
                  <label htmlFor="less-than-50">Less than 50%</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="less-than-75" />
                  <label htmlFor="less-than-75">Less than 75%</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="less-than-50-to-75" />
                  <label htmlFor="less-than-50-to-75">Less than 50% to 75%</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-fit">
              Apply<Check className="text-primary-foreground size-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
import { Meta, StoryObj } from "@storybook/react";
import { DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger } from "@nxss/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@nxss/ui/card";
import { Label } from "@nxss/ui/label";
import { Input } from "@nxss/ui/input";
import { Button } from "@nxss/ui/button";
import { Dialog } from "@nxss/ui/dialog";
import {Settings2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@nxss/ui/select";
import { Checkbox } from "@nxss/ui/checkbox";

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
                  <Button variant="outline">Filters</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex justify-between items-center">
                      Filters
                      <Button variant="ghost" size="icon">
                      </Button>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
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
                    <div className="grid gap-2">
                      <Label>Date Range</Label>
                      
                    </div>
                    <div className="grid gap-2">
                      <Label>Attendance Percentage</Label>
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
                  <Button className="w-full">
                    Apply 
                  </Button>
                </DialogContent>
              </Dialog>
            );
          }
    
  }



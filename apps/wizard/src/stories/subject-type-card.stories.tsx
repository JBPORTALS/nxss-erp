import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { HStack, VStack } from "@nxss/ui/stack";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@nxss/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@nxss/ui/dialog";

const meta: Meta = {
  title: "Admin/Subject Type Card",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const handleChange = (selectedIndex: number | null) => {
  console.log("Selected index:", selectedIndex);
};

export const Multiple: Story = {
  args: {},
  render: () => {
    return (
      <div className="relative flex h-[851px] w-screen border">
        <div className="h-full w-1/2 border-r">
          <img
            src="/Diamond-up-hat.png"
            className="absolute left-0 top-0 -z-10"
          />
          <div className="flex h-full items-center justify-center">
            <img src="/rocket.png" className="h-20 w-20 " />
          </div>
          <img
            src="/Diamond-down-hat.png"
            className="absolute bottom-0 right-1/2 -z-10"
          />
        </div>
        <VStack className="h-full w-1/2 items-center justify-center gap-8">
          <VStack className="items-center">
            <VStack className="w-full gap-10 p-10">
              <VStack className="w-full gap-8" >
                <Card className="w-full ">
                  <CardHeader>
                    <CardTitle>Theory</CardTitle>

                  </CardHeader>
                  <CardContent className="space-y-5 w-full flex flex-col  items-center gap-10">
                    <span className="w-4/5 ">
                      No test types have been added yet. Please click the 'Add Test' button below to add a new test type.</span>
                    <Dialog >
                      <DialogTrigger asChild className="w-full">
                        <Button variant={"outline"} className="w-full">+ Add Test Type</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add Test Type</DialogTitle>
                          <DialogDescription>
                            Adding the new subject type
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="testType">Test Type</Label>
                            <Input
                              id="testType"
                              placeholder="Enter..."
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="noOfTests">No. of Tests</Label>
                            <Input
                              id="noOfTests"
                              placeholder="Enter.."
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="passingMarks">Passing marks</Label>
                              <Input
                                id="passingMarks"
                                placeholder="Enter..."
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="maximumMarks">Maximum marks</Label>
                              <Input
                                id="maximumMarks"
                                placeholder="Enter..."
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter className="sm:justify-end">
                          <Button variant="outline">Cancel</Button>
                          <Button>Save</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card className="w-full ">
                  <CardHeader>
                    <CardTitle>Practical</CardTitle>

                  </CardHeader>
                  <CardContent className="space-y-5 w-full flex flex-col  items-center gap-10">
                    <span className="w-4/5 ">
                      No test types have been added yet. Please click the 'Add Test' button below to add a new test type.</span>
                    <Button variant={"outline"} className="w-full">+ Add Test Type</Button>


                  </CardContent>
                </Card>
              </VStack>
            </VStack>
          </VStack>
          <VStack className="w-[400px] gap-7 text-sm">


            <HStack className="w-full justify-between gap-6 ">
              <Button className="w-full" variant={"outline"}>
                Back
              </Button>
              <Button className="w-full">Next</Button>
            </HStack>
          </VStack>
        </VStack>
      </div>
    );
  },
};

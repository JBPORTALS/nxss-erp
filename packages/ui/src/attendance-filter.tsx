import React from 'react'
import { Button } from './button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog'
import { HStack, VStack } from './stack'
import { Label } from './label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { DatePickerWithPresets } from './date-range-picker'
import { Checkbox } from './checkbox'
import { Check, SlidersHorizontal } from 'lucide-react'

export default function AttendanceFilter() {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="text-lg">Filters <SlidersHorizontal /></Button>
    </DialogTrigger>
    <DialogContent>
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
      < VStack className=" w-full  py-4">
        <VStack className="w-full">
          <Label htmlFor="subject" className="text-sm">Subject</Label>
          <Select>
            <SelectTrigger id="subject">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add other subject options here */}
            </SelectContent>
          </Select>
        </VStack>
        <VStack className="w-full">
          <Label className="text-sm">Date Range</Label>
          <DatePickerWithPresets />

        </VStack>
        <VStack>
          <Label className="text-sm">Attendance Percentage</Label>
          <HStack>
            <Checkbox id="less-than-50" />
            <Label>Less than 50%</Label>
          </HStack>
          <HStack>
            <Checkbox id="less-than-75" />
            <Label >Less than 75%</Label>
          </HStack>
          <HStack>
            <Checkbox id="less-than-50-to-75" />
            <Label >Less than 50% to 75%</Label>
          </HStack>
        </VStack>
      </VStack>

      <DialogFooter>
        <Button className="w-fit">
          Apply<Check className="text-primary-foreground size-2" />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

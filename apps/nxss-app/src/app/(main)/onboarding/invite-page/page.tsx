import { Button } from '@nxss/ui/button'
import { Label } from '@nxss/ui/label'
import { HStack, VStack } from '@nxss/ui/stack'
import { Textarea } from '@nxss/ui/textarea'
import React from 'react'

export default function page() {
  return (
    <VStack className="h-full w-1/2 items-center justify-center gap-8">
    <VStack className="items-center">
      <span className="text-3xl font-semibold">Invite faculty</span>
      <span className="text-muted-foreground">To Partnering for Academic Excellence</span>
    </VStack>
    <VStack className="w-[400px] gap-7 text-sm">
      <VStack className="w-full">
        <Label>Emails</Label>
        <Textarea
          placeholder="Invite faculty by their names or emails"
          rows={3}
          required
          className="w-full rounded-lg border text-lg"
        />
      </VStack>
      <HStack className="w-full justify-between gap-6">
        <Button className="w-full" variant={"outline"}>
          Skip
        </Button>
        <Button className="w-full">Invite</Button>
      </HStack>
    </VStack>
  </VStack>
  )
}

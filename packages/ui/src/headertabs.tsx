import React from 'react'
import { HStack } from './stack'
import BranchNavItem from './branch-navitem'


export default function Headertabs() {
    return (
        <div className='border-b-2 border-gray-100'>
        <HStack className='w-full gap-0 px-10 -mb-0.5 overflow-x-auto '>
            <BranchNavItem isActive >Overview</BranchNavItem>
            <BranchNavItem >Subjects</BranchNavItem>
            <BranchNavItem >Sessions</BranchNavItem>
            <BranchNavItem >Setting</BranchNavItem>
        </HStack>
        </div>
    )
}

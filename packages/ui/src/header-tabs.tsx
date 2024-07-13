import React from 'react'
import  {  Tabs,TabList } from './tabs'


export function Headertabs() {
    return (
        <Tabs>
            <TabList isActive >Overview</TabList>
            <TabList >Subjects</TabList>
            <TabList >Sessions</TabList>
            <TabList >Setting</TabList>
        </Tabs>
    )
}

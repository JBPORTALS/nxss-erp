import React from 'react'
import  TabList, { Tab, Tabs } from './tabs'


export default function Headertabs() {
    return (
        <Tab>
        <Tabs>
            <TabList isActive >Overview</TabList>
            <TabList >Subjects</TabList>
            <TabList >Sessions</TabList>
            <TabList >Setting</TabList>
        </Tabs>
        </Tab>
    )
}

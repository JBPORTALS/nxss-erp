import React from 'react'
import  {  Tabs,TabItem } from './tabs'


export function Headertabs() {
    return (
        <Tabs>
            <TabItem isActive >Overview</TabItem>
            <TabItem >Subjects</TabItem>
            <TabItem >Sessions</TabItem>
            <TabItem >Setting</TabItem>
        </Tabs>
    )
}

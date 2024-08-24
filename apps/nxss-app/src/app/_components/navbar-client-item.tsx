"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@nxss/ui/select'
import { SlashIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'


export default function NavbarItems() {
    const path = usePathname();
    const pathParts = path.split('/');
    const org = pathParts[1];
    const branch_id = pathParts[3];

    if (path.startsWith(`/${org}/branch/${branch_id}`)) {
        return (
        <div className='flex items-center'>
        
            <SlashIcon className="size-4 text-muted-foreground/40" />
        <Select value="Computer Science">
          <SelectTrigger
            className={
              "w-fit border-none px-2 font-semibold shadow-none outline-none hover:bg-accent"
            }
          >
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent className="p-2 text-base">
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem  value="Civil">Civil</SelectItem>
            <SelectItem value="Mechanical">Mechanical </SelectItem>
          </SelectContent>
        </Select>
    
    
        <SlashIcon className="size-4 text-muted-foreground/40" />
        <Select value="Semester 1">
          <SelectTrigger
            className={
              "w-fit border-none px-2 font-semibold shadow-none outline-none hover:bg-accent"
            }
          >
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent className="p-2 text-base">
            <SelectItem value="Semester 1">Semester 1</SelectItem>
            <SelectItem value="Semester 2">Semester 2</SelectItem>
            <SelectItem value="Semester 3">Semester 3</SelectItem>
          </SelectContent>
        </Select></div>)
    }
    else
  return null
    }

"use client"

import {LucideIcon} from "lucide-react";
import {IconType} from "react-icons";
import {Button} from "@/components/ui";
import {cn} from "@/lib";

interface ISidebarButtonProps {
    icon: LucideIcon | IconType
    label: string
    isActive?: boolean
}

export const SidebarButton = ({icon, isActive, label}:ISidebarButtonProps) => {
    const Icon = icon
    return <div className={'flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group'}>
        <Button variant={'transparent'} className={cn('size-9 p-2 group-hover:bg-accent/20', isActive && 'bg-accent/20')}>
            <Icon className={'size-5 text-white group-hover:scale-110 transition-all'} />
        </Button>
        <span className={'text-[11px] text-white group-hover:text-accent'}>{label}</span>
    </div>
}
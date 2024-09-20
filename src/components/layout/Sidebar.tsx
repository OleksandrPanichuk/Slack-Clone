'use client'

import { UserButton } from '@/features/auth/components'
import {SidebarButton, WorkspaceSwitcher} from '@/components/layout'
import {BellIcon, HomeIcon, MessageSquareIcon, MoreHorizontalIcon} from "lucide-react";
import {usePathname} from "next/navigation";

export const Sidebar = () => {
	const pathname = usePathname()
	return (
		<aside
			className={
				'w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4'
			}
		>
			<WorkspaceSwitcher />
			<SidebarButton icon={HomeIcon} label={'Home'} isActive={pathname.includes('/workspace')}/>
			<SidebarButton icon={MessageSquareIcon} label={'DMs'} />
			<SidebarButton icon={BellIcon} label={'Activity'}/>
			<SidebarButton icon={MoreHorizontalIcon} label={'More'} />
			<div
				className={'flex flex-col items-center justify-center gap-y-1 mt-auto'}
			>
				<UserButton />
			</div>
		</aside>
	)
}

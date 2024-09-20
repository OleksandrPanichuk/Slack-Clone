'use client'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui'
import { useGetWorkspace, useGetWorkspaces } from '@/features/workspaces/api'
import { useCreateWorkspaceModal } from '@/features/workspaces/store'
import { useWorkspaceId } from '@/hooks'
import { Loader2, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const WorkspaceSwitcher = () => {
	const router = useRouter()
	const workspaceId = useWorkspaceId()
	const [_, setOpen] = useCreateWorkspaceModal()

	const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
		id: workspaceId
	})
	const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces()

	const filteredWorkspaces = workspaces?.filter(
		(workspace) => workspace?._id !== workspaceId
	)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className={
						'size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl'
					}
				>
					{workspaceLoading ? (
						<Loader2 className={'size-5 animate-spin shrink-0'} />
					) : (
						workspace?.name.charAt(0).toUpperCase()
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side={'bottom'} align={'start'} className={'w-64'}>
				<DropdownMenuItem
					onClick={() => router.push(`/workspace/${workspaceId}`)}
					className={
						'cursor-pointer flex-col items-start justify-start capitalize'
					}
				>
					{workspace?.name}
					<span className={'text-xs text-muted-foreground'}>
						Active workspace
					</span>
				</DropdownMenuItem>
				{filteredWorkspaces?.map((workspace) => (
					<DropdownMenuItem
						key={workspace._id}
						className={'cursor-pointer capitalize overflow-hidden'}
						onClick={() => router.push(`/workspace/${workspace._id}`)}
					>
						<div
							className={
								'size-9 shrink-0 relative overflow-hidden bg-[#616061] text-white  font-semibold text-xl rounded-md flex items-center justify-center mr-2'
							}
						>
							{workspace.name.charAt(0).toUpperCase()}
						</div>
						<p className={'truncate'}>{workspace.name}</p>
					</DropdownMenuItem>
				))}
				<DropdownMenuItem
					className={'cursor-pointer'}
					onClick={() => setOpen(true)}
				>
					<div
						className={
							'size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2'
						}
					>
						<PlusIcon />
					</div>
					Create a new workspace
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

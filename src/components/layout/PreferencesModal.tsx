'use client'

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input
} from '@/components/ui'
import {
	useDeleteWorkspace,
	useUpdateWorkspace
} from '@/features/workspaces/api'
import { useConfirm, useWorkspaceId } from '@/hooks'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface IPreferencesModalProps {
	open: boolean
	setOpen: (open: boolean) => void
	initialValue: string
}

export const PreferencesModal = ({
	initialValue,
	open,
	setOpen
}: IPreferencesModalProps) => {
	const [value, setValue] = useState(initialValue)
	const [editOpen, setEditOpen] = useState(false)

	const router = useRouter()
	const [ConfirmModal, confirm] = useConfirm()

	const workspaceId = useWorkspaceId()

	const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
		useUpdateWorkspace()
	const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
		useDeleteWorkspace()

	const handleEdit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		updateWorkspace(
			{
				id: workspaceId,
				name: value
			},
			{
				onSuccess: () => {
					toast.success('Workspace updated')
					setEditOpen(false)
				},
				onError: () => {
					toast.error('Failed to update workspace')
				}
			}
		)
	}

	const handleDelete = async () => {
		const ok = await confirm()
		if (ok) {
			deleteWorkspace(
				{
					id: workspaceId
				},
				{
					onSuccess: () => {
						toast.success('Workspace deleted')
						router.replace('/')
					},
					onError: () => {
						toast.error('Failed to delete workspace')
					}
				}
			)
		}
	}

	return (
		<>
			<ConfirmModal />
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="p-0 bg-gray-50 overflow-hidden">
					<DialogHeader className="p-4 border-b border-white">
						<DialogTitle>{value}</DialogTitle>
					</DialogHeader>
					<div className="px-4 pb-4 flex flex-col gap-y-2">
						<div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 ">
							<Dialog open={editOpen} onOpenChange={setEditOpen}>
								<DialogTrigger asChild>
									<div className="flex items-center justify-between">
										<p className="text-sm font-semibold">Workspace name</p>
										<p className="text-sm text-[#1264a3] hover:underline font-semibold">
											Edit
										</p>
									</div>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Rename this workspace</DialogTitle>
									</DialogHeader>
									<form className="space-y-4" onSubmit={handleEdit}>
										<Input
											value={value}
											onChange={(e) => setValue(e.target.value)}
											placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
											disabled={isUpdatingWorkspace}
											minLength={3}
											maxLength={80}
											required
											autoFocus
										/>
										<DialogFooter>
											<DialogClose asChild>
												<Button
													type="button"
													variant="outline"
													disabled={isUpdatingWorkspace}
												>
													Cancel
												</Button>
											</DialogClose>
											<Button disabled={isUpdatingWorkspace} type="submit">
												Save
											</Button>
										</DialogFooter>
									</form>
								</DialogContent>
							</Dialog>
							<p className="text-sm">{value}</p>
						</div>
						<button
							className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
							disabled={isDeletingWorkspace}
							onClick={handleDelete}
						>
							<TrashIcon className="size-4" />
							<p className="text-sm font-semibold">Delete workspace</p>
						</button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

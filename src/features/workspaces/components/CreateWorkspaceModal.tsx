'use client'

import { useCreateWorkspaceModal } from '@/features/workspaces/store'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Input
} from '@/components/ui'
import { useCreateWorkspace } from '@/features/workspaces/api'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const CreateWorkspaceModal = () => {
	const [open, setOpen] = useCreateWorkspaceModal()

	const [name, setName] = useState('')
	const router = useRouter()

	const { mutate, isPending } = useCreateWorkspace()

	const handleClose = () => {
		setOpen(false)
		setName('')
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		mutate(
			{
				name
			},
			{
				onSuccess: (data) => {
					toast.success('Workspace created')
					handleClose()
					router.push(`/workspace/${data}`)
				}
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a workspace</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className={'space-y-4'}>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						minLength={3}
						placeholder={"Workspace name e.g. 'Work', 'Personal', 'Home'"}
						disabled={isPending}
						required
						autoFocus
					/>
					<div className={'flex justify-end'}>
						<Button disabled={isPending}>Create</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}

'use client'
import { useGetWorkspaces } from '@/features/workspaces/api'
import { useCreateWorkspaceModal } from '@/features/workspaces/store'
import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
	const { data, isLoading } = useGetWorkspaces()
	const [open, setOpen] = useCreateWorkspaceModal()
	const workspaceId = useMemo(() => data?.[0]?._id, [data])
	const router = useRouter()

	useEffect(() => {
		if (isLoading) {
			return
		}

		if (workspaceId) {
			router.replace(`/workspace/${workspaceId}`)
		} else if (!open) {
			setOpen(true)
		}
	}, [isLoading, workspaceId, open, setOpen])

	return <></>
}

'use client'

import { useEffect, useState } from 'react'

import { CreateChannelModal } from '@/features/channels/components'
import { CreateWorkspaceModal } from '@/features/workspaces/components'
export const ModalsProvider = () => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<>
			<CreateChannelModal />
			<CreateWorkspaceModal />
		</>
	)
}

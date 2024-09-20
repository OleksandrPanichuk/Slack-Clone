'use client'

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui'
import { useAuthActions } from '@convex-dev/auth/react'
import { useCurrentUser } from '@/features/auth/api'
import { Loader2, LogOutIcon } from 'lucide-react'

export const UserButton = () => {
	const { signOut } = useAuthActions()
	const { data, isLoading } = useCurrentUser()

	if (isLoading) {
		return <Loader2 className={'animate-spin size-10 text-muted-foreground'} />
	}

	if (!data) {
		return null
	}

	const { name, image } = data

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className={'outline-none relative'}>
				<Avatar className={'size-10 hover:opacity-75 transition'}>
					<AvatarImage src={image} alt={name} />
					<AvatarFallback className={'bg-sky-500 text-white'}>
						{name!.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align={'center'} side={'right'} className={'w-60'}>
				<DropdownMenuItem onClick={signOut} className={'cursor-pointer'}>
					<LogOutIcon className={'size-4 mr-2'} />
					Log Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

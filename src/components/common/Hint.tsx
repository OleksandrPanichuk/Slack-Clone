'use client'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui'
import { PropsWithChildren } from 'react'

interface IHintProps {
	label: string
	delay?: number
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'end' | 'center'
}

export const Hint = ({
	children,
	label,
	delay = 50,
	side = 'top',
	align = 'center'
}: PropsWithChildren<IHintProps>) => {
	return (
		<TooltipProvider delayDuration={delay}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					align={align}
					side={side}
					className={'bg-black text-white border border-white/5'}
				>
					<p className="font-medium text-xs">{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

'use client'
import { useState } from 'react'
import { SignInFlow } from '@/features/auth/types'
import { SignInCard } from '@/features/auth/components/SignInCard'
import { SignUpCard } from '@/features/auth/components/SignUpCard'

export const AuthScreen = () => {
	const [state, setState] = useState<SignInFlow>(SignInFlow.SIGN_IN)
	return (
		<div className={'h-full flex items-center justify-center bg-[#5C3B58]'}>
			<div className={'md:h-auto md:w-[420px]'}>
				{state === SignInFlow.SIGN_IN ? (
					<SignInCard setState={setState} />
				) : (
					<SignUpCard setState={setState} />
				)}
			</div>
		</div>
	)
}

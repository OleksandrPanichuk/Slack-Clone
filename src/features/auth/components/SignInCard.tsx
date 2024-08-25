'use client'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Separator
} from '@/components/ui'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { SignInFlow } from '@/features/auth/types'
import { FormEvent, useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { TriangleAlert } from 'lucide-react'

interface ISignInCardProps {
	setState: (state: SignInFlow) => void
}

export const SignInCard = ({ setState }: ISignInCardProps) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { signIn } = useAuthActions()
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState('')

	const onPasswordSignIn = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsPending(true)

		signIn('password', {
			email,
			password,
			flow: SignInFlow.SIGN_IN
		})
			.catch(() => {
				setError('Invalid email or password')
			})
			.finally(() => {
				setIsPending(false)
			})
	}

	const onProviderSignIn = (provider: 'github' | 'google') => {
		setIsPending(true)
		signIn(provider).finally(() => {
			setIsPending(false)
		})
	}

	return (
		<Card className={'w-full h-full p-8'}>
			<CardHeader className={'px-0 pt-0'}>
				<CardTitle>Login to continue</CardTitle>
				<CardDescription>
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>
			{!!error && (
				<div
					className={
						'bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'
					}
				>
					<TriangleAlert className={'size-4 '} />
					<p>{error}</p>
				</div>
			)}
			<CardContent className={'space-y-5 px-0 pb-0'}>
				<form onSubmit={onPasswordSignIn} className={'space-y-2.5'}>
					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder={'Email'}
						type={'email'}
						disabled={isPending}
						required
					/>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder={'Password'}
						type={'password'}
						disabled={isPending}
						required
					/>
					<Button
						disabled={isPending}
						type={'submit'}
						className={'w-full'}
						size={'lg'}
					>
						Continue
					</Button>
				</form>
				<Separator />
				<div className={'flex flex-col gap-2.5'}>
					<Button
						onClick={() => onProviderSignIn('google')}
						variant={'outline'}
						size={'lg'}
						className={'w-full relative'}
						disabled={isPending}
					>
						<FcGoogle
							className={
								'size-5 absolute top-[50%] translate-y-[-50%] left-2.5'
							}
						/>
						Continue with Google
					</Button>
					<Button
						onClick={() => onProviderSignIn('github')}
						variant={'outline'}
						size={'lg'}
						disabled={isPending}
						className={'w-full relative'}
					>
						<FaGithub
							className={
								'size-5 absolute top-[50%] translate-y-[-50%] left-2.5'
							}
						/>
						Continue with Github
					</Button>
				</div>
				<p className={'text-xs text-muted-foreground text-center'}>
					Don&apos;t have an account?{' '}
					<span
						className={'text-sky-700 hover:underline cursor-pointer'}
						onClick={() => setState(SignInFlow.SIGN_UP)}
					>
						Sign Up
					</span>
				</p>
			</CardContent>
		</Card>
	)
}

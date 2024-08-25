'use client'
import { SignInFlow } from '@/features/auth/types'
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
import { FormEvent, useState } from 'react'
import { useAuthActions } from '@convex-dev/auth/react'
import { TriangleAlert } from 'lucide-react'

interface ISignUpCardProps {
	setState: (state: SignInFlow) => void
}

export const SignUpCard = ({ setState }: ISignUpCardProps) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const { signIn } = useAuthActions()
	const [isPending, setIsPending] = useState(false)

	const [error, setError] = useState('')

	const onPasswordSignUp = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setError('Passwords do not match')
			return
		}
		setIsPending(true)

		signIn('password', {
			email,
			password,
			name,
			flow: SignInFlow.SIGN_UP
		})
			.catch(() => {
				setError('Something went wrong')
			})
			.finally(() => {
				setIsPending(false)
			})
	}

	const onProviderSignUp = (provider: 'github' | 'google') => {
		setIsPending(true)
		signIn(provider).finally(() => {
			setIsPending(false)
		})
	}

	return (
		<Card className={'w-full h-full p-8'}>
			<CardHeader className={'px-0 pt-0'}>
				<CardTitle>Sign up to continue</CardTitle>
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
				<form onSubmit={onPasswordSignUp} className={'space-y-2.5'}>
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder={'Name'}
						disabled={isPending}
						required
					/>
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
					<Input
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder={'Confirm password'}
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
						onClick={() => onProviderSignUp('google')}
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
						onClick={() => onProviderSignUp('github')}
						variant={'outline'}
						size={'lg'}
						className={'w-full relative'}
						disabled={isPending}
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
					Already have an account?{' '}
					<span
						className={'text-sky-700 hover:underline cursor-pointer'}
						onClick={() => setState(SignInFlow.SIGN_IN)}
					>
						Sign In
					</span>
				</p>
			</CardContent>
		</Card>
	)
}

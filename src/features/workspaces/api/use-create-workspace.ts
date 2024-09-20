'use client'

import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useCallback, useMemo, useState } from 'react'
import { Id } from '@convex/_generated/dataModel'

type Options = {
	onSuccess?: (response: ResponseType) => void
	onError?: (error: Error) => void
	onSettled?: () => void
	throwError?: boolean
}

type RequestType = {
	name: string
}

type ResponseType = Id<'workspaces'> | null

export const useCreateWorkspace = () => {
	const mutation = useMutation(api.workspaces.create)
	const [error, setError] = useState<Error | null>(null)
	const [data, setData] = useState<ResponseType>(null)
	const [status, setStatus] = useState<
		'success' | 'error' | 'settled' | 'pending' | null
	>(null)

	const isPending = useMemo(() => status === 'pending', [status])
	const isSuccess = useMemo(() => status === 'success', [status])
	const isError = useMemo(() => status === 'error', [status])
	const isSettled = useMemo(() => status === 'settled', [status])

	const mutate = useCallback(
		async (values: RequestType, options?: Options) => {
			setData(null)
			setError(null)
			setStatus('pending')

			try {
				const response = await mutation(values)
				options?.onSuccess?.(response)
				setStatus('success')
				setData(response)
				return response
			} catch (error) {
				options?.onError?.(error as Error)
				setError(error as Error)
				setStatus('error')

				if (options?.throwError) {
					throw error
				}
			} finally {
				options?.onSettled?.()
				setStatus('settled')
			}
		},
		[mutation]
	)

	return { mutate, isPending, isSuccess, isSettled, isError, data, error }
}

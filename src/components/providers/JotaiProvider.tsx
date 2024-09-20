'use client'

import { Provider } from 'jotai'
import { PropsWithChildren } from 'react'

export const JotaiProvider = ({ children }: PropsWithChildren) => {
	return <Provider>{children}</Provider>
}

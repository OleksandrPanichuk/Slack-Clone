import { query } from './_generated/server'
import { auth } from '@convex/auth'

export const current = query({
	args: {},
	handler: async (ctx) => {
		const userId = await auth.getUserId(ctx)

		if (userId === null) {
			return null
		}

		return ctx.db.get(userId)
	}
})

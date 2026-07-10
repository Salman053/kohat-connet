import { headers } from 'next/headers'

export async function getAuthUser() {
  const hdrs = await headers()
  const userId = hdrs.get('x-user-id')
  if (!userId) return null

  return {
    id: userId,
    email: hdrs.get('x-user-email') ?? '',
    role: hdrs.get('x-user-role') ?? 'user',
    full_name: hdrs.get('x-user-name') ?? null,
    business_name: hdrs.get('x-user-business-name') ?? null,
  }
}

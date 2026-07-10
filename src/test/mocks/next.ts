import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null),
    getAll: vi.fn().mockReturnValue([]),
    has: vi.fn().mockReturnValue(false),
    forEach: vi.fn(),
    entries: vi.fn().mockReturnValue([]),
    keys: vi.fn().mockReturnValue([]),
    values: vi.fn().mockReturnValue([]),
    toString: vi.fn().mockReturnValue(''),
  }),
  usePathname: () => '/',
  redirect: vi.fn(),
}))

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue(null),
    getAll: vi.fn().mockReturnValue([]),
    set: vi.fn(),
    delete: vi.fn(),
    has: vi.fn().mockReturnValue(false),
  }),
}))

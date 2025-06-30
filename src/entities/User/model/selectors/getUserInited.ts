import { buildSelector } from '@/shared/lib/store'

export const [useGetUserInited] = buildSelector((state) => state.user._inited)

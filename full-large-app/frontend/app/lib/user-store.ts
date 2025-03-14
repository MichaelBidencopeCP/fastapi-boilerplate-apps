import { create } from 'zustand'

interface UserState {
    email: string | null
    emailVerified: boolean
    username: string | null
    firstName: string | null
    lastName: string | null
    userId: string | null
    token: string | null

    // Actions
    setUser: (user: Partial<UserState>) => void
    clearUser: () => void
}

const useUserStore = create<UserState>((set) => ({
    // Initial state
    email: null,
    emailVerified: false,
    username: null,
    firstName: null,
    lastName: null,
    userId: null,
    token: null,

    // Actions
    setUser: (user) => set((state) => ({ ...state, ...user })),
    clearUser: () => set({
        email: null,
        emailVerified: false,
        username: null,
        firstName: null,
        lastName: null,
        userId: null,
        token: null,
    }),
}))

export default useUserStore
'use client'


import useUserStore from "../lib/user-store"

export default function Dashboard() {
    let { username } = useUserStore()

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome, {username}</h2>
        </div>

    )
}
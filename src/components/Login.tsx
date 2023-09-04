'use client'

import React, { useState } from 'react'

export default function LoginButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    if (isLoggedIn)
        return (
            <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-neutral-800 dark:bg-neutral-800 text-white px-3 py-1 rounded-md"
            >
                Logout
            </button>
        )
    return (
        <button
            onClick={() => setIsLoggedIn(true)}
            className="bg-neutral-800 dark:bg-neutral-800 text-white px-3 py-1 rounded-md"
        >
            Login
        </button>
    )
}

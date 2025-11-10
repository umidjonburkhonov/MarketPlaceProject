import React from 'react'
import AuthForm from '../components/AuthForm'

export default function Signup() {
    const handleSignup = async (data) => {
        console.log(data);

        try {
            const res = await fetch('https://256329c57da5.ngrok-free.app/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const result = await res.json()
            console.log(result)
            alert(result.success || result.warning || result.error)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
            <AuthForm type="signup" onSubmit={handleSignup} />
        </div>
    )
}

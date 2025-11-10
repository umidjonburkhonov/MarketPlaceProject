import React, { useState } from 'react'
import InputField from './InputField'
import { useNavigate } from 'react-router-dom'
import { router } from '../router'
export default function AuthForm({ type, onSubmit }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
        >
            <h2 className="text-2xl font-semibold mb-4 text-center">
                {type === 'signup' ? 'Create Account' : 'Login'}
            </h2>

            {type === 'signup' && (
                <>
                    <InputField label="First Name" type="text" name="firstname" value={formData.firstname} onChange={handleChange} placeholder="John" />
                    <InputField label="Last Name" type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Doe" />
                </>
            )}

            <InputField label="Phone (+992...)" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+992xxxxxxxxx" />
            <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" />

            <button
                type="submit"
                className="bg-blue-600 text-white w-full py-2 mt-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
                {type === 'signup' ? 'Sign Up' : 'Login'}
            </button>
            {type !== "signup" ? <p>Don't have an account <span onClick={() => navigate(router.signup)}>Signup</span></p>
                : <p>Already have an account <span onClick={() => navigate(router.login)}>Login</span></p>
            }
        </form>
    )
}

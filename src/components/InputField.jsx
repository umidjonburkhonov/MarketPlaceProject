import React from 'react'

export default function InputField({ label, type, name, value, onChange, placeholder }) {
    return (
        <div className="mb-4 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}  // <-- shu qatorda "name" atributi qo‘shildi
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
        </div>
    )
}

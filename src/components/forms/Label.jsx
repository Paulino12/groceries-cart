import React from 'react'

function Label({
    labelFor,
    className,
    text
}) {
    return (
        <div>
            <label htmlFor={labelFor} className={`inline-block mb-1 text-gray-900 font-medium ${className}`}>{text}</label>
        </div>
    )
}

export default Label

import React from 'react'

function Textarea({
    className,
    placeholder,
    value,
    handleTextArea
}) {
    return (
        <div>
            <textarea
            maxLength={250}
            className={`
                resize-none
                mb-2
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${className}`}
            rows="3"
            placeholder={placeholder}
            required
            value={value}
            onChange={handleTextArea}
            >
            </textarea>
        </div>
    )
}

export default Textarea

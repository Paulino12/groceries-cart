import React from 'react'

function Select({
    className,
    options,
    value,
    handleChange
}) {
    return (
        <div>
            <select className={`block w-full lg:px-3 py-2 border border-gray-300 rounded-md text-xs shadow-sm
            placeholder-gray-400
            focus:outline-none focus:border- sky-500 focus:ring-1 focus:ring-sky-500 ${className}`}
            aria-label="Default select example"
            id='customScroll'
            value={value}
            onChange={handleChange} >
                <option value='all'>All</option>
                {
                    options.map((option, index) => {
                        return <option key={index} value={option}>{option}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Select

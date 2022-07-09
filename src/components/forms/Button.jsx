import React from 'react'

function Button({
    handleClick,
    type,
    btnText={},
    classname,
    btnColor
}) {
    return (
        <>
            <button 
            onClick={handleClick} 
            type={type} 
            className={`font-semibold rounded-full px-3 text-white 
            focus:outline-none focus:ring 
            ${classname}`}>
                {btnText}
            </button>
        </>
    )
}

export default Button

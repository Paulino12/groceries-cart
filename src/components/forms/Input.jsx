
function Input({
    inputName,
    inputLabel,
    forwardedRef,
    className,
    type,
    placeholder,
    value,
    handleChange,
    handleKeyDown,
    disabled,
    autoComplete,
    min,
    step
}) {

    return (
        <>
            <input 
            name={inputName}// for nextauth signin process
            label={inputLabel}// for nextauth signin process
            ref={forwardedRef}
            value={value} 
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`block w-full px-1 md:px-3 py-2 lg:py-2 border border-gray-300 rounded-md text-sm lg:text-md shadow-sm
            placeholder-gray-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 lowercase
            ${disabled && 'bg-gray-200'} ${className}`}
            placeholder={placeholder}
            required
            autoComplete={autoComplete}
            maxLength={100}
            type={type}
            min={min} step={step}
            disabled={disabled}
             />
        </>
    )
}

export default Input

import React from 'react'
import "./App.css"

const Button = ({ className, value, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    )
}

export default Button
import './Button.css'
import { useState } from 'react';

export function MyButton({ content, onClick, className }) {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <button
            className={
                `my-button
                ${className ? className : ''}
                ${isPressed ? 'pressed' : ''}`
            }
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onClick={onClick}
        >
            {content}
        </button>
    );
}

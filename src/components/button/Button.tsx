import React from 'react';
import styles from "./Button.module.css";

interface IButtonProps {
    text: string;
    onClick: () => void;
    variant: 'primary' | 'secondary';
}

const Button: React.FC<IButtonProps> = ({ text, onClick, variant, ...rest }) => {
    return (
        <button
            className={`${styles.button} ${variant === 'secondary' ? styles.secondary : styles.primary}`}
            onClick={onClick}
            {...rest}
        >
            {text}
        </button>
    )
}

export default Button;
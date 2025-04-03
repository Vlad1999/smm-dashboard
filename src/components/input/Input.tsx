import React, {useState} from 'react';
import Image from "next/image";
import styles from './Input.module.css';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    leftIcon?: string;
    rightIcon?: string;
    placeholder?: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, label, leftIcon, rightIcon, placeholder, type }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const hasLeftIcon = Boolean(leftIcon);
    const hasRightIcon = Boolean(rightIcon || type === 'password');

    const padding = (() => {
        if (hasLeftIcon && hasRightIcon) return ' 0 56px 0 56px';
        if (hasRightIcon) return '0 56px 0 20px';
        if (hasLeftIcon) return '0 20px 0 56px';
        return '0 20px';
    })();

    return (
        <div className={styles.container}>
            {label && <label
                className={styles.label}
                htmlFor="user-input">
                {label}
            </label>}
            <div className={styles['input-container']}>
                {leftIcon && <Image
                    className={styles['icon-left']}
                    src={leftIcon}
                    width={24}
                    height={24}
                    alt="Left icon"
                />}
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    style={{ padding }}
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                />
                {rightIcon && <Image
                    className={styles['icon-right']}
                    src={rightIcon}
                    width={24}
                    height={24}
                    alt="Left icon"
                />}
                {type === 'password' &&
                    <Image
                        className={styles['icon-right']}
                        src={showPassword ? '/icons/eye.svg' : '/icons/eye-closed.svg'}
                        width={24}
                        height={24}
                        alt="Eye icon"
                        onClick={handleShowPassword}
                        style={{ cursor: 'pointer' }}
                    />
                }
            </div>
        </div>
    )
}

export default Input;
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import useClickOutside from '@/hooks/useClickOutside';
import styles from './SelectInput.module.css';

interface SelectProps {
  value: string;
  onChange: (value: any) => void;
  label?: string;
  placeholder?: string;
  options: string[];
}

const SelectInput: React.FC<SelectProps> = ({ value, onChange, label, placeholder, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  useClickOutside(popupRef, () => setIsOpen(false));

  return (
    <div className={styles.container} ref={popupRef}>
      {label && (
        <label className={styles.label} htmlFor="user-select">
          {label}
        </label>
      )}
      <div className={styles['input-container']} onClick={handleToggleDropdown}>
        <div className={styles['input-text']}>{value || placeholder}</div>
        <Image
          alt="Right icon"
          className={isOpen ? `${styles['icon-right']} ${styles.open}` : styles['icon-right']}
          height={24}
          src="/icons/arrow.svg"
          width={24}
        />
        {isOpen && (
          <div className={styles.dropdown}>
            {options.map((option, index) => (
              <div className={styles.option} key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectInput;

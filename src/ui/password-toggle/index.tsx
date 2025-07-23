import type { FC } from "react";
import Button from "../button";

interface PasswordToggleProps {
    showPassword: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

const PasswordToggle: FC<PasswordToggleProps> = ({ showPassword, onToggle, disabled = false }) => {
    return (
        <Button
            type="button"
            buttonType="password-toggle"
            containerClass="password-toggle"
            onClick={onToggle}
            disabled={disabled}
        >
            {showPassword ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21 8.0002C19.2531 11.5764 14.8775 15 10.9998 15C7.12201 15 2.74646 11.5764 1 7.99978"
                        stroke="#4D007D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21 8.0002C19.2531 4.42398 14.8782 1 11.0005 1C7.1227 1 2.74646 4.42314 1 7.99978"
                        stroke="#4D007D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14 8C14 9.65685 12.6569 11 11 11C9.34315 11 8 9.65685 8 8C8 6.34315 9.34315 5 11 5C12.6569 5 14 6.34315 14 8Z"
                        stroke="#4D007D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M4 4L9.87868 9.87868M20 20L14.1213 14.1213M9.87868 9.87868C9.33579 10.4216 9 11.1716 9 12C9 13.6569 10.3431 15 12 15C12.8284 15 13.5784 14.6642 14.1213 14.1213M9.87868 9.87868L14.1213 14.1213M6.76821 6.76821C4.72843 8.09899 2.96378 10.026 2 11.9998C3.74646 15.5764 8.12201 19 11.9998 19C13.7376 19 15.5753 18.3124 17.2317 17.2317M9.76138 5.34717C10.5114 5.12316 11.2649 5 12.0005 5C15.8782 5 20.2531 8.42398 22 12.0002C21.448 13.1302 20.6336 14.2449 19.6554 15.2412"
                        stroke="#4D007D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </Button>
    );
};

export default PasswordToggle;
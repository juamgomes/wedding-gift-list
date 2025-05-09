import React from 'react';

interface LoadingProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
    className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
    size = 'medium', 
    color = 'currentColor',
    className = ''
}) => {
    const getSizeClass = () => {
        switch (size) {
            case 'small': return 'w-4 h-4';
            case 'large': return 'w-10 h-10';
            default: return 'w-6 h-6';
        }
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <svg 
                className={`animate-spin ${getSizeClass()}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke={color} 
                    strokeWidth="4"
                />
                <path 
                    className="opacity-75" 
                    fill={color} 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    );
};

export default Loading;
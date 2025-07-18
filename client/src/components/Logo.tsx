import { FC } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dark background with rounded corners */}
      <rect 
        width="100" 
        height="100" 
        rx="20" 
        fill="#2D3748" 
      />
      
      {/* Main P shape outline */}
      <path
        d="M15 15 L15 85 C15 87 16 88 18 88 L20 88 C22 88 23 87 23 85 L23 60 L40 60 C42 60 43 59 43 57 L43 55 C43 53 42 52 40 52 L23 52 L23 23 L45 23 C65 23 75 33 75 50 C75 67 65 77 45 77 L35 77 C33 77 32 78 32 80 L32 82 C32 84 33 85 35 85 L45 85 C70 85 83 72 83 50 C83 28 70 15 45 15 L18 15 C16 15 15 16 15 18 Z"
        fill="white"
      />
      
      {/* Top circular node */}
      <circle cx="58" cy="35" r="8" fill="white" />
      <circle cx="58" cy="35" r="4" fill="#2D3748" />
      
      {/* Connecting stem from top node */}
      <path
        d="M58 43 L58 48 C58 50 57 51 55 51 L48 51 C46 51 45 52 45 54 L45 56"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Middle circular node */}
      <circle cx="45" cy="65" r="6" fill="white" />
      <circle cx="45" cy="65" r="3" fill="#2D3748" />
      
      {/* Bottom circular node */}
      <circle cx="25" cy="75" r="4" fill="white" />
      <circle cx="25" cy="75" r="2" fill="#2D3748" />
      
      {/* Connecting line from middle to bottom */}
      <path
        d="M39 67 L31 73"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
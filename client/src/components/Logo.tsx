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
      <rect width="100" height="100" fill="#2D3748" rx="16" />
      
      {/* Main P shape outline */}
      <path
        d="M15 15 L15 85 M15 15 L45 15 C65 15 75 25 75 40 C75 55 65 65 45 65 L15 65"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Top node with stem */}
      <circle cx="35" cy="25" r="3" fill="white" />
      <path
        d="M35 28 L35 35"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Middle connecting line */}
      <path
        d="M25 40 L50 40"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Middle node */}
      <circle cx="40" cy="50" r="2.5" fill="white" />
      
      {/* Bottom node */}
      <circle cx="25" cy="60" r="2.5" fill="white" />
      
      {/* Connecting lines between nodes */}
      <path
        d="M40 47.5 L50 40"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      <path
        d="M25 57.5 L40 47.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
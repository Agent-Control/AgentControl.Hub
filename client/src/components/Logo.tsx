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
      <rect width="100" height="100" fill="#2D3748" rx="12" />
      <path
        d="M20 20 C20 20 20 80 20 80 C20 80 50 80 50 80 C70 80 80 70 80 50 C80 30 70 20 50 20 C50 20 20 20 20 20 Z"
        stroke="white"
        strokeWidth="4"
        fill="none"
      />
      <circle cx="40" cy="30" r="4" fill="white" />
      <path
        d="M30 45 C30 45 50 45 50 45"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="35" cy="55" r="3" fill="white" />
      <circle cx="25" cy="65" r="3" fill="white" />
      <path
        d="M35 55 C35 55 50 55 50 55 C60 55 65 50 65 40"
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M25 65 C25 65 35 65 35 65"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
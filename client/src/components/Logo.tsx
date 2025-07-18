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
      {/* P shape main outline - single continuous path */}
      <path
        d="M18 18 L18 82 M18 18 L48 18 C68 18 78 28 78 48 C78 68 68 78 48 78"
        stroke="#2D3748"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Top node with stem */}
      <circle cx="42" cy="32" r="5" fill="#2D3748" />
      <circle cx="42" cy="32" r="2.5" fill="white" />
      <path
        d="M42 37 L42 42"
        stroke="#2D3748"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Horizontal connector */}
      <path
        d="M32 42 L52 42"
        stroke="#2D3748"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Middle node */}
      <circle cx="48" cy="58" r="4" fill="#2D3748" />
      <circle cx="48" cy="58" r="2" fill="white" />
      
      {/* Bottom node */}
      <circle cx="32" cy="68" r="4" fill="#2D3748" />
      <circle cx="32" cy="68" r="2" fill="white" />
      
      {/* Connecting lines */}
      <path
        d="M52 58 L58 48"
        stroke="#2D3748"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      
      <path
        d="M32 64 L44 54"
        stroke="#2D3748"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Logo;
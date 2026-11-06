import React from 'react';

interface BusTrackLogoProps {
  className?: string;
  isDark?: boolean;
  withTagline?: boolean;
}

export const BusTrackLogo: React.FC<BusTrackLogoProps> = ({
  className = '',
  isDark = false,
  withTagline = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Stylized Red Bus Emblem */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#cf1b1b] to-[#900d0d] text-white shadow-md shadow-red-500/25">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          {/* Bus body */}
          <path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
          {/* Windshield */}
          <path d="M4 9h16" />
          {/* Center divider */}
          <path d="M12 3v6" />
          {/* Headlights */}
          <circle cx="7.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
          {/* Wheels */}
          <path d="M6 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
          <path d="M15 17v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
        </svg>

        {/* Location pulse pin indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-amber-500"></span>
        </span>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center">
          <span
            className={`text-xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-[#1b1c1c]'
            }`}
          >
            Bus
          </span>
          <span className="text-xl font-extrabold tracking-tight text-[#cf1b1b]">
            Track
          </span>
        </div>
        {withTagline && (
          <span
            className={`mt-1 text-[10px] font-semibold tracking-wider uppercase ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            Movilidad · UTTT
          </span>
        )}
      </div>
    </div>
  );
};

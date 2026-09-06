import React from 'react';

interface StatusBadgeProps {
  type?: 'priority' | 'hazard' | 'redzone' | 'audit';
  value: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ value, size = 'md' }) => {
  const isSm = size === 'sm';
  const baseClasses = isSm 
    ? 'px-2 py-0.5 text-xs font-semibold rounded uppercase tracking-wider inline-flex items-center gap-1 border'
    : 'px-2.5 py-1 text-xs font-bold rounded-md uppercase tracking-wider inline-flex items-center gap-1.5 border';

  if (value === 'Immediate' || value === 'Extreme') {
    return (
      <span className={`${baseClasses} bg-red-950/80 text-red-300 border-red-700/60 shadow-sm shadow-red-950`}>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        {value}
      </span>
    );
  }

  if (value === 'Short-Term' || value === 'Very High') {
    return (
      <span className={`${baseClasses} bg-orange-950/70 text-orange-300 border-orange-700/60`}>
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
        {value}
      </span>
    );
  }

  if (value === 'Medium-Term' || value === 'High') {
    return (
      <span className={`${baseClasses} bg-amber-950/60 text-amber-300 border-amber-700/50`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        {value}
      </span>
    );
  }

  if (value === 'RED ZONE' || value === 'Permanent Red Zone') {
    return (
      <span className={`${baseClasses} bg-rose-950/90 text-rose-200 border-rose-600 font-extrabold`}>
        <svg className="w-3 h-3 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {value}
      </span>
    );
  }

  if (value === 'SAFE' || value === 'VERIFIED' || value === 'PUBLISHED') {
    return (
      <span className={`${baseClasses} bg-emerald-950/70 text-emerald-300 border-emerald-700/60`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        {value}
      </span>
    );
  }

  return (
    <span className={`${baseClasses} bg-slate-800 text-slate-300 border-slate-700`}>
      {value}
    </span>
  );
};

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
      <span className={`${baseClasses} bg-red-50 text-red-800 border-red-200 font-bold`}>
        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
        {value}
      </span>
    );
  }

  if (value === 'Short-Term' || value === 'Very High') {
    return (
      <span className={`${baseClasses} bg-orange-50 text-orange-800 border-orange-200 font-bold`}>
        <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
        {value}
      </span>
    );
  }

  if (value === 'Medium-Term' || value === 'High') {
    return (
      <span className={`${baseClasses} bg-amber-50 text-amber-800 border-amber-200 font-semibold`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
        {value}
      </span>
    );
  }

  if (value === 'RED ZONE' || value === 'Permanent Red Zone') {
    return (
      <span className={`${baseClasses} bg-rose-50 text-rose-800 border-rose-300 font-extrabold`}>
        <svg className="w-3 h-3 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {value}
      </span>
    );
  }

  if (value === 'SAFE' || value === 'VERIFIED' || value === 'PUBLISHED') {
    return (
      <span className={`${baseClasses} bg-emerald-50 text-emerald-800 border-emerald-200 font-bold`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        {value}
      </span>
    );
  }

  return (
    <span className={`${baseClasses} bg-slate-100 text-slate-700 border-slate-200`}>
      {value}
    </span>
  );
};

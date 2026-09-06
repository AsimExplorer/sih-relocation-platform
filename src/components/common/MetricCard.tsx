import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  variant?: 'danger' | 'warning' | 'success' | 'info' | 'default';
  badgeText?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  variant = 'default',
  badgeText,
}) => {
  const variantStyles = {
    danger: 'border-red-800/50 bg-gradient-to-br from-red-950/30 via-slate-900 to-slate-950 text-red-400',
    warning: 'border-orange-800/50 bg-gradient-to-br from-orange-950/30 via-slate-900 to-slate-950 text-orange-400',
    success: 'border-emerald-800/50 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950 text-emerald-400',
    info: 'border-blue-800/50 bg-gradient-to-br from-blue-950/30 via-slate-900 to-slate-950 text-blue-400',
    default: 'border-slate-800 bg-slate-900/90 text-slate-400',
  };

  const iconBg = {
    danger: 'bg-red-950 text-red-400 border border-red-800/50',
    warning: 'bg-orange-950 text-orange-400 border border-orange-800/50',
    success: 'bg-emerald-950 text-emerald-400 border border-emerald-800/50',
    info: 'bg-blue-950 text-blue-400 border border-blue-800/50',
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
  };

  return (
    <div className={`p-4 rounded-xl border ${variantStyles[variant]} backdrop-blur-sm shadow-md transition-all hover:border-slate-700`}>
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
        <div className={`p-2 rounded-lg ${iconBg[variant]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-black text-slate-100 font-mono tracking-tight">{value}</span>
        {badgeText && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {badgeText}
          </span>
        )}
      </div>
      {subValue && (
        <p className="mt-1 text-xs text-slate-400 leading-relaxed truncate">{subValue}</p>
      )}
    </div>
  );
};

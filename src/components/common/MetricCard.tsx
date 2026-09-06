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
  const iconColors = {
    danger: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-orange-50 text-orange-700 border-orange-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    default: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const badgeColors = {
    danger: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-orange-100 text-orange-800 border-orange-200',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    default: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
          <div className={`p-2 rounded-lg border ${iconColors[variant]}`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">{value}</span>
          {badgeText && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${badgeColors[variant]}`}>
              {badgeText}
            </span>
          )}
        </div>
      </div>
      {subValue && (
        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed truncate">{subValue}</p>
      )}
    </div>
  );
};

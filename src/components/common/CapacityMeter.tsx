import React from 'react';

interface CapacityMeterProps {
  utilized: number;
  total: number;
  label?: string;
  unit?: string;
  limitingConstraint?: string;
  status?: 'FEASIBLE' | 'LIMITED' | 'REJECTED';
}

export const CapacityMeter: React.FC<CapacityMeterProps> = ({
  utilized,
  total,
  label = 'Capacity Utilization',
  unit = 'HH',
  limitingConstraint,
  status
}) => {
  const pct = total > 0 ? Math.min(100, Math.round((utilized / total) * 100)) : 0;
  
  let barColor = 'bg-emerald-600';
  let badgeColor = 'text-emerald-800 bg-emerald-50 border-emerald-200';
  
  if (status === 'REJECTED' || pct >= 95) {
    barColor = 'bg-red-600';
    badgeColor = 'text-red-800 bg-red-50 border-red-200';
  } else if (status === 'LIMITED' || pct >= 75) {
    barColor = 'bg-amber-500';
    badgeColor = 'text-amber-800 bg-amber-50 border-amber-200';
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-700 font-medium">{label}</span>
        <span className={`font-mono font-bold px-1.5 py-0.5 rounded border text-[11px] ${badgeColor}`}>
          {total > 0 ? `${pct}% (${utilized} / ${total} ${unit})` : '0 HH Capacity'}
        </span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {limitingConstraint && (
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <span>Limiting Bottleneck:</span>
          <span className="font-semibold text-slate-800 truncate max-w-[180px]">{limitingConstraint}</span>
        </div>
      )}
    </div>
  );
};

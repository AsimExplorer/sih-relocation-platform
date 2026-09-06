import React from 'react';

interface CapacityMeterProps {
  utilized: number;
  total: number;
  label?: string;
  unit?: string;
  limitingConstraint?: string;
}

export const CapacityMeter: React.FC<CapacityMeterProps> = ({
  utilized,
  total,
  label = 'Capacity Utilization',
  unit = 'HH',
  limitingConstraint
}) => {
  const pct = total > 0 ? Math.min(100, Math.round((utilized / total) * 100)) : 0;
  
  let barColor = 'bg-emerald-500';
  let badgeColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
  if (pct >= 90) {
    barColor = 'bg-rose-500';
    badgeColor = 'text-rose-400 bg-rose-950/60 border-rose-800';
  } else if (pct >= 75) {
    barColor = 'bg-amber-500';
    badgeColor = 'text-amber-400 bg-amber-950/60 border-amber-800';
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-300 font-medium">{label}</span>
        <span className={`font-mono font-bold px-1.5 py-0.2 rounded border text-[11px] ${badgeColor}`}>
          {pct}% ({utilized} / {total} {unit})
        </span>
      </div>
      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/70">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {limitingConstraint && (
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
          <span>Limiting Factor:</span>
          <span className="font-semibold text-amber-300">{limitingConstraint}</span>
        </div>
      )}
    </div>
  );
};

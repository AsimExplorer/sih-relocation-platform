import React from 'react';
import { History, Database, Code, ShieldCheck } from 'lucide-react';
import { AUDIT_LOGS_DATA } from '../../data/auditLogsData';
import { OFFICIAL_DATA_SOURCES, METHODOLOGY_SECTIONS } from '../../data/methodologyData';

export const AuditMethodologyModule: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-4 rounded-xl bg-gov-card border border-gov-border">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
          <History className="w-4 h-4" />
          <span>Decision Audit Trail & Provenance</span>
        </div>
        <h2 className="text-xl font-black text-white tracking-tight mt-1">
          Auditable Ledger, Mathematical Formulations & Data Provenance
        </h2>
        <p className="text-xs text-slate-300 max-w-4xl mt-1 leading-relaxed">
          Government decisions must withstand judicial review, legislative audit, and public scrutiny. Every model recalculation, boundary amendment, and priority score is version-stamped, cryptographically hashed, and traceable to published government benchmarks.
        </p>
      </div>

      {/* Cryptographic Audit Trail Table */}
      <div className="bg-gov-dark rounded-xl border border-gov-border overflow-hidden">
        <div className="p-3 border-b border-gov-border flex items-center justify-between font-bold text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Immutable Administrative Audit Ledger
          </span>
          <span className="text-[11px] text-slate-400 font-mono">5 Verified Events</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gov-surface text-slate-400 uppercase text-[10px] tracking-wider border-b border-gov-border">
              <tr>
                <th className="py-2.5 px-3">Audit ID & Timestamp</th>
                <th className="py-2.5 px-3">Action Executed</th>
                <th className="py-2.5 px-3">Operator & Authority</th>
                <th className="py-2.5 px-3">Details</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-border/60 text-slate-300">
              {AUDIT_LOGS_DATA.map(log => (
                <tr key={log.id} className="hover:bg-gov-surface/50">
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-white text-xs">{log.id}</div>
                    <div className="text-[10px] text-slate-400">{log.timestamp}</div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-200">
                    {log.action}
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-white font-medium">{log.operator}</div>
                    <div className="text-[10px] text-slate-400">{log.authority}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-300 max-w-sm text-[11px]">
                    {log.details}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold text-[10px]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Data Sources Table */}
      <div className="bg-gov-dark rounded-xl border border-gov-border p-4 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-white">
          <Database className="w-4 h-4 text-blue-400" />
          <span>Data Sources & Benchmark Provenance</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gov-surface text-slate-400 uppercase text-[10px] tracking-wider border-b border-gov-border">
              <tr>
                <th className="py-2.5 px-3">Source Agency</th>
                <th className="py-2.5 px-3">Dataset Domain</th>
                <th className="py-2.5 px-3">Usage in Prototype</th>
                <th className="py-2.5 px-3">Official Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-border/60 text-slate-300">
              {OFFICIAL_DATA_SOURCES.map((ds, i) => (
                <tr key={i} className="hover:bg-gov-surface/50">
                  <td className="py-2.5 px-3 font-bold text-white">{ds.name}</td>
                  <td className="py-2.5 px-3 text-slate-400">{ds.type}</td>
                  <td className="py-2.5 px-3 text-xs">{ds.notes}</td>
                  <td className="py-2.5 px-3 font-mono text-blue-400">{ds.officialUrl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mathematical Formulations Section */}
      <div className="p-4 rounded-xl bg-gov-card border border-gov-border space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-white">
          <Code className="w-4 h-4 text-emerald-400" />
          <span>Methodology & Mathematical Formulations</span>
        </div>
        <div className="space-y-3 text-xs">
          {METHODOLOGY_SECTIONS.map((sec, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-gov-surface border border-gov-border space-y-1.5">
              <div className="flex items-center justify-between font-bold text-white">
                <span>{sec.title}</span>
                <span className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.2 rounded text-slate-400">{sec.code}</span>
              </div>
              <p className="text-slate-300">{sec.description}</p>
              {sec.formula && (
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-emerald-300 text-[11px]">
                  {sec.formula}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

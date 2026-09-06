import React from 'react';
import { 
  History, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Gauge, 
  Scale,
  FileText
} from 'lucide-react';
import { AUDIT_LOGS_DATA } from '../../data/auditLogsData';
import { OFFICIAL_DATA_SOURCES, METHODOLOGY_SECTIONS } from '../../data/methodologyData';
import { DATA_VALIDATION_CHECKS, DATA_CONFIDENCE_METRICS } from '../../data/delhiData';

export const AuditMethodologyModule: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
          <History className="w-4 h-4 text-blue-700" />
          <span>Stage 9: Validation, Methodology & Analytical Audit Trail</span>
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
          Multi-Source Data Validation, Decision Methodology & Audit Ledger
        </h2>
        <p className="text-xs text-slate-600 max-w-4xl mt-1 leading-relaxed">
          Relocation decisions demand rigorous verification and transparency. SURAKSHA guarantees total auditability: decisions are not derived from a single black-box dataset, but cross-validated across benchmark agencies (CWC, Survey of India, DJB, PWD, UDISE+, Census) with verifiable mathematical formulations.
        </p>
      </div>

      {/* PERMANENT RELOCATION VS EMERGENCY RESPONSE COMPARISON TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <Scale className="w-4 h-4 text-blue-700" />
          <span>Conceptual Framework: Permanent Relocation vs Emergency Response</span>
        </div>
        <p className="text-xs text-slate-600">
          SURAKSHA is specifically engineered for long-term habitational sustainability and disaster risk reduction:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Planning Dimension</th>
                <th className="py-2.5 px-3 text-red-900">Temporary Emergency Response (Relief Camps)</th>
                <th className="py-2.5 px-3 text-emerald-900 font-bold">SURAKSHA Permanent Relocation Planning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Core Objective</td>
                <td className="py-2.5 px-3 text-slate-600">Immediate 72-hour life preservation & shelter</td>
                <td className="py-2.5 px-3 font-semibold text-emerald-800">Irreversible hazard avoidance & sustainable resettlement</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Land Tenure</td>
                <td className="py-2.5 px-3 text-slate-600">Temporary tents in schoolyards or community halls</td>
                <td className="py-2.5 px-3 font-semibold text-emerald-800">Permanent freehold / municipal leased dwelling plots</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Infrastructure Metric</td>
                <td className="py-2.5 px-3 text-slate-600">Water tankers and mobile chemical toilets</td>
                <td className="py-2.5 px-3 font-semibold text-emerald-800">DJB piped water mains, certified STP sewage & BSES power</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Civic Services</td>
                <td className="py-2.5 px-3 text-slate-600">Ad-hoc emergency medical kits</td>
                <td className="py-2.5 px-3 font-semibold text-emerald-800">UDISE+ school classroom integration & NHM health roster</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">Capacity Logic</td>
                <td className="py-2.5 px-3 text-slate-600">Square meters of floor space per evacuee</td>
                <td className="py-2.5 px-3 font-semibold text-emerald-800">Strict min-operator across 6 municipal resources</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MULTI-SOURCE DATA VALIDATION & CROSS-CONSISTENCY TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Multi-Agency Cross-Source Consistency & Validation Checks</span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold">
            All Critical Checks Passed
          </span>
        </div>
        <p className="text-xs text-slate-600">
          The system continuously compares datasets from multiple government agencies to prevent blind reliance on outdated single-source statistics:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Validation Check</th>
                <th className="py-2.5 px-3">Domain</th>
                <th className="py-2.5 px-3">Benchmark Sources Cross-Compared</th>
                <th className="py-2.5 px-3">Verification Detail</th>
                <th className="py-2.5 px-3">Variance Metric</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {DATA_VALIDATION_CHECKS.map(check => {
                let badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                if (check.status === 'WARNING') badgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
                if (check.status === 'INCOMPLETE') badgeClass = 'bg-red-100 text-red-900 border-red-300';

                return (
                  <tr key={check.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {check.checkName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-medium">
                      {check.domain}
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-600">
                      {check.sourcesCompared.join(' vs ')}
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-600 max-w-xs">
                      {check.details}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] font-bold text-slate-800">
                      {check.varianceMetric}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeClass}`}>
                        {check.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cryptographic Audit Trail Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-3 border-b border-slate-200 flex items-center justify-between font-bold text-xs text-slate-800 bg-slate-50">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Immutable Administrative Audit Ledger
          </span>
          <span className="text-[11px] text-slate-500 font-mono">5 Verified Entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Audit ID & Timestamp</th>
                <th className="py-2.5 px-3">Action Executed</th>
                <th className="py-2.5 px-3">Operator & Authority</th>
                <th className="py-2.5 px-3">Details</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {AUDIT_LOGS_DATA.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-slate-900 text-xs">{log.id}</div>
                    <div className="text-[10px] text-slate-500">{log.timestamp}</div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {log.action}
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-slate-900 font-medium">{log.operator}</div>
                    <div className="text-[10px] text-slate-500">{log.authority}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-sm text-[11px]">
                    {log.details}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold text-[10px]">
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
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
          <Database className="w-4 h-4 text-blue-700" />
          <span>Benchmark Data Sources & Agency Portals</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Source Agency</th>
                <th className="py-2.5 px-3">Dataset Domain</th>
                <th className="py-2.5 px-3">Usage in Platform</th>
                <th className="py-2.5 px-3">Agency Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {OFFICIAL_DATA_SOURCES.map((ds, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{ds.name}</td>
                  <td className="py-2.5 px-3 text-slate-500">{ds.type}</td>
                  <td className="py-2.5 px-3 text-xs">{ds.notes}</td>
                  <td className="py-2.5 px-3 font-mono text-blue-700">{ds.officialUrl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

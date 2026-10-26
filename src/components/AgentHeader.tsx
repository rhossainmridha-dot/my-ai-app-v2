import React from 'react';
import {
  Code2,
  Briefcase,
  Languages,
  BrainCircuit,
  Activity,
  Layers,
  Sparkles,
  Coins,
} from 'lucide-react';
import { AgentMode } from '../services/agentEngine.ts';

interface AgentHeaderProps {
  currentMode: AgentMode;
  onSelectMode: (mode: AgentMode) => void;
  onOpenTelemetry: () => void;
  onOpenBridge: () => void;
  onTriggerRewardedAd: () => void;
  onToggleVip: () => void;
  vipActive: boolean;
  tokens: number;
  latencyMs?: number;
}

export const AgentHeader: React.FC<AgentHeaderProps> = ({
  currentMode,
  onSelectMode,
  onOpenTelemetry,
  onOpenBridge,
  onTriggerRewardedAd,
  onToggleVip,
  vipActive,
  tokens,
  latencyMs = 24,
}) => {
  const modes: { id: AgentMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'CODING',
      label: 'Code',
      icon: <Code2 className="w-3.5 h-3.5" />,
      desc: 'AST verified & sandbox execution',
    },
    {
      id: 'BUSINESS',
      label: 'Business',
      icon: <Briefcase className="w-3.5 h-3.5" />,
      desc: 'Workflows & eCPM models',
    },
    {
      id: 'TRANSLATION',
      label: 'Translate',
      icon: <Languages className="w-3.5 h-3.5" />,
      desc: 'Zero-loss cultural translation',
    },
    {
      id: 'SOLVER',
      label: 'Solver',
      icon: <BrainCircuit className="w-3.5 h-3.5" />,
      desc: 'First-principles logic & proofs',
    },
  ];

  return (
    <header className="bg-[#070b12]/95 border-b border-slate-800/90 px-3 pt-2 pb-2.5 flex flex-col gap-2 shrink-0 z-30">
      {/* Top Identity & Action Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <span className="font-extrabold text-xs text-white tracking-tighter">OA</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xs font-bold text-white tracking-tight leading-none">
                OmniAgent AI
              </h1>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] text-cyan-400/90 font-mono">
              Zero-Hallucination Mobile Edge
            </span>
          </div>
        </div>

        {/* Header Badges */}
        <div className="flex items-center gap-1.5">
          {/* Latency & Telemetry */}
          <button
            onClick={onOpenTelemetry}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition-colors"
            title="Inspect packet telemetry and zero-hallucination audit"
            aria-label="Inspect packet telemetry and zero-hallucination audit"
          >
            <Activity className="w-3 h-3 text-cyan-400" />
            <span className="font-mono text-[10px] text-emerald-400 font-bold">{latencyMs}ms</span>
          </button>

          {/* Export APK Bridge */}
          <button
            onClick={onOpenBridge}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Export Mobile APK / React Native / Flutter Bridge"
            aria-label="Export Mobile APK / React Native / Flutter Bridge"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
          </button>

          {/* Rewarded Runs / Tokens */}
          <button
            onClick={onTriggerRewardedAd}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold transition-colors"
            title="Watch AdMob video to claim +50 Ultra Agent Runs"
            aria-label="Watch AdMob video to claim +50 Ultra Agent Runs"
          >
            <Coins className="w-3 h-3 text-amber-400" />
            <span>{tokens}</span>
            <span className="text-[9px] text-amber-400/80 font-normal">+Ad</span>
          </button>

          {/* VIP Toggle */}
          <button
            onClick={onToggleVip}
            className={`p-1.5 rounded-lg transition-colors border ${
              vipActive
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-300'
            }`}
            title={vipActive ? 'VIP Active (Ad-Free)' : 'Upgrade to VIP ($4.99 Ad-Free)'}
            aria-label={vipActive ? 'VIP Active' : 'Upgrade to VIP'}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mode Selection Pills */}
      <div className="grid grid-cols-4 gap-1 bg-slate-950/80 p-0.5 rounded-xl border border-slate-800/80">
        {modes.map(mode => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 text-[11px] font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title={mode.desc}
            >
              {mode.icon}
              <span className="truncate">{mode.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

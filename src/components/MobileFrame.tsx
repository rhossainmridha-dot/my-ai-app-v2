import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Monitor } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  frameMode: 'device' | 'full';
  onToggleFrameMode: () => void;
  vipActive: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  frameMode,
  onToggleFrameMode,
  vipActive,
}) => {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#04060a] text-slate-100 flex flex-col items-center justify-center p-0 md:p-4 selection:bg-cyan-500 selection:text-white">
      {/* Top Floating Control Bar for Developers/Reviewers */}
      <div className="w-full max-w-5xl mb-2 px-3 py-1.5 flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 backdrop-blur border border-slate-800/80 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-200">OmniAgent Engine</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50 text-[10px] text-cyan-400 font-mono">
            APK / React Native / Flutter Ready
          </span>
          {vipActive && (
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/40">
              VIP PRO
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFrameMode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
            title="Toggle between Mobile Phone Shell and Responsive Layout"
            aria-label="Toggle mobile device view frame"
          >
            {frameMode === 'device' ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Expanded View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Mobile Frame</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container: Native Edge-to-Edge on mobile screens (<640px), Phone Hardware Shell on desktop */}
      <div
        className={`w-full transition-all duration-300 ${
          frameMode === 'device'
            ? 'w-full sm:max-w-[420px] h-[100dvh] sm:h-[890px] sm:max-h-[96vh] rounded-none sm:rounded-[48px] border-0 sm:border-[10px] border-[#1e293b] shadow-2xl shadow-cyan-950/20 ring-0 sm:ring-1 ring-slate-800/80 flex flex-col relative overflow-hidden bg-[#070b12]'
            : 'w-full max-w-4xl h-[100dvh] sm:h-[92vh] rounded-none sm:rounded-2xl border-0 sm:border border-slate-800/80 shadow-2xl flex flex-col relative overflow-hidden bg-[#070b12]'
        }`}
      >
        {/* Hardware Notch / Dynamic Island (Only on desktop phone preview) */}
        {frameMode === 'device' && (
          <div className="hidden sm:flex absolute top-2.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none items-center justify-center">
            <div className="h-6 w-28 bg-black/90 rounded-full border border-slate-800/60 shadow-inner flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
              <div className="w-2 h-2 rounded-full bg-cyan-500/40 animate-pulse" />
            </div>
          </div>
        )}

        {/* Mobile OS Status Bar */}
        <div className="w-full pt-3 px-6 pb-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-300 select-none z-40 bg-[#070b12]/90 backdrop-blur-md">
          <div className="tracking-tight font-mono">{time}</div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-[10px] font-mono text-cyan-400 font-bold">5G</span>
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px]">99%</span>
              <BatteryMedium className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Inner Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>

        {/* Virtual Home Indicator Bar */}
        {frameMode === 'device' && (
          <div className="w-full py-1.5 flex justify-center bg-[#070b12] z-40 pointer-events-none">
            <div className="w-32 h-1 bg-slate-600/70 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

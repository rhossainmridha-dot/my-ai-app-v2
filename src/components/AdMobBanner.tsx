import React, { useState } from 'react';
import { ExternalLink, Info, Sparkles, X } from 'lucide-react';

interface AdMobBannerProps {
  vipActive: boolean;
  onUpgradeVip: () => void;
  onTriggerRewardedAd: () => void;
  adUnitId?: string;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({
  vipActive,
  onUpgradeVip,
  onTriggerRewardedAd,
  adUnitId = 'ca-app-pub-3940256099942544/6300978111',
}) => {
  const [closed, setClosed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  if (vipActive) {
    return (
      <div className="w-full bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-amber-950/40 border-t border-amber-800/40 px-3 py-1 flex items-center justify-between text-[11px] text-amber-300">
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Omni VIP Active: 100% Ad-Free High-Priority Bandwidth</span>
        </div>
        <span className="text-[10px] text-amber-400/80 font-mono">0ms Ad Latency</span>
      </div>
    );
  }

  if (closed) {
    return (
      <div className="w-full bg-slate-900/80 border-t border-slate-800 px-3 py-1 flex items-center justify-between text-[11px] text-slate-400">
        <span>Google AdMob Banner minimized</span>
        <button
          onClick={() => setClosed(false)}
          className="text-cyan-400 hover:underline font-mono text-[10px]"
        >
          Restore Ad
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-950 border-t border-slate-800 flex flex-col items-center justify-center relative select-none">
      {/* Top micro Ad Header */}
      <div className="w-full px-2 py-0.5 bg-slate-900/90 flex items-center justify-between text-[9px] text-slate-400 border-b border-slate-800/50">
        <div className="flex items-center gap-1.5">
          <span className="bg-amber-400 text-slate-950 px-1 py-0.2 rounded font-extrabold uppercase text-[8px] tracking-wider">
            Ad
          </span>
          <span className="font-mono text-slate-400">Google AdMob Adaptive Unit</span>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="hover:text-cyan-400 text-slate-500"
            title="AdMob details"
            aria-label="AdMob details"
          >
            <Info className="w-2.5 h-2.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onUpgradeVip}
            className="text-amber-400 hover:text-amber-300 font-semibold underline text-[9px]"
          >
            Remove Ads ($4.99)
          </button>
          <button
            onClick={() => setClosed(true)}
            className="text-slate-500 hover:text-slate-300"
            aria-label="Close Ad preview"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Info Popover */}
      {showInfo && (
        <div className="w-full bg-slate-900 p-2 text-[10px] text-slate-300 border-b border-slate-800 space-y-1">
          <p className="font-mono text-cyan-400">Unit: {adUnitId}</p>
          <p className="text-slate-400">
            Monetization mediation active. eCPM rate: $24.80. Supports Google Mobile Ads SDK for React Native, Flutter, and Android Java/Kotlin.
          </p>
        </div>
      )}

      {/* Actual Simulated Banner (320x50 Standard Anchor Size) */}
      <div className="w-full h-[52px] bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 px-3 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-cyan-500/20">
            AI
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-100 leading-tight">
              Cloud Compute & Mobile Scale
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <span>Fastest Edge Ingestion</span>
              <span className="text-amber-400 font-bold">★ 4.9</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onTriggerRewardedAd}
            className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-[10px] rounded-md shadow flex items-center gap-1 transition-all"
          >
            <span>+50 Runs</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

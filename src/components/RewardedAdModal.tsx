import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, Play, Volume2, X } from 'lucide-react';

interface RewardedAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdCompleted: () => void;
}

export const RewardedAdModal: React.FC<RewardedAdModalProps> = ({
  isOpen,
  onClose,
  onAdCompleted,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(5);
      setIsCompleted(false);
      return;
    }

    setSecondsLeft(5);
    setIsCompleted(false);

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Ad Video Top Bar */}
        <div className="bg-slate-950 px-3 py-2 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
              AdMob Rewarded Video
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-300 font-mono">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isCompleted ? 'Reward Granted!' : `Reward in ${secondsLeft}s`}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={!isCompleted && secondsLeft > 1}
            className={`p-1 rounded-full transition-colors ${
              isCompleted || secondsLeft <= 1
                ? 'text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            aria-label="Close ad modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ad Simulation Canvas / Graphic */}
        <div className="relative h-48 bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          {/* Animated decorative pulses */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)]" />
          
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              {isCompleted ? (
                <CheckCircle2 className="w-8 h-8 text-white animate-bounce" />
              ) : (
                <Play className="w-7 h-7 text-white fill-white ml-0.5 animate-pulse" />
              )}
            </div>

            <div>
              <h4 className="text-base font-bold text-white tracking-tight">
                Global Edge AI Infrastructure
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-[240px]">
                Sub-millisecond packet routing for 10M+ concurrent mobile agent invocations.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-linear"
              style={{ width: `${((5 - secondsLeft) / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Bottom Reward Action */}
        <div className="p-4 bg-slate-950 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <Award className="w-4 h-4" />
            <span>Reward Value: +50 Zero-Latency Agent Runs</span>
          </div>

          {isCompleted ? (
            <button
              onClick={() => {
                onAdCompleted();
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Claim +50 Free Runs</span>
            </button>
          ) : (
            <button
              disabled
              className="w-full py-2.5 px-4 bg-slate-800 text-slate-400 font-medium text-xs rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Keep watching for {secondsLeft} seconds...</span>
            </button>
          )}

          <p className="text-[10px] text-slate-500 text-center font-mono">
            Powered by Google Mobile Ads SDK (Mediation eCPM $32.00)
          </p>
        </div>
      </div>
    </div>
  );
};

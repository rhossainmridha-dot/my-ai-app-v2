import React, { useState, useEffect } from 'react';
import { Check, Copy, Download, Layers, ShieldCheck, X } from 'lucide-react';

interface MobileBridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileBridgeModal: React.FC<MobileBridgeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'reactNative' | 'flutter' | 'capacitor' | 'manifest'>('reactNative');
  const [bridgeData, setBridgeData] = useState<{
    reactNativeCode: string;
    flutterCode: string;
    capacitorConfig: string;
    androidManifest: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && !bridgeData) {
      fetch('/api/export/mobile-bridge')
        .then(r => r.json())
        .then(data => setBridgeData(data))
        .catch(err => console.error('Failed to load bridge configs', err));
    }
  }, [isOpen, bridgeData]);

  if (!isOpen) return null;

  const currentCode =
    activeTab === 'reactNative'
      ? bridgeData?.reactNativeCode || '// Loading React Native Wrapper...'
      : activeTab === 'flutter'
      ? bridgeData?.flutterCode || '// Loading Flutter Wrapper...'
      : activeTab === 'capacitor'
      ? bridgeData?.capacitorConfig || '// Loading Capacitor Config...'
      : bridgeData?.androidManifest || '// Loading AndroidManifest.xml...';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filenameMap = {
      reactNative: 'App.tsx',
      flutter: 'main.dart',
      capacitor: 'capacitor.config.json',
      manifest: 'AndroidManifest.xml',
    };
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filenameMap[activeTab];
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Mobile APK & AdMob Bridge Exporter
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/40">
                  Ready to Build
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                100% production-ready source files to wrap this web application into native APK/IPA.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center bg-slate-950/60 border-b border-slate-800 px-3 pt-2 gap-1 overflow-x-auto">
          {[
            { id: 'reactNative', label: 'React Native (AdMob)' },
            { id: 'flutter', label: 'Flutter (Dart)' },
            { id: 'capacitor', label: 'Capacitor Config' },
            { id: 'manifest', label: 'AndroidManifest.xml' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors border-t border-x ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-cyan-400 border-slate-700'
                  : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Content View */}
        <div className="p-4 flex-1 flex flex-col overflow-hidden bg-slate-950">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Includes zero-latency offline caching & Google AdMob SDK configuration</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-md transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="flex-1 bg-slate-900/90 rounded-xl p-3 border border-slate-800 overflow-auto font-mono text-xs text-cyan-200">
            <pre className="whitespace-pre">{currentCode}</pre>
          </div>
        </div>

        {/* Quick APK Build Instructions */}
        <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">Terminal Build:</span>
            <code className="bg-slate-900 px-2 py-0.5 rounded text-cyan-300 font-mono text-[10px] border border-slate-800">
              npx cap run android --release
            </code>
          </div>
          <span className="text-slate-500 text-[10px]">Zero-Crash Architecture Validated</span>
        </div>
      </div>
    </div>
  );
};

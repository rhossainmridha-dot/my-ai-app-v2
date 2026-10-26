import React, { useState } from 'react';
import { Play, Copy, Check, Terminal, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface CodeSandboxRunnerProps {
  language: string;
  code: string;
  executable?: boolean;
}

export const CodeSandboxRunner: React.FC<CodeSandboxRunnerProps> = ({
  language,
  code,
  executable = true,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<{ logs: string[]; success: boolean; durationMs?: number } | null>(
    null
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const res = await fetch('/api/code/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setOutput(data);
    } catch (err: unknown) {
      setOutput({
        success: false,
        logs: [`Execution request failed: ${String(err)}`],
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="my-2.5 rounded-xl border border-slate-700/80 bg-slate-950/90 overflow-hidden shadow-md">
      {/* Code Header Bar */}
      <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-mono font-semibold uppercase text-slate-300 text-[11px]">
            {language || 'typescript'}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Zero-Latency Sandbox</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Copy Code"
            aria-label="Copy Code"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {executable && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold transition-all shadow-sm"
              aria-label="Execute code in sandbox"
            >
              {isRunning ? (
                <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
              ) : (
                <Play className="w-3 h-3 fill-emerald-400 text-emerald-400" />
              )}
              <span>{isRunning ? 'Running...' : 'Run Live'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Code Block Body */}
      <div className="p-3 overflow-x-auto text-xs font-mono text-cyan-200 bg-[#090d16]">
        <pre className="whitespace-pre">{code}</pre>
      </div>

      {/* Execution Console Output */}
      {output && (
        <div className="border-t border-slate-800 bg-slate-950 p-2.5 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 pb-1 border-b border-slate-800/60">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-slate-400" />
              <span>Sandbox Stdout Output</span>
              {output.success ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-1" />
              ) : (
                <AlertCircle className="w-3 h-3 text-rose-400 ml-1" />
              )}
            </div>
            {output.durationMs !== undefined && (
              <span className="text-[10px] text-slate-500">{output.durationMs}ms</span>
            )}
          </div>
          <div className="space-y-0.5 text-slate-300 text-[11px]">
            {output.logs.map((log, idx) => (
              <div
                key={idx}
                className={log.startsWith('[ERROR]') || !output.success ? 'text-rose-400' : 'text-emerald-300'}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

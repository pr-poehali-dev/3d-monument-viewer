import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ModelViewerProps {
  src: string | null;
  name?: string;
  className?: string;
  height?: string;
}

export default function ModelViewer({ src, name, className = "", height = "320px" }: ModelViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-card rounded-xl border border-white/5 ${className}`}
        style={{ height }}
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center mb-3">
          <Icon name="Box" size={24} className="text-primary/50" />
        </div>
        <p className="font-body text-xs text-muted-foreground text-center px-4">
          3D-модель не загружена
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-card rounded-xl border border-red-500/10 ${className}`}
        style={{ height }}
      >
        <Icon name="AlertCircle" size={24} className="text-red-400/50 mb-2" />
        <p className="font-body text-xs text-muted-foreground">Не удалось загрузить модель</p>
      </div>
    );
  }

  return (
    <div className={`relative rounded-xl overflow-hidden bg-card ${className}`} style={{ height }}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-card">
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin mb-3" />
          <p className="font-body text-xs text-muted-foreground">Загрузка модели…</p>
        </div>
      )}

      {/* @ts-expect-error — custom web component */}
      <model-viewer
        src={src}
        alt={name ?? "3D модель памятника"}
        auto-rotate
        camera-controls
        shadow-intensity="1.2"
        shadow-softness="0.8"
        exposure="0.85"
        tone-mapping="commerce"
        loading="eager"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          "--progress-bar-color": "hsl(38, 60%, 68%)",
          "--progress-bar-height": "2px",
        } as React.CSSProperties}
        onLoad={() => setLoading(false)}
        onError={() => { setLoading(false); setError(true); }}
      />

      {/* Hint */}
      {!loading && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
          <Icon name="RotateCcw" size={10} className="text-primary/70" />
          <span className="font-body text-[10px] text-muted-foreground">Вращайте мышью</span>
        </div>
      )}
    </div>
  );
}
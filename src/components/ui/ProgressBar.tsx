type ProgressBarProps = {
  value: number;
  className?: string;
};

export function ProgressBar({ value, className = "" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`w-full bg-sand h-1.5 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-terracotta h-full rounded-full transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

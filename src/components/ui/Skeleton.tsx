export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-sand/60 rounded-control animate-pulse ${className}`}
    />
  );
}

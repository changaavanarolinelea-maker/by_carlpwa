import { Skeleton } from "./Skeleton";

export function CardSkeleton() {
  return (
    <div className="bg-ivory border border-sand rounded-card p-4 sm:p-6">
      <div className="flex justify-between items-start mb-4 gap-3">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-5 w-16 shrink-0" />
      </div>
      <Skeleton className="h-2 w-full mb-3" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}

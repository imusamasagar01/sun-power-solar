import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-shimmer rounded-lg bg-line", className)} />;
}

/** Placeholder card matching the real product card layout. */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-card">
      <Skeleton className="aspect-4/3 rounded-none" />
      <div className="p-5 sm:p-6">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="mt-3 h-5 w-4/5" />
        <Skeleton className="mt-2.5 h-3.5 w-full" />
        <Skeleton className="mt-2 h-3.5 w-2/3" />
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

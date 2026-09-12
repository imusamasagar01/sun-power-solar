import { LoadingBar } from "@/components/page-loader";
import { Skeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <LoadingBar />
      <div className="border-b border-line bg-card">
        <div className="container-page py-14 lg:py-20">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-4 h-10 w-4/5 max-w-xl" />
          <Skeleton className="mt-5 h-4 w-full max-w-lg" />
          <Skeleton className="mt-2.5 h-4 w-2/3 max-w-md" />
        </div>
      </div>

      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-48 rounded-2xl" />
          ))}
        </div>
      </div>
    </>
  );
}

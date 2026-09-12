import { LoadingBar } from "@/components/page-loader";
import { ProductGridSkeleton, Skeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <LoadingBar />
      <section className="border-b border-line bg-card">
        <div className="container-page py-14 lg:py-20">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="mt-4 h-11 w-full max-w-md" />
          <Skeleton className="mt-5 h-4 w-full max-w-lg" />
        </div>
      </section>

      <section className="container-page py-12 lg:py-16">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-28 rounded-full" />
          ))}
        </div>
        <Skeleton className="mt-8 h-4 w-32" />
        <div className="mt-6">
          <ProductGridSkeleton />
        </div>
      </section>
    </>
  );
}

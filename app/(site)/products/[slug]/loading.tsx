import { LoadingBar } from "@/components/page-loader";
import { Skeleton } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <LoadingBar />
      <section className="border-b border-ink-100 bg-white">
        <div className="container-page py-10 lg:py-14">
          <Skeleton className="h-4 w-32" />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <Skeleton className="aspect-4/3 rounded-3xl" />
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="aspect-square rounded-xl" />
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-4 h-10 w-4/5" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-7 h-24 rounded-2xl" />
              <div className="mt-7 space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-3/4" />
                ))}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Skeleton className="h-12 flex-1 rounded-full" />
                <Skeleton className="h-12 flex-1 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

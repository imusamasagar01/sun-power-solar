/** Slim animated bar shown at the top of the page while a route loads. */
export function LoadingBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-90 h-0.5 overflow-hidden bg-brand-100">
      <div className="animate-bar h-full w-1/3 rounded-full bg-brand-600" />
    </div>
  );
}

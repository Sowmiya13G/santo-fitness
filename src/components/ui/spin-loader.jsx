export function GradientSpinner() {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin" />
    </div>
  );
}

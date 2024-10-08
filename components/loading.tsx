export default function Loading() {
  return (
    <div className="flex space-x-1 justify-center items-center h-full">
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 bg-grayscale-dark rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-2 w-2 bg-grayscale-dark rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-2 w-2 bg-grayscale-dark rounded-full animate-bounce" />
    </div>
  );
}

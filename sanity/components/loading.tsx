
export default function Loading() {

  return (
    <div className='flex space-x-2 justify-center items-center bg-white h-screen'>
      <span className='sr-only'>Loading...</span>
      <div className='h-2/6 w-1 bg-grayscale-dark rounded-full animate-bounce [animation-delay:-0.3s]' />
      <div className='h-2/6 w-1 bg-grayscale-dark rounded-full animate-bounce [animation-delay:-0.15s]' />
      <div className='h-2/6 w-1 bg-grayscale-dark rounded-full animate-bounce' />
    </div>
  )

}
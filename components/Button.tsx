export default function Button({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <button className="rounded-md p-4 bg-blue-400 text-white block border border-transparent hover:bg-indigo-200 hover:border-indigo-500 hover:text-black focus:bg-indigo-200 focus:border-indigo-500 focus:text-black active:bg-indigo-200 active:border-indigo-600 active:text-black">
    {children}
  </button>;
}

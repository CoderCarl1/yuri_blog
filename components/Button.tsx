export default function Button({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <button className="btn btn-primary">{children}</button>;
}

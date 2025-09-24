export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 w-full justify-center items-center flex-col gap-6 p-5">
      {children}
    </div>
  );
}

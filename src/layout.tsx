export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col md:overflow-hidden">
      <div className="flex-grow overflow-y-auto py-20">{children}</div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

import { logoutAction } from "@/app/admin/auth-actions";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 font-sans flex flex-col">
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-20">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Paribesh Prahari Logo" width={32} height={32} className="w-8 h-8 object-contain" />
            <strong className="text-xl font-sans tracking-tight">Admin Console</strong>
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-semibold text-zinc-600">
              <Link href="/admin" className="hover:text-black transition-colors">Posts</Link>
              <Link href="/admin/pages" className="hover:text-black transition-colors">Pages</Link>
            </nav>
            <div className="w-px h-6 bg-zinc-200"></div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="text-zinc-500">Hi, {session.username}</span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-1.5 rounded-sm hover:bg-zinc-800 transition-colors text-xs font-bold uppercase tracking-wider"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 lg:px-8 py-10">
        {children}
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-6 flex justify-between text-xs text-zinc-500 font-medium">
          <div>Paribesh Prahari Admin Console</div>
          <div>System v1.0</div>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";

import { logoutAction } from "@/app/admin/auth-actions";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#1f2a24] font-sans">
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex items-center justify-between border-[1.5px] border-[#5b6b62] bg-white p-3 rounded-md mb-6 text-sm">
          <div className="flex items-center">
            <span className="w-9 h-9 bg-[#2f6b3b] rounded-full inline-block mr-3"></span>
            <strong>Paribesh Prahari Admin</strong>
          </div>
          <nav className="text-[#6b7570] space-x-3">
            <Link href="/admin">Posts</Link>
            <span>·</span>
            <Link href="/admin/media">Media</Link>
            <span>·</span>
            <Link href="/admin/settings">Settings</Link>
          </nav>
          <form action={logoutAction}>
            <button
              type="submit"
              className="border border-[#5b6b62] rounded-full px-3 py-1 bg-white cursor-pointer"
            >
              Sign out
            </button>
          </form>
        </header>

        <main className="bg-white border border-[#c9d2cc] rounded-lg p-6 min-h-[500px]">
          {children}
        </main>

        <footer className="border-[1.5px] border-[#5b6b62] bg-white p-4 rounded-md mt-6 text-xs text-[#6b7570] flex justify-between">
          <div>Admin · v1</div>
          <div>Logged in as {session.username}</div>
        </footer>
      </div>
    </div>
  );
}

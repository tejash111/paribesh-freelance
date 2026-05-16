import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { loginAction } from "@/app/admin/auth-actions";
import { getAdminSession } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const params = await searchParams;
  const error = params.error ? decodeURIComponent(params.error) : null;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 font-sans flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-sm shadow-sm overflow-hidden">
        <div className="bg-white border-b border-zinc-200 text-black p-8 flex flex-col items-center text-center">
          <Image src="/logo.png" alt="Paribesh Prahari Logo" width={48} height={48} className="w-12 h-12 object-contain mb-4" />
          <h1 className="text-2xl font-sans font-bold tracking-tight">Admin Console</h1>
          <p className="text-sm text-zinc-500 mt-2">Manage posts, edit pages, and maintain the site.</p>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Sign In</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Enter your credentials to continue.
            </p>
          </div>

          {error ? (
            <div className="mb-6 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : null}

          <form action={loginAction} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600">Email</label>
              <input
                name="identifier"
                type="email"
                required
                className="w-full rounded-sm border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-sm border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                placeholder="Your password"
              />
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-sm bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800"
            >
              Sign in
            </button>
          </form>
        </div>
        
        <div className="bg-zinc-50 border-t border-zinc-200 p-4 text-center">
          <Link href="/" className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-black transition-colors">
            ← Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}

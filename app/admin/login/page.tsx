import Link from "next/link";
import { redirect } from "next/navigation";

import { loginAction, setupAdminAction } from "@/app/admin/auth-actions";
import { getAdminSession, getAdminSetupState } from "@/lib/auth";

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
  const setupState = await getAdminSetupState();
  const showSetupForm = !setupState.hasUsers && !setupState.hasBootstrapCredentials;

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#1f2a24] font-sans">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-12">
        <div className="grid w-full gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-[#c9d2cc] bg-[linear-gradient(135deg,#17341f_0%,#295636_45%,#dceadf_100%)] p-8 text-white shadow-sm">
            <div className="mb-10 flex items-center gap-3">
              <span className="inline-block h-10 w-10 rounded-full bg-white/20" />
              <strong className="text-lg tracking-wide">Paribesh Prahari</strong>
            </div>
            <h1 className="max-w-md text-4xl font-semibold leading-tight">
              Admin access now runs directly inside the Next.js app.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/80">
              Sign in to manage posts, publish editorials, and maintain the newsroom
              without a separate backend service.
            </p>
            <div className="mt-10 space-y-3 text-sm text-white/85">
              <p>JWT session cookie based authentication</p>
              <p>Protected admin routes under `/admin`</p>
              <p>MongoDB user records for admin credentials</p>
            </div>
            <div className="mt-10">
              <Link href="/" className="text-sm font-medium underline underline-offset-4">
                Return to site
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-[#c9d2cc] bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                {showSetupForm ? "Create admin account" : "Admin login"}
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                {showSetupForm
                  ? "No admin user exists yet. Create the first admin to continue."
                  : "Use your admin username or email and password."}
              </p>
            </div>

            {error ? (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {showSetupForm ? (
              <form action={setupAdminAction} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Username</label>
                  <input
                    name="username"
                    required
                    className="w-full rounded-xl border border-[#c9d2cc] bg-[#f8faf8] px-4 py-3 outline-none focus:border-[#2f6b3b]"
                    placeholder="admin"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-[#c9d2cc] bg-[#f8faf8] px-4 py-3 outline-none focus:border-[#2f6b3b]"
                    placeholder="admin@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-[#c9d2cc] bg-[#f8faf8] px-4 py-3 outline-none focus:border-[#2f6b3b]"
                    placeholder="Minimum 8 characters"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl border border-[#2f6b3b] bg-[#2f6b3b] px-4 py-3 font-semibold text-white transition hover:bg-[#244f2c]"
                >
                  Create admin and continue
                </button>
              </form>
            ) : (
              <form action={loginAction} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Username or Email</label>
                  <input
                    name="identifier"
                    required
                    className="w-full rounded-xl border border-[#c9d2cc] bg-[#f8faf8] px-4 py-3 outline-none focus:border-[#2f6b3b]"
                    placeholder="admin or admin@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full rounded-xl border border-[#c9d2cc] bg-[#f8faf8] px-4 py-3 outline-none focus:border-[#2f6b3b]"
                    placeholder="Your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl border border-[#2f6b3b] bg-[#2f6b3b] px-4 py-3 font-semibold text-white transition hover:bg-[#244f2c]"
                >
                  Sign in
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

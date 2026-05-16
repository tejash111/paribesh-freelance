"use server";

import { redirect } from "next/navigation";

import { clearSessionCookie, createInitialAdmin, loginAdmin } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  try {
    await loginAdmin({
      identifier: String(formData.get("identifier") || ""),
      password: String(formData.get("password") || ""),
    });
  } catch (error) {
    const message =
      error instanceof Error ? encodeURIComponent(error.message) : "Unable to sign in.";
    redirect(`/admin/login?error=${message}`);
  }

  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function setupAdminAction(formData: FormData) {
  try {
    await createInitialAdmin({
      username: String(formData.get("username") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    });
  } catch (error) {
    const message =
      error instanceof Error ? encodeURIComponent(error.message) : "Unable to create admin.";
    redirect(`/admin/login?error=${message}`);
  }

  redirect("/admin");
}

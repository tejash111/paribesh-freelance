import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";

const AUTH_COOKIE_NAME = "pp_admin_token";
const AUTH_MAX_AGE = 60 * 60 * 24 * 7;
const LOGIN_PATH = "/admin/login";

export type AdminSession = {
  sub: string;
  email: string;
  username: string;
};

type LoginInput = {
  identifier: string;
  password: string;
};

type SetupInput = {
  username: string;
  email: string;
  password: string;
};

function getJwtSecret() {
  return process.env.JWT_SECRET || "paribesh-prahari-dev-secret";
}

function getCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

function createToken(session: AdminSession) {
  return jwt.sign(session, getJwtSecret(), { expiresIn: `${AUTH_MAX_AGE}s` });
}

function verifyToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as AdminSession;
}

async function setSessionCookie(session: AdminSession) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, createToken(session), getCookieOptions(AUTH_MAX_AGE));
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "", getCookieOptions(0));
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return verifyToken(token);
  } catch {
    await clearSessionCookie();
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    redirect(LOGIN_PATH);
  }

  return session;
}

export async function getAdminSetupState() {
  await connectDB();
  const userCount = await User.countDocuments();

  return {
    hasUsers: userCount > 0,
    hasBootstrapCredentials: Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD),
  };
}

export async function ensureBootstrapAdmin() {
  const { hasUsers, hasBootstrapCredentials } = await getAdminSetupState();

  if (hasUsers || !hasBootstrapCredentials) {
    return;
  }

  const email = String(process.env.ADMIN_EMAIL).trim().toLowerCase();
  const username = (process.env.ADMIN_USERNAME || "admin").trim();
  const password = String(process.env.ADMIN_PASSWORD);
  const passwordHash = await bcrypt.hash(password, 12);

  await User.create({
    username,
    email,
    password: passwordHash,
  });
}

export async function loginAdmin(input: LoginInput) {
  await connectDB();
  await ensureBootstrapAdmin();

  const identifier = input.identifier.trim();
  const normalizedEmail = identifier.toLowerCase();

  const user = await User.findOne({
    $or: [{ email: normalizedEmail }, { username: identifier }],
  });

  if (!user) {
    throw new Error("Invalid username/email or password.");
  }

  const isValidPassword = await bcrypt.compare(input.password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid username/email or password.");
  }

  await setSessionCookie({
    sub: user._id.toString(),
    email: user.email,
    username: user.username,
  });
}

export async function createInitialAdmin(input: SetupInput) {
  await connectDB();
  const existingUser = await User.exists({});

  if (existingUser) {
    throw new Error("An admin user already exists.");
  }

  const username = input.username.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    username,
    email,
    password: passwordHash,
  });

  await setSessionCookie({
    sub: user._id.toString(),
    email: user.email,
    username: user.username,
  });
}

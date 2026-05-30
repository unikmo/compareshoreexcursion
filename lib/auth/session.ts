import { redirect } from "next/navigation";
import { canAccessRoute, type Role } from "@/lib/auth/roles";

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: Role;
};

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  // Supabase Auth will hydrate this from server cookies once the project keys are configured.
  return {
    id: "demo-user",
    email: "demo@Waylo.local",
    role: "ADMIN",
  };
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(user.role)) {
    redirect(roleFallback(user.role));
  }

  return user;
}

export function assertRouteAccess(role: Role, pathname: string) {
  return canAccessRoute(role, pathname);
}

function roleFallback(role: Role) {
  if (role === "CUSTOMER") return "/customer";
  if (role === "OPERATOR") return "/operator";
  return "/admin";
}

export const roles = ["CUSTOMER", "OPERATOR", "ADMIN"] as const;

export type Role = (typeof roles)[number];

export const roleHome: Record<Role, string> = {
  CUSTOMER: "/customer",
  OPERATOR: "/operator",
  ADMIN: "/admin",
};

export function canAccessRoute(role: Role, pathname: string) {
  if (pathname.startsWith("/admin")) return role === "ADMIN";
  if (pathname.startsWith("/operator")) return role === "OPERATOR" || role === "ADMIN";
  if (pathname.startsWith("/customer")) return role === "CUSTOMER" || role === "ADMIN";
  return true;
}

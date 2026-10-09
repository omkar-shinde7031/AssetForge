import { Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getProfile } from "@/lib/inventory/server";
import type { Profile, Role } from "@/lib/inventory/types";
import { AppSkeleton, EmployeeShell, StaffShell } from "@/components/app-shell";
import type { ReactNode } from "react";

export function RequireAuth({
  role,
  preferredRole,
  children,
}: {
  role?: Role;
  preferredRole?: Role;
  children: ReactNode | ((profile: Profile) => ReactNode);
}) {
  const { user, isPending } = useCurrentUserState();
  const profileQuery = useQuery({
    queryKey: ["profile", preferredRole ?? "auto"],
    queryFn: () => getProfile({ data: preferredRole ? { role: preferredRole } : {} }),
    enabled: Boolean(user),
  });

  if (isPending || (user && profileQuery.isLoading)) return <AppSkeleton />;
  if (!user) return <RedirectToSignIn />;
  if (profileQuery.error) {
    return (
      <div className="grid min-h-dvh place-items-center p-8 text-center">
        <p className="text-sm text-muted">Could not load your workspace. Try signing in again.</p>
      </div>
    );
  }
  const profile = profileQuery.data;
  if (!profile) return <AppSkeleton />;
  if (role === "staff" && profile.role !== "staff") return <Navigate to="/portal" />;
  const body = typeof children === "function" ? children(profile) : children;
  if (role === "employee" || (profile.role === "employee" && role !== "staff")) {
    return <EmployeeShell profile={profile}>{body}</EmployeeShell>;
  }
  return <StaffShell profile={profile}>{body}</StaffShell>;
}

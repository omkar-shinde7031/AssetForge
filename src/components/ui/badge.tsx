import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { statusLabel } from "@/lib/inventory/format";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    assigned: "bg-ok-bg text-ok-fg",
    in_stock: "bg-info-bg text-info-fg",
    repair: "bg-warn-bg text-warn-fg",
    retired: "bg-canvas text-muted",
    overdue: "bg-danger-bg text-danger-fg",
    fulfilled: "bg-ok-bg text-ok-fg",
    partial: "bg-warn-bg text-warn-fg",
    open: "bg-info-bg text-info-fg",
  };
  const dot: Record<string, string> = {
    assigned: "bg-ok",
    in_stock: "bg-info",
    repair: "bg-warn",
    retired: "bg-subtle",
    overdue: "bg-danger",
    fulfilled: "bg-ok",
    partial: "bg-warn",
    open: "bg-info",
  };
  return (
    <Badge className={map[status] ?? "bg-canvas text-muted"}>
      <span className={cn("size-1.5 rounded-full", dot[status] ?? "bg-subtle")} />
      {statusLabel(status)}
    </Badge>
  );
}

export function OverdueBadge({ days }: { days: number }) {
  return <Badge className="bg-danger text-primary-fg">{days}d overdue</Badge>;
}

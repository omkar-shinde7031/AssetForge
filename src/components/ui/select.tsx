import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full appearance-none rounded-lg bg-surface bg-[length:12px] bg-[right_12px_center] bg-no-repeat px-3 pr-8 text-sm text-fg shadow-[0_0_0_1px_var(--color-border)] outline-none transition-[box-shadow] focus-visible:shadow-[0_0_0_2px_var(--color-ring)]",
        className,
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%238b97ab' stroke-width='1.6' stroke-linecap='round'/></svg>")`,
      }}
      {...props}
    >
      {children}
    </select>
  );
}

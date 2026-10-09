import { cn } from "@/lib/utils";

export function ForgeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden>
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <circle cx="11" cy="11" r="3.1" fill="#04332F" />
      <circle cx="21" cy="11" r="3.1" fill="#04332F" />
      <circle cx="11" cy="21" r="3.1" fill="#04332F" />
      <circle cx="21" cy="21" r="3.1" fill="#04332F" />
      <path
        d="M13.2 11h5.6M11 13.2v5.6M21 13.2v5.6M13.2 21h5.6"
        stroke="#04332F"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function AdminNavLink({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = slug === segment;

  return (
    <Link
      href={`/${slug}`}
      style={{ fontWeight: isActive ? "bold" : "normal" }}
      className={cn(
        "block pl-4 -ml-px border-l",
        isActive
          ? "-ml-px text-primary border-current font-semibold"
          : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

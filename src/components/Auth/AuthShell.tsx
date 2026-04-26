import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthShellProps {
  children: React.ReactNode;
}

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-[calc(100vh-82px)] lg:min-h-[calc(100vh-88px)] grid grid-cols-1 lg:grid-cols-2 bg-[#F7F8FA]">
      {/* Brand panel (lg+) — image only */}
      <div className="hidden lg:block relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/vector-1745158852219-2c46b8db2358?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>

      {/* Form panel */}
      <div className="flex items-start lg:items-center justify-center px-5 sm:px-10 pt-12 pb-10 lg:py-16 lg:bg-white">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="lg:hidden text-sm text-primary font-semibold mb-6 inline-flex items-center gap-1 hover:text-primary-dark transition-colors"
          >
            ← Back to store
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}

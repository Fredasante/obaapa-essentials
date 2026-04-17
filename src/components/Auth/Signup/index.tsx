"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="pt-5 pb-15 md:pb-10 lg:pb-15 pl-5 bg-[#F7F8FA]">
      <div className="w-full max-w-md mx-auto">
        <SignUp path="/signup" routing="path" signInUrl="/signin" />
      </div>
    </main>
  );
}

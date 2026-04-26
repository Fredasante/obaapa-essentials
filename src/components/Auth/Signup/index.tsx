"use client";

import { SignUp } from "@clerk/nextjs";
import AuthShell from "../AuthShell";
import { clerkAppearance } from "../clerkAppearance";

export default function SignUpPage() {
  return (
    <AuthShell>
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/signin"
        appearance={clerkAppearance}
      />
    </AuthShell>
  );
}

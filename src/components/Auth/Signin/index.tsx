"use client";

import { SignIn } from "@clerk/nextjs";
import AuthShell from "../AuthShell";
import { clerkAppearance } from "../clerkAppearance";

export default function SignInPage() {
  return (
    <AuthShell>
      <SignIn
        path="/signin"
        routing="path"
        signUpUrl="/signup"
        appearance={clerkAppearance}
      />
    </AuthShell>
  );
}

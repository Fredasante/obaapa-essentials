import type { Appearance } from "@clerk/types";

export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: "#8E1A5C",
    colorText: "#2C2E36",
    colorTextSecondary: "#6C6F7A",
    borderRadius: "0.5rem",
    fontFamily: "Euclid Circular A, system-ui, sans-serif",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "shadow-none w-full",
    card: "shadow-none bg-transparent border-none p-0 w-full",
    headerTitle: "text-2xl md:text-3xl font-bold text-dark",
    headerSubtitle: "text-gray-600",
    socialButtonsBlockButton:
      "border border-gray-3 hover:bg-gray-1 transition-colors",
    formButtonPrimary:
      "bg-primary hover:bg-primary-dark text-white normal-case font-semibold transition-colors",
    footerActionLink:
      "text-primary hover:text-primary-dark font-semibold",
    formFieldLabel: "text-dark font-medium",
    identityPreviewEditButton: "text-primary hover:text-primary-dark",
  },
};

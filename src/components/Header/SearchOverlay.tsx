"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import SearchInput from "./SearchInput";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const focusable = containerRef.current?.querySelector<HTMLElement>(
      "input, button, [tabindex]:not([tabindex='-1'])"
    );
    focusable?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-99999 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="absolute right-3 top-3 w-11 h-11 flex items-center justify-center text-dark hover:text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-sm font-semibold text-dark mb-4 pr-10">
          Search Obaapa Essentials
        </h2>

        <SearchInput />
      </div>
    </div>
  );
};

export default SearchOverlay;

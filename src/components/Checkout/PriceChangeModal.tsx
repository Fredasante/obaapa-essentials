"use client";
import React, { useEffect } from "react";
import { X, TriangleAlert } from "lucide-react";

interface Props {
  oldTotal: number;
  newTotal: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const PriceChangeModal = ({
  oldTotal,
  newTotal,
  onConfirm,
  onCancel,
}: Props) => {
  const diff = newTotal - oldTotal;
  const isIncrease = diff > 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="price-change-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-dark/70 px-4 py-6"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-xl shadow-3 bg-white p-6 sm:p-7.5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full bg-gray-1 text-dark hover:bg-gray-2 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 pr-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cream flex-shrink-0">
            <TriangleAlert className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3
              id="price-change-title"
              className="text-lg font-semibold text-dark leading-tight"
            >
              Prices have changed
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Your cart total updated since you opened it. Please confirm the
              new amount before paying.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-cream/60 border border-cream p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Previous total</span>
            <span className="text-sm text-dark/70 line-through">
              GH₵{oldTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-cream">
            <span className="text-sm font-medium text-dark">New total</span>
            <span className="text-xl font-semibold text-primary">
              GH₵{newTotal.toFixed(2)}
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-600">
            {isIncrease
              ? `That's GH₵${diff.toFixed(2)} more than your cart showed.`
              : `That's GH₵${Math.abs(diff).toFixed(2)} less than your cart showed.`}
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 font-medium text-primary bg-white border-2 border-primary py-3 px-6 rounded-md hover:bg-cream/40 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 font-medium text-white bg-primary py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Pay GH₵{newTotal.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceChangeModal;

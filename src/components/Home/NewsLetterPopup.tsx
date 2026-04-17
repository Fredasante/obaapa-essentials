"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

// Track if popup has been closed this session (outside component)
let hasClosedThisSession = false;

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    interest: "",
  });
  const [loading, setLoading] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);

  // Focus first input when popup opens
  useEffect(() => {
    if (isOpen && firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, [isOpen]);

  // Show popup logic
  useEffect(() => {
    // Check if user has ever submitted (persistent across sessions)
    let hasEverSubmitted = false;
    try {
      hasEverSubmitted = document.cookie.includes("newsletter_submitted=true");
    } catch (e) {
      // Cookie access failed, continue
    }

    // Only show if: not submitted ever AND not closed this session
    if (!hasEverSubmitted && !hasClosedThisSession) {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setIsOpen(false);
    // Mark as closed for this session only
    hasClosedThisSession = true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Thank you for subscribing!");

        // Set a persistent cookie so they never see popup again
        try {
          // Cookie expires in 10 years
          const expiryDate = new Date();
          expiryDate.setFullYear(expiryDate.getFullYear() + 10);
          document.cookie = `newsletter_submitted=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
        } catch (e) {
          console.error("Could not set cookie:", e);
        }

        handleClose();
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Hey Gorgeous!</h2>
          <p className="text-gray-600 text-sm">
            Subscribe to receive early access to new arrivals, exclusive
            discounts, and timeless pieces for the woman who sets the tone, not
            the trend.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={firstNameRef}
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border shadow-sm border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-seaBlue transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border shadow-sm border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-seaBlue transition"
          />
          <input
            type="text"
            name="interest"
            placeholder="Your interests (e.g., Vases, Candles)"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-4 py-3 border shadow-sm border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-seaBlue transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-seaBlue-dark text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to receive updates, offers, and marketing
            emails.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;

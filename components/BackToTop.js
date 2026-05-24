"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="group fixed bottom-24 right-6 z-50 animate-fadeIn rounded-full bg-gradient-to-r from-accent to-purple-600 p-3 text-white shadow-lg shadow-accent/20 transition-[transform,box-shadow,opacity] duration-300 ease-out motion-reduce:hover:scale-100 hover:scale-105 hover:shadow-xl hover:shadow-accent/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:shadow-accent/15 dark:hover:shadow-accent/30"
    >
      <ChevronUp className="h-5 w-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-active:scale-95 motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100" />
    </button>
  );
}
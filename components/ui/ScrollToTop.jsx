import React, { useState, useEffect } from "react";

/**
 * ScrollToTop Component
 * A floating scroll-to-top button that appears at the bottom-right corner of the viewport
 * once the user scrolls down past 300px. Scrolls smoothly to the top when clicked.
 * Built with pure React, Tailwind CSS transitions, and high-fidelity accessibility features.
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Track the scroll position to show or hide the button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener with passive option for performance optimization
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`group fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 transition-[transform,box-shadow,opacity,background] duration-300 ease-out motion-reduce:hover:scale-100 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/35 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:shadow-indigo-900/40 dark:hover:shadow-indigo-500/25 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      }`}
      aria-label="Scroll back to top of the page"
      title="Scroll to Top"
    >
      <svg
        className="h-5 w-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-active:scale-95 motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;

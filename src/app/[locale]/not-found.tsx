import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-background px-margin-mobile md:px-margin-desktop py-section-gap text-center">
      <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center mb-stack-md text-primary">
        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0" }}>
          error
        </span>
      </div>
      <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-primary mb-stack-sm">
        404 - Page Not Found
      </h1>
      <p className="font-sans text-body-lg text-on-surface-variant max-w-md mx-auto mb-stack-lg">
        The page you are looking for does not exist or has been moved to another location.
      </p>
      <Link
        href="/en"
        className="bg-primary text-on-primary font-sans text-label-md px-6 py-3 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
      >
        Go back to Home
      </Link>
    </div>
  );
}

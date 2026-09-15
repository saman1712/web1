"use client";

type LogoProps = {
  size?: "sm" | "lg";
  className?: string;
};

/**
 * Text logo replacing the original BOOK ZONE image.
 * Same stacked two-line mark with a red accent letter.
 * Swap this component for a designed SVG/PNG when a final logo is ready.
 */
export function Logo({ size = "lg", className = "" }: LogoProps) {
  return (
    <div
      className={`logo-mark logo-${size} ${className}`.trim()}
      aria-label="ویژن"
    >
      <span>وی</span>
      <span>
        <span className="logo-red">ژ</span>ن
      </span>
    </div>
  );
}

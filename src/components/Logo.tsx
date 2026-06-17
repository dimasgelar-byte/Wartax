import Link from "next/link";

type LogoVariant = "light" | "dark";

// Each dot has a distinct physical background color (not opacity), an explicit
// size, and a right margin (last dot has none).
const DOTS: Record<LogoVariant, { color: string; size: number; mr: number }[]> = {
  light: [
    { color: "#C8C2BB", size: 5, mr: 6 },
    { color: "#8C8680", size: 6.5, mr: 4 },
    { color: "#1F1D1B", size: 8.5, mr: 0 },
  ],
  dark: [
    { color: "#8C8680", size: 5, mr: 6 },
    { color: "#C0BAB2", size: 6.5, mr: 4 },
    { color: "#F5EFE4", size: 8.5, mr: 0 },
  ],
};

export default function Logo({
  variant = "light",
  className = "",
}: {
  variant?: LogoVariant;
  className?: string;
}) {
  const dots = DOTS[variant];
  const warColor = variant === "dark" ? "var(--color-cream)" : "var(--color-charcoal)";
  const taxColor = variant === "dark" ? "var(--color-rust-light)" : "var(--color-rust)";

  return (
    <Link
      href="/"
      aria-label="WarTax — beranda"
      className={`inline-flex flex-col leading-none ${className}`}
    >
      <span className="font-serif text-2xl tracking-tight">
        <span style={{ color: warColor }}>War</span>
        <span className="italic" style={{ color: taxColor }}>
          Tax
        </span>
      </span>
      <span
        className="mt-1.5 flex items-end"
        aria-hidden="true"
        style={{ height: "8.5px" }}
      >
        {dots.map((dot, i) => (
          <span
            key={i}
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.color,
              borderRadius: "9999px",
              marginRight: `${dot.mr}px`,
            }}
          />
        ))}
      </span>
    </Link>
  );
}

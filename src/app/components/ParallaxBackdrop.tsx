import type { CSSProperties } from "react";

/**
 * Three decorative depth planes that drift behind the page as it scrolls.
 *
 * The planes are `fixed`, so they do not move on their own; translating them
 * upward makes them travel *with* the content but far more slowly than it. The
 * smaller the shift, the further away the plane reads — the dot grid barely
 * moves, the near gradient field moves most.
 *
 * All of the motion lives in `.parallax-plane` in `globals.css`, behind a
 * reduced-motion guard and an `@supports` test. This component only places the
 * planes and says how deep each one is; with the animation suppressed they are
 * a static, very low-contrast wash.
 *
 * Colours are mixed from existing theme custom properties, so the backdrop
 * follows the light and dark palettes without a second definition.
 */
export function ParallaxBackdrop() {
  return (
    <div className="parallax-backdrop" aria-hidden="true">
      {/* Furthest: a dot grid, masked to a soft band behind the hero. It is the
          reference texture — without something regular to move against, the
          gradient fields read as a static wash rather than as depth. */}
      <div
        className="parallax-plane"
        style={
          {
            "--parallax-y": "-30px",
            backgroundImage:
              "radial-gradient(circle, color-mix(in srgb, var(--muted) 38%, transparent) 1px, transparent 1.5px)",
            backgroundSize: "34px 34px",
            maskImage:
              "radial-gradient(ellipse 85% 55% at 50% 22%, #000 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 55% at 50% 22%, #000 0%, transparent 100%)",
            opacity: 0.5,
          } as CSSProperties
        }
      />

      {/* Middle: two wide, soft fields in the theme's warm and cool accents.
          Radial gradients rather than a blurred shape — same look, but nothing
          for the compositor to re-blur on every frame. */}
      <div
        className="parallax-plane"
        style={
          {
            "--parallax-y": "-80px",
            backgroundImage: [
              "radial-gradient(circle at 12% 18%, color-mix(in srgb, var(--secondary) 12%, transparent) 0%, transparent 52%)",
              "radial-gradient(circle at 88% 8%, color-mix(in srgb, var(--primary) 9%, transparent) 0%, transparent 48%)",
            ].join(", "),
          } as CSSProperties
        }
      />

      {/* Nearest: one field low on the page, with a touch of horizontal drift so
          the near plane does not move on exactly the same axis as the others. */}
      <div
        className="parallax-plane"
        style={
          {
            "--parallax-y": "-150px",
            "--parallax-x": "24px",
            backgroundImage:
              "radial-gradient(circle at 70% 82%, color-mix(in srgb, var(--warning) 10%, transparent) 0%, transparent 50%)",
          } as CSSProperties
        }
      />
    </div>
  );
}

import type { CSSProperties } from "react";

/**
 * A decorative dot grid that drifts behind the page as it scrolls.
 *
 * The plane is `fixed`, so it does not move on its own; translating it upward
 * makes it travel *with* the content but far more slowly than it, which is what
 * reads as distance. A regular texture is what makes that legible — against a
 * flat background there is nothing for the eye to measure the drift by.
 *
 * This started out as three planes: the grid plus two soft colour fields mixed
 * from `--secondary` and `--primary`. The fields were dropped when the same
 * alpha that sat quietly over the beige ground read as a bright smudge over
 * near-black — in dark mode `--secondary` is a light tan.
 *
 * One warm field is back, but only where it was ever right. Its opacity is
 * `--backdrop-warmth`, which the palette blocks set to 0.1 in light and 0 in
 * dark, so the theme decides rather than the component. It is also what gives
 * the backdrop a second plane again: one layer cannot show parallax against
 * itself.
 *
 * All of the motion lives in `.parallax-plane` in `globals.css`, behind a
 * reduced-motion guard and an `@supports` test. With the animation suppressed
 * this is a static, very low-contrast texture.
 */
export function ParallaxBackdrop() {
  return (
    <div className="parallax-backdrop" aria-hidden="true">
      <div
        className="parallax-plane"
        style={
          {
            "--parallax-y": "-40px",
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

      {/*
        Light-mode warmth. `--parallax-opacity` has to be set as well as the
        base `opacity`: the `parallax-depth` keyframes animate opacity toward
        that variable, so leaving it unset would let the field fade up to 1 in
        dark mode — precisely the smudge this is scoped to avoid. Setting both
        to the same token makes the animation a no-op on this axis.
      */}
      <div
        className="parallax-plane"
        style={
          {
            "--parallax-y": "-95px",
            "--parallax-x": "18px",
            "--parallax-opacity": "var(--backdrop-warmth, 0)",
            opacity: "var(--backdrop-warmth, 0)",
            backgroundImage:
              "radial-gradient(circle at 14% 16%, color-mix(in srgb, var(--secondary) 70%, transparent) 0%, transparent 55%)",
          } as CSSProperties
        }
      />
    </div>
  );
}

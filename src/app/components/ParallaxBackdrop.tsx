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
 * from `--secondary` and `--primary`. The fields were dropped. Their alpha was
 * chosen against the light palette, where the mix sits close to the background;
 * in dark mode `--secondary` is a light tan over near-black, so the same alpha
 * read as a bright warm smudge in the top-left corner rather than as depth.
 * Colour is not what was carrying the effect, so it went rather than being
 * tuned per theme.
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
    </div>
  );
}

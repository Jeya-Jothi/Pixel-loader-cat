"use client";

import { useEffect, useRef, useState } from "react";
import {
  CAT_BODY,
  CAT_HEIGHT,
  CAT_PALETTE,
  CAT_TAIL_FRAMES,
  CAT_TAIL_ORIGIN,
  CAT_TAIL_SEQUENCE,
  CAT_WIDTH,
} from "../data/pixelCatData";

export type PixelCatLoaderProps = {
  /** Minimum time the loader stays visible (ms). */
  duration?: number;
  /** Set true when your content is ready. If omitted, waits for window "load". */
  ready?: boolean;
  /** Time each tail frame is shown (ms). */
  tailSpeed?: number;
  /** Screen pixels per sprite pixel. */
  scale?: number;
  background?: string;
  /** Show only on the first page view of a browser session. */
  oncePerSession?: boolean;
  onFinish?: () => void;
  className?: string;
};

const STORAGE_KEY = "pixel-cat-loader-seen";
const FADE_MS = 500;

function drawSprite(
  ctx: CanvasRenderingContext2D,
  rows: readonly string[],
  ox: number,
  oy: number,
) {
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const color = CAT_PALETTE[row[x]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(ox + x, oy + y, 1, 1);
    }
  });
}

export default function PixelCatLoader({
  duration = 2500,
  ready,
  tailSpeed = 160,
  scale = 5,
  background = "#ffffff",
  oncePerSession = false,
  onFinish,
  className = "",
}: PixelCatLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onFinishRef = useRef(onFinish);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const isReady = ready ?? pageLoaded;

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  // Skip if already shown this session
  useEffect(() => {
    if (!oncePerSession) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) setVisible(false);
    } catch {}
  }, [oncePerSession]);

  // Minimum display time
  useEffect(() => {
    const timer = window.setTimeout(() => setMinElapsed(true), duration);
    return () => window.clearTimeout(timer);
  }, [duration]);

  // Real page load
  useEffect(() => {
    if (document.readyState === "complete") {
      setPageLoaded(true);
      return;
    }
    const onLoad = () => setPageLoaded(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Fade out, then unmount
  useEffect(() => {
    if (!minElapsed || !isReady) return;
    setFading(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      try {
        if (oncePerSession) sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      onFinishRef.current?.();
    }, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [minElapsed, isReady, oncePerSession]);

  // Prevent page scroll while loading
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  // Draw cat and animate tail
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!visible || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (frameIndex: number) => {
      ctx.clearRect(0, 0, CAT_WIDTH, CAT_HEIGHT);
      drawSprite(
        ctx,
        CAT_TAIL_FRAMES[frameIndex],
        CAT_TAIL_ORIGIN.x,
        CAT_TAIL_ORIGIN.y,
      );
      drawSprite(ctx, CAT_BODY, 0, 0);
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let step = 0;
    render(CAT_TAIL_SEQUENCE[0]);
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      step = (step + 1) % CAT_TAIL_SEQUENCE.length;
      render(CAT_TAIL_SEQUENCE[step]);
    }, tailSpeed);
    return () => window.clearInterval(interval);
  }, [visible, tailSpeed]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ background }}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      } ${className}`}
    >
      <canvas
        ref={canvasRef}
        width={CAT_WIDTH}
        height={CAT_HEIGHT}
        aria-hidden="true"
        style={{
          width: CAT_WIDTH * scale,
          height: "auto",
          aspectRatio: `${CAT_WIDTH} / ${CAT_HEIGHT}`,
          maxWidth: "70vw",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

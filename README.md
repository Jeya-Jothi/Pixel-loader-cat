# Pixel Cat Loader

A simple full-screen loading screen for Next.js (App Router). A pixel-art black cat sits in the centre of the page and wags its tail until the page is ready, then fades out.

Built with a `<canvas>`, so there are no image files and no extra dependencies.

## Files

```
components/PixelCatLoader.tsx   # the loader component
data/pixelCatData.ts            # sprite data (cat body, tail frames, colours)
```

> `PixelCatLoader.tsx` imports the sprite with `../data/pixelCatData`, so keep the `data` folder next to `components`.

## Usage

Add the loader once in the root layout:

```tsx
// app/layout.tsx
import PixelCatLoader from "@/components/PixelCatLoader";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <PixelCatLoader />
        {children}
      </body>
    </html>
  );
}
```

By default the loader stays for at least 2.5 seconds and waits for the browser `load` event before fading out.

## Props

| Prop             | Type         | Default     | Description                                                                                         |
| ---------------- | ------------ | ----------- | --------------------------------------------------------------------------------------------------- |
| `duration`       | `number`     | `2500`      | Minimum time the loader stays visible (ms).                                                         |
| `ready`          | `boolean`    | `undefined` | Set to `true` when your content is ready. If omitted, the loader waits for the window `load` event. |
| `tailSpeed`      | `number`     | `160`       | Time each tail frame is shown (ms). Lower is faster.                                                |
| `scale`          | `number`     | `10`        | Screen pixels per sprite pixel. The cat is 32 sprite pixels wide, so `10` gives 320px.              |
| `background`     | `string`     | `"#ffffff"` | Background colour of the loader screen.                                                             |
| `oncePerSession` | `boolean`    | `false`     | Show only on the first page view of a browser session.                                              |
| `onFinish`       | `() => void` | `undefined` | Called after the fade-out finishes.                                                                 |
| `className`      | `string`     | `""`        | Extra classes for the loader wrapper.                                                               |

### Examples

Show once per session on a dark background:

```tsx
<PixelCatLoader oncePerSession background="#0b0b0e" />
```

Control it with your own loading state:

```tsx
<PixelCatLoader ready={!isLoading} duration={1500} />
```

Bigger cat, faster tail:

```tsx
<PixelCatLoader scale={12} tailSpeed={120} />
```

## How it works

1. The loader covers the screen (`fixed inset-0`, `z-index: 9999`).
2. Page scroll is locked while it is visible.
3. The cat body is drawn once, and the tail frames are redrawn on an interval to make it wag.
4. When both the minimum `duration` has passed and the page is ready, it fades out over 500ms and unmounts.
5. If the user has "reduce motion" turned on, the tail stays still.

## Editing the cat

All sprite data lives in `data/pixelCatData.ts`.

- **`CAT_BODY`**: rows of characters. Each character is one pixel and `.` is transparent.
- **`CAT_TAIL_FRAMES`**: the tail frames, drawn behind the body starting at `CAT_TAIL_ORIGIN`.
- **`CAT_TAIL_SEQUENCE`**: the order the frames play in, for example `[1, 2, 1, 0]`.
- **`CAT_WIDTH` / `CAT_HEIGHT`**: canvas size in sprite pixels. Update these if you change the grid size.

### Colour palette

| Char | Used for                       |
| ---- | ------------------------------ |
| `*`  | Main fur                       |
| `D`  | Fur shade                      |
| `+`  | Fur highlight (chest and legs) |
| `I`  | Inner ear                      |
| `E`  | Eye                            |
| `X`  | Pupil                          |
| `H`  | Eye shine                      |
| `N`  | Nose                           |
| `W`  | Whiskers                       |

To change a colour, edit its value in `CAT_PALETTE`. To add a new colour, add a new character to the palette and use it in the sprite rows.

## Notes

- The component is a client component (`"use client"`).
- Every row in `CAT_BODY` should be exactly `CAT_WIDTH` characters long, and the number of rows should equal `CAT_HEIGHT`.
- The canvas is limited to `70vw` wide so it still fits on small screens.

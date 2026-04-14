<template>
  <div>
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full pointer-events-none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let rafId: number | null = null;

let offset = 0;
let lastFrameTime = 0;
let lastCssWidth = 0;
let lastCssHeight = 0;

const TARGET_FPS = 15;
const MAX_DPR = 1.0;
const gridSize = 50;
const speed = 0.3;
const baseAlpha = 0.2;
const fadeSize = 100; // область фейда сверху/снизу в px

let ctx: CanvasRenderingContext2D | null = null;
let dpr = 1;
let cssWidth = 0;
let cssHeight = 0;

let hidden = false;

function resizeIfNeeded() {
  const canvas = canvasRef.value;
  if (!canvas || !ctx) return;

  const newCssW = Math.max(1, Math.floor(canvas.offsetWidth));
  const newCssH = Math.max(1, Math.floor(canvas.offsetHeight));

  if (newCssW === lastCssWidth && newCssH === lastCssHeight) return;

  lastCssWidth = newCssW;
  lastCssHeight = newCssH;

  dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

  cssWidth = newCssW;
  cssHeight = newCssH;

  canvas.width = Math.round(cssWidth * dpr);
  canvas.height = Math.round(cssHeight * dpr);
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.lineWidth = 1;
  ctx.lineCap = "butt";
  ctx.lineJoin = "miter";
}

function drawGrid() {
  if (!ctx) return;

  ctx.clearRect(0, 0, cssWidth, cssHeight);

  ctx.strokeStyle = `rgba(255,255,255,${baseAlpha})`;
  const startY = -gridSize + (offset % gridSize);

  for (let y = startY; y < cssHeight; y += gridSize) {
    let alpha = 1;
    if (y < fadeSize) alpha = y / fadeSize;
    else if (y > cssHeight - fadeSize) alpha = (cssHeight - y) / fadeSize;
    if (alpha <= 0) continue;

    ctx.globalAlpha = alpha * 1.0;
    ctx.beginPath();
    ctx.moveTo(0, Math.round(y) + 0.5);
    ctx.lineTo(cssWidth, Math.round(y) + 0.5);
    ctx.stroke();
  }

  ctx.globalAlpha = 1;

  const xStart = 0;
  const xEnd = cssWidth;
  for (let x = xStart; x < xEnd; x += gridSize) {
    const g = ctx.createLinearGradient(0, 0, 0, cssHeight);
    const t = Math.min(1, fadeSize / Math.max(1, cssHeight));
    g.addColorStop(0, `rgba(255,255,255,0)`);
    g.addColorStop(t, `rgba(255,255,255,${baseAlpha})`);
    g.addColorStop(1 - t, `rgba(255,255,255,${baseAlpha})`);
    g.addColorStop(1, `rgba(255,255,255,0)`);

    ctx.strokeStyle = g;
    ctx.beginPath();
    ctx.moveTo(Math.round(x) + 0.5, 0);
    ctx.lineTo(Math.round(x) + 0.5, cssHeight);
    ctx.stroke();
  }
}

function loop(now: number) {
  if (hidden) {
    rafId = requestAnimationFrame(loop);
    return;
  }

  if (!lastFrameTime) lastFrameTime = now;
  const elapsed = now - lastFrameTime;
  const frameInterval = 1000 / TARGET_FPS;

  if (elapsed < frameInterval) {
    rafId = requestAnimationFrame(loop);
    return;
  }

  lastFrameTime = now;

  resizeIfNeeded();

  offset += speed * (elapsed / (1000 / 60));

  drawGrid();

  rafId = requestAnimationFrame(loop);
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  if (!ctx) return;

  resizeIfNeeded();

  const ro = new ResizeObserver(() => {
    resizeIfNeeded();
  });
  ro.observe(canvas);

  const onVisibility = () => {
    hidden = document.hidden;
  };
  document.addEventListener("visibilitychange", onVisibility);

  rafId = requestAnimationFrame(loop);

  onBeforeUnmount(() => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
  });
});

onBeforeUnmount(() => {
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
canvas {
  z-index: 0;
}
</style>

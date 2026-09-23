import React, { useEffect, useRef } from 'react';
import { useSpotlight } from './useSpotlight.js';

// Helper to convert hex to RGB object
function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return { r: 255, g: 255, b: 255 };
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 255, g: 255, b: 255 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Helper to interpolate between two RGB colors
function interpolateColor(color1, color2, factor) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

export function SpotlightRenderer() {
  const { settings } = useSpotlight();
  const canvasRef = useRef(null);

  // Position and target tracking
  const posRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
    targetX: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
    targetY: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
  });

  const lastMoveTimeRef = useRef(Date.now());
  const wanderAngleRef = useRef(0);
  const wanderCenterRef = useRef({ x: 400, y: 300 });
  const trailHistoryRef = useRef([]);
  const clickEffectsRef = useRef([]);
  const animFrameRef = useRef(null);

  // Event Listeners for Mouse and Touch
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      lastMoveTimeRef.current = Date.now();
      wanderCenterRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      if (settings.mobile.behavior === 'disabled') return;
      if (e.touches && e.touches[0]) {
        posRef.current.targetX = e.touches[0].clientX;
        posRef.current.targetY = e.touches[0].clientY;
        lastMoveTimeRef.current = Date.now();
        wanderCenterRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleClick = (e) => {
      if (settings.clickEffect.type === 'none') return;
      clickEffectsRef.current.push({
        x: posRef.current.x,
        y: posRef.current.y,
        startTime: Date.now(),
        type: settings.clickEffect.type,
        duration: settings.clickEffect.duration || 400,
        intensity: settings.clickEffect.intensity || 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('click', handleClick);
    };
  }, [settings.mobile.behavior, settings.clickEffect.type, settings.clickEffect.duration, settings.clickEffect.intensity]);

  // Main Render Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    // Handle canvas resize
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      if (!isRunning) return;

      const now = Date.now();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pos = posRef.current;

      // Handle mobile disabled behavior
      if (width < 768 && settings.mobile.behavior === 'disabled') {
        ctx.clearRect(0, 0, width, height);
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Check Mobile Fixed Mode
      if (width < 768 && settings.mobile.behavior === 'fixed') {
        pos.targetX = width / 2;
        pos.targetY = height / 3;
      }

      // 1. Idle Calculation
      const idleElapsed = now - lastMoveTimeRef.current;
      let idleFactor = 1;
      if (idleElapsed > settings.idle.timeout) {
        if (settings.idle.behavior === 'fade') {
          const fadeProgress = Math.min(1, (idleElapsed - settings.idle.timeout) / 1500);
          idleFactor = 1 - fadeProgress * 0.75;
        } else if (settings.idle.behavior === 'dim') {
          idleFactor = 0.5;
        } else if (settings.idle.behavior === 'wander') {
          const wanderSpeed = (settings.idle.wanderSpeed / 100) * 0.03 + 0.005;
          wanderAngleRef.current += wanderSpeed;
          const wanderDist = settings.idle.wanderRadius || 120;
          pos.targetX = wanderCenterRef.current.x + Math.cos(wanderAngleRef.current) * wanderDist;
          pos.targetY = wanderCenterRef.current.y + Math.sin(wanderAngleRef.current * 1.3) * (wanderDist * 0.7);
        }
      }

      // 2. Position Follow Interpolation
      const followSmoothing = settings.follow.smoothing && !settings.reducedMotion;
      const followRate = followSmoothing ? Math.min(1, (settings.follow.speed / 100) * 0.35 + 0.05) : 1;
      pos.x += (pos.targetX - pos.x) * followRate;
      pos.y += (pos.targetY - pos.y) * followRate;

      // 3. Color Resolution (Fixed vs Cycle)
      let activeColor = settings.color || '#FFFFFF';
      if (settings.colorCycle.enabled && settings.colors && settings.colors.length > 1) {
        const cycleSpeed = (settings.colorCycle.speed / 100) * 0.003 + 0.0005;
        const totalColors = settings.colors.length;
        const cycleTime = (now * cycleSpeed) % totalColors;
        const idx = settings.colorCycle.direction === 'reverse'
          ? Math.floor((totalColors - cycleTime) % totalColors)
          : Math.floor(cycleTime);
        const nextIdx = settings.colorCycle.direction === 'reverse'
          ? (idx - 1 + totalColors) % totalColors
          : (idx + 1) % totalColors;
        const progress = cycleTime - Math.floor(cycleTime);
        activeColor = interpolateColor(settings.colors[idx], settings.colors[nextIdx], progress);
      }

      // 4. Animation calculation (candle, pulse, flicker, breathing, neon)
      let animRadiusMod = 1;
      let animIntensityMod = 1;

      if (!settings.reducedMotion && settings.animation.type !== 'none') {
        const speedMultiplier = (settings.animation.speed / 100) * 0.01 + 0.002;
        const animIntensity = settings.animation.intensity / 100;

        switch (settings.animation.type) {
          case 'candle': {
            // Natural multi-frequency candle flicker
            const f1 = Math.sin(now * speedMultiplier * 1.5);
            const f2 = Math.sin(now * speedMultiplier * 3.7) * 0.5;
            const f3 = Math.cos(now * speedMultiplier * 7.1) * 0.25;
            const jitter = (Math.random() - 0.5) * 0.2;
            const composite = (f1 + f2 + f3 + jitter) * 0.4;
            animRadiusMod = 1 + composite * 0.1 * animIntensity;
            animIntensityMod = 1 + composite * 0.2 * animIntensity;
            break;
          }
          case 'pulse': {
            const wave = Math.sin(now * speedMultiplier * 2);
            animRadiusMod = 1 + wave * 0.18 * animIntensity;
            break;
          }
          case 'breathing': {
            const breath = (Math.sin(now * speedMultiplier * 0.8) + 1) / 2;
            animRadiusMod = 0.88 + breath * 0.25 * animIntensity;
            animIntensityMod = 0.85 + breath * 0.25 * animIntensity;
            break;
          }
          case 'flicker': {
            const isFlickering = Math.random() < 0.12 * animIntensity;
            animIntensityMod = isFlickering ? 0.35 + Math.random() * 0.3 : 1;
            break;
          }
          case 'neon': {
            const buzz = (Math.random() - 0.5) * 0.08 * animIntensity;
            animIntensityMod = 1 + buzz;
            break;
          }
          default:
            break;
        }
      }

      // Base radius calculation (taking mobile radius into account)
      const baseRadius = (width < 768 ? settings.mobile.radius || 250 : settings.radius) * animRadiusMod * idleFactor;
      const effectiveIntensity = Math.min(100, Math.max(0, (settings.intensity * animIntensityMod * idleFactor)));
      const effectiveOpacity = settings.opacity / 100;

      // 5. Update Trail History
      if (settings.trail.enabled && !settings.reducedMotion) {
        trailHistoryRef.current.push({
          x: pos.x,
          y: pos.y,
          radius: baseRadius * 0.85,
          color: activeColor,
          time: now,
        });

        const maxTrail = Math.max(1, settings.trail.length || 5);
        if (trailHistoryRef.current.length > maxTrail) {
          trailHistoryRef.current.shift();
        }
      } else {
        trailHistoryRef.current = [];
      }

      // 6. Draw on Canvas
      ctx.clearRect(0, 0, width, height);

      // Darkness Layer
      // Ambient light ensures content remains slightly discernable if desired
      const ambientDampening = (settings.ambientLight / 20) * 0.18;
      const darkAlpha = Math.min(0.99, Math.max(0.6, (settings.darkness / 100) - ambientDampening));
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(5, 5, 8, ${darkAlpha})`;
      ctx.fillRect(0, 0, width, height);

      // Helper function to draw spotlight mask shape
      const drawShapeMask = (targetX, targetY, r, shape) => {
        ctx.beginPath();
        switch (shape) {
          case 'ellipse':
            ctx.ellipse(targetX, targetY, r * 1.35, r * 0.85, 0, 0, Math.PI * 2);
            break;
          case 'square':
            ctx.rect(targetX - r, targetY - r, r * 2, r * 2);
            break;
          case 'rounded-square':
            if (ctx.roundRect) {
              ctx.roundRect(targetX - r, targetY - r, r * 2, r * 2, r * 0.35);
            } else {
              ctx.rect(targetX - r, targetY - r, r * 2, r * 2);
            }
            break;
          case 'star': {
            const points = 5;
            const outerR = r;
            const innerR = r * 0.5;
            for (let i = 0; i < points * 2; i++) {
              const rad = (Math.PI / points) * i - Math.PI / 2;
              const radiusLength = i % 2 === 0 ? outerR : innerR;
              const px = targetX + Math.cos(rad) * radiusLength;
              const py = targetY + Math.sin(rad) * radiusLength;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            break;
          }
          case 'hexagon': {
            for (let i = 0; i < 6; i++) {
              const rad = (Math.PI / 3) * i;
              const px = targetX + Math.cos(rad) * r;
              const py = targetY + Math.sin(rad) * r;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            break;
          }
          case 'circle':
          case 'custom':
          default:
            ctx.arc(targetX, targetY, Math.max(10, r), 0, Math.PI * 2);
            break;
        }
      };

      // 7. Cut Darkness Hole (destination-out)
      ctx.globalCompositeOperation = 'destination-out';

      // Draw trails first (fainter cut)
      if (trailHistoryRef.current.length > 0) {
        const trailOpacity = (settings.trail.opacity / 100) * 0.5;
        trailHistoryRef.current.forEach((t, i) => {
          const ageRatio = (i + 1) / trailHistoryRef.current.length;
          const trailR = t.radius * (0.6 + ageRatio * 0.35);
          const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, trailR);
          grad.addColorStop(0, `rgba(0, 0, 0, ${trailOpacity * ageRatio})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          drawShapeMask(t.x, t.y, trailR, settings.shape);
          ctx.fill();
        });
      }

      // Cut main beam hole
      const softnessFactor = Math.min(0.95, Math.max(0.05, settings.softness / 100));
      const innerCutoff = Math.max(0, 1 - softnessFactor);
      const holeGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, baseRadius);
      holeGrad.addColorStop(0, `rgba(0, 0, 0, ${effectiveOpacity})`);
      holeGrad.addColorStop(Math.max(0.1, innerCutoff * 0.6), `rgba(0, 0, 0, ${effectiveOpacity * 0.95})`);
      holeGrad.addColorStop(innerCutoff, `rgba(0, 0, 0, ${effectiveOpacity * 0.7})`);
      holeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = holeGrad;
      drawShapeMask(pos.x, pos.y, baseRadius, settings.shape);
      ctx.fill();

      // 8. Color Glow & Illumination Beam (source-over / screen blend)
      ctx.globalCompositeOperation = 'source-over';
      const rgb = hexToRgb(activeColor);
      const intensityFactor = (effectiveIntensity / 100) * (settings.opacity / 100);

      // Main colored light gradient
      const colorGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, baseRadius);
      colorGrad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.28 * intensityFactor})`);
      colorGrad.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.12 * intensityFactor})`);
      colorGrad.addColorStop(0.85, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.04 * intensityFactor})`);
      colorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = colorGrad;
      drawShapeMask(pos.x, pos.y, baseRadius, settings.shape);
      ctx.fill();

      // Outer Glow Halo
      if (settings.glow.enabled) {
        const glowR = baseRadius + (settings.glow.radius || 40);
        const glowIntensity = (settings.glow.intensity / 100) * 0.3 * intensityFactor;
        const glowGrad = ctx.createRadialGradient(pos.x, pos.y, baseRadius * 0.5, pos.x, pos.y, glowR);
        glowGrad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity})`);
        glowGrad.addColorStop(0.6, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${glowIntensity * 0.4})`);
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glowGrad;
        drawShapeMask(pos.x, pos.y, glowR, settings.shape);
        ctx.fill();
      }

      // 9. Active Click Effects
      if (clickEffectsRef.current.length > 0) {
        clickEffectsRef.current = clickEffectsRef.current.filter((effect) => {
          const elapsed = now - effect.startTime;
          if (elapsed > effect.duration) return false;

          const progress = elapsed / effect.duration;
          const effectIntensity = (effect.intensity / 100) * (1 - progress);

          ctx.save();
          if (effect.type === 'ripple' || effect.type === 'glow-ring') {
            const rippleR = baseRadius * (0.3 + progress * 1.5);
            ctx.beginPath();
            ctx.arc(effect.x, effect.y, rippleR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${effectIntensity * 0.8})`;
            ctx.lineWidth = Math.max(1, 4 * (1 - progress));
            ctx.stroke();

            if (effect.type === 'glow-ring') {
              ctx.beginPath();
              ctx.arc(effect.x, effect.y, rippleR * 0.7, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(255, 255, 255, ${effectIntensity * 0.5})`;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          } else if (effect.type === 'flash') {
            const flashAlpha = (1 - progress) * 0.4 * (effect.intensity / 100);
            ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
            ctx.fillRect(0, 0, width, height);
          } else if (effect.type === 'burst' || effect.type === 'star-burst') {
            const count = effect.type === 'star-burst' ? 12 : 8;
            const dist = baseRadius * progress * 1.4;
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${effectIntensity})`;
            for (let b = 0; b < count; b++) {
              const ang = (Math.PI * 2 / count) * b;
              const bx = effect.x + Math.cos(ang) * dist;
              const by = effect.y + Math.sin(ang) * dist;
              ctx.beginPath();
              ctx.arc(bx, by, Math.max(1, 4 * (1 - progress)), 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.restore();
          return true;
        });
      }

      // 10. Update CSS Variables on document root for reactive elements
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--spotlight-x', `${pos.x}px`);
      rootStyle.setProperty('--spotlight-y', `${pos.y}px`);
      rootStyle.setProperty('--spotlight-radius', `${baseRadius}px`);
      rootStyle.setProperty('--spotlight-color', activeColor);
      rootStyle.setProperty('--spotlight-opacity', `${settings.opacity}%`);
      rootStyle.setProperty('--spotlight-darkness', `${settings.darkness}%`);
      rootStyle.setProperty('--spotlight-softness', `${settings.softness}%`);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [settings]);

  return (
    <canvas
      ref={canvasRef}
      className="spotlight-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}

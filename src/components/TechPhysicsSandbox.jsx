import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes, FaProjectDiagram, FaUndo, FaBolt, FaAtom, FaRocket,
  FaBomb, FaMagnet, FaGamepad, FaVolumeUp, FaVolumeMute
} from 'react-icons/fa';
import { soundFx } from '../utils/SoundEffects';

const techNodes = [
  { id: 'python', label: 'Python 3.12', type: 'backend', color: '#38bdf8', category: 'Core Backend' },
  { id: 'fastapi', label: 'FastAPI', type: 'backend', color: '#06b6d4', category: 'REST Microservices' },
  { id: 'postgres', label: 'PostgreSQL', type: 'database', color: '#818cf8', category: 'SQL Database' },
  { id: 'react', label: 'React 19', type: 'frontend', color: '#61dafb', category: 'UI Framework' },
  { id: 'next', label: 'Next.js', type: 'frontend', color: '#38bdf8', category: 'App Router' },
  { id: 'odoo', label: 'Odoo 16 ERP', type: 'erp', color: '#a78bfa', category: 'Enterprise ERP' },
  { id: 'tailwind', label: 'Tailwind CSS', type: 'frontend', color: '#22d3ee', category: 'Utility UI' },
  { id: 'sql', label: 'SQL Engine', type: 'database', color: '#f59e0b', category: 'Data Queries' },
  { id: 'git', label: 'Git / GitHub', type: 'tool', color: '#f97316', category: 'VCS & CI/CD' },
  { id: 'docker', label: 'Docker', type: 'tool', color: '#0284c7', category: 'Containers' },
  { id: 'redis', label: 'Redis Cache', type: 'database', color: '#ef4444', category: 'In-Memory Cache' },
  { id: 'js', label: 'JavaScript ES6+', type: 'frontend', color: '#facc15', category: 'Core Script' }
];

const connections = [
  { from: 'react', to: 'fastapi' },
  { from: 'next', to: 'fastapi' },
  { from: 'fastapi', to: 'python' },
  { from: 'fastapi', to: 'postgres' },
  { from: 'fastapi', to: 'redis' },
  { from: 'python', to: 'sql' },
  { from: 'python', to: 'odoo' },
  { from: 'odoo', to: 'postgres' },
  { from: 'tailwind', to: 'react' },
  { from: 'docker', to: 'fastapi' },
  { from: 'git', to: 'docker' },
  { from: 'js', to: 'react' }
];

export default function TechPhysicsSandbox({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [gravityMode, setGravityMode] = useState('anti-gravity'); // 'anti-gravity', 'earth', 'vortex'
  const [showLasers, setShowLasers] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [fps, setFps] = useState(60);
  const [activeScore, setActiveScore] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize Physics Nodes
    const radius = 44;
    let bodies = techNodes.map((node, i) => {
      const angle = (i / techNodes.length) * Math.PI * 2;
      return {
        ...node,
        x: width / 2 + Math.cos(angle) * (width * 0.28),
        y: height / 2 + Math.sin(angle) * (height * 0.28),
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: radius,
        isDragging: false,
        pulseAngle: Math.random() * Math.PI * 2
      };
    });

    let particles = [];
    let draggedBody = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let vortexPos = null;
    let animationFrameId;
    let lastTime = performance.now();
    let frameCount = 0;

    const spawnParticles = (x, y, color, count = 12) => {
      if (!particlesEnabled) return;
      for (let i = 0; i < count; i++) {
        const speed = Math.random() * 5 + 1;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
          color,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.015
        });
      }
    };

    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseDown = (e) => {
      const pos = getMousePos(e);
      let hit = false;
      for (let body of bodies) {
        const dist = Math.hypot(body.x - pos.x, body.y - pos.y);
        if (dist < body.radius) {
          draggedBody = body;
          body.isDragging = true;
          dragOffsetX = pos.x - body.x;
          dragOffsetY = pos.y - body.y;
          soundFx.playClick();
          spawnParticles(pos.x, pos.y, body.color, 15);
          hit = true;
          setActiveScore((prev) => prev + 10);
          break;
        }
      }
      if (!hit) {
        vortexPos = pos;
        spawnParticles(pos.x, pos.y, '#22d3ee', 20);
        soundFx.playSynthPulse();
      }
    };

    const handleMouseMove = (e) => {
      const pos = getMousePos(e);
      if (draggedBody) {
        draggedBody.vx = (pos.x - dragOffsetX - draggedBody.x) * 0.35;
        draggedBody.vy = (pos.y - dragOffsetY - draggedBody.y) * 0.35;
        draggedBody.x = pos.x - dragOffsetX;
        draggedBody.y = pos.y - dragOffsetY;
        if (Math.random() < 0.3) {
          spawnParticles(draggedBody.x, draggedBody.y, draggedBody.color, 2);
        }
      }
      if (vortexPos) {
        vortexPos = pos;
      }
    };

    const handleMouseUp = () => {
      if (draggedBody) {
        draggedBody.isDragging = false;
        draggedBody = null;
      }
      vortexPos = null;
    };

    const handleDoubleClick = (e) => {
      const pos = getMousePos(e);
      // Trigger Kinetic Shockwave Burst
      soundFx.playSynthPulse();
      spawnParticles(pos.x, pos.y, '#38bdf8', 40);
      bodies.forEach((b) => {
        const dx = b.x - pos.x;
        const dy = b.y - pos.y;
        const dist = Math.hypot(dx, dy) || 1;
        const force = 3000 / dist;
        b.vx += (dx / dist) * force;
        b.vy += (dy / dist) * force;
      });
      setActiveScore((prev) => prev + 50);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('dblclick', handleDoubleClick);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // 60FPS Gaming Physics & Render Loop
    const render = (currentTime) => {
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      ctx.clearRect(0, 0, width, height);

      // Cyber Matrix Cyber Grid Background
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Gravitational Vortex Rings if active
      if (vortexPos) {
        ctx.save();
        const time = Date.now() * 0.005;
        ctx.beginPath();
        ctx.arc(vortexPos.x, vortexPos.y, 30 + Math.sin(time) * 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 20;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(vortexPos.x, vortexPos.y, 60 + Math.cos(time * 1.5) * 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(129, 140, 248, 0.5)';
        ctx.stroke();
        ctx.restore();
      }

      // Render Laser Synapse Connections
      if (showLasers) {
        connections.forEach((conn) => {
          const nodeA = bodies.find((b) => b.id === conn.from);
          const nodeB = bodies.find((b) => b.id === conn.to);
          if (nodeA && nodeB) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = nodeA.color;
            ctx.lineWidth = 1.8;
            ctx.shadowColor = nodeA.color;
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.restore();

            // Energy Pulsing Orbs along lasers
            const pulseTime = (Date.now() * 0.002) % 1;
            const px = nodeA.x + (nodeB.x - nodeA.x) * pulseTime;
            const py = nodeA.y + (nodeB.y - nodeA.y) * pulseTime;

            ctx.save();
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.restore();
          }
        });
      }

      // Update Particle Effects
      particles = particles.filter((p) => p.alpha > 0);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.size), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      // Update Bodies Physics & Bounce Collisions
      bodies.forEach((b, i) => {
        b.pulseAngle += 0.03;

        if (!b.isDragging) {
          // Apply Selected Gravity Mode Physics
          if (gravityMode === 'earth') {
            b.vy += 0.4; // Downward gravity force
          } else if (gravityMode === 'anti-gravity') {
            // Repel from center gently
            const cx = width / 2;
            const cy = height / 2;
            const dx = b.x - cx;
            const dy = b.y - cy;
            const dist = Math.hypot(dx, dy) || 1;
            b.vx += (dx / dist) * 0.08;
            b.vy += (dy / dist) * 0.08;
          }

          // Apply Vortex Singularity Attractor
          if (vortexPos) {
            const dx = vortexPos.x - b.x;
            const dy = vortexPos.y - b.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < 350) {
              b.vx += (dx / dist) * 0.8;
              b.vy += (dy / dist) * 0.8;
            }
          }

          // Node-to-Node Sphere Collisions
          for (let j = i + 1; j < bodies.length; j++) {
            const b2 = bodies[j];
            const dx = b2.x - b.x;
            const dy = b2.y - b.y;
            const dist = Math.hypot(dx, dy);
            const minDist = b.radius + b2.radius;

            if (dist < minDist && dist > 0) {
              const overlap = minDist - dist;
              const nx = dx / dist;
              const ny = dy / dist;

              b.x -= nx * overlap * 0.5;
              b.y -= ny * overlap * 0.5;
              b2.x += nx * overlap * 0.5;
              b2.y += ny * overlap * 0.5;

              // Elastic velocity swap
              const kx = b.vx - b2.vx;
              const ky = b.vy - b2.vy;
              const p = 2 * (nx * kx + ny * ky) / 2;

              b.vx -= p * nx * 0.9;
              b.vy -= p * ny * 0.9;
              b2.vx += p * nx * 0.9;
              b2.vy += p * ny * 0.9;

              spawnParticles((b.x + b2.x) / 2, (b.y + b2.y) / 2, b.color, 4);
            }
          }

          // Positional updates & Damping
          b.x += b.vx;
          b.y += b.vy;
          b.vx *= 0.985;
          b.vy *= 0.985;

          // Elastic Wall Bounces
          if (b.x - b.radius < 0) {
            b.x = b.radius;
            b.vx *= -0.85;
          }
          if (b.x + b.radius > width) {
            b.x = width - b.radius;
            b.vx *= -0.85;
          }
          if (b.y - b.radius < 0) {
            b.y = b.radius;
            b.vy *= -0.85;
          }
          if (b.y + b.radius > height) {
            b.y = height - b.radius;
            b.vy *= -0.85;
          }
        }

        // Render Futuristic Orb Node
        ctx.save();
        ctx.beginPath();
        const pulseR = b.radius + Math.sin(b.pulseAngle) * 2;
        ctx.arc(b.x, b.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
        ctx.fill();

        ctx.lineWidth = b.isDragging ? 3.5 : 2;
        ctx.strokeStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = b.isDragging ? 30 : 14;
        ctx.stroke();

        // Node Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.label, b.x, b.y - 4);

        // Subtitle Category
        ctx.fillStyle = b.color;
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText(b.category, b.x, b.y + 12);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('dblclick', handleDoubleClick);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen, gravityMode, showLasers, particlesEnabled]);

  const triggerShockwave = () => {
    soundFx.playSynthPulse();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    setActiveScore((prev) => prev + 100);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Gaming Physics Arcade Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl h-[85vh] bg-slate-950 border-2 border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col font-sans"
        >
          {/* Futuristic Gaming HUD Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-20 select-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FaGamepad className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white font-heading tracking-tight flex items-center gap-2">
                  Anti-Gravity Tech Physics Sandbox <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono border border-cyan-500/40">v3.0 GAMING HQ</span>
                </h3>
                <span className="text-xs text-slate-400">Interactive Kinetic Collision Simulator & Architecture Visualizer</span>
              </div>
            </div>

            {/* Live Stats HUD Counters */}
            <div className="hidden lg:flex items-center gap-3 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>FPS: {fps}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400">
                <span>NODES: {techNodes.length}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/40 text-amber-400 font-bold">
                <span>SCORE: {activeScore} XP</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
              aria-label="Close Arcade Sandbox"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Gaming Control Toolbar */}
          <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0 select-none z-20">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 font-mono font-bold uppercase text-[10px] mr-1">Modes:</span>
              
              <button
                onClick={() => {
                  setGravityMode(gravityMode === 'earth' ? 'anti-gravity' : 'earth');
                  soundFx.playSynthPulse();
                }}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                  gravityMode === 'earth'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <FaRocket /> {gravityMode === 'earth' ? 'Earth Gravity ON' : 'Zero-G Anti-Gravity'}
              </button>

              <button
                onClick={() => {
                  setShowLasers(!showLasers);
                  soundFx.playClick();
                }}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                  showLasers
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <FaProjectDiagram /> {showLasers ? 'Laser Synapse ON' : 'Laser Synapse OFF'}
              </button>

              <button
                onClick={() => {
                  setParticlesEnabled(!particlesEnabled);
                  soundFx.playBeep();
                }}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 ${
                  particlesEnabled
                    ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <FaBolt /> {particlesEnabled ? 'VFX Particles ON' : 'VFX Particles OFF'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px] font-mono hidden sm:inline">
                Double-click canvas to trigger Kinetic Blast!
              </span>
            </div>
          </div>

          {/* Interactive Gaming Canvas Playfield */}
          <div className="flex-1 relative w-full h-full bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Gaming HUD Overlay Controls */}
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="glass-panel px-4 py-2 rounded-xl text-slate-300 border border-cyan-500/30 flex items-center gap-2 shadow-xl backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-[11px]">
                  <strong>Gaming Controls:</strong> Click & Drag Spheres | Hold Click for Gravitational Vortex | Double-Click for Shockwave Blast
                </span>
              </div>

              <div className="pointer-events-auto flex items-center gap-2">
                <button
                  onClick={() => setActiveScore(0)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors text-xs font-mono flex items-center gap-1"
                >
                  <FaUndo className="w-3 h-3" /> Reset Score
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


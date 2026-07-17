"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "../i18n/routing";
import { ArrowUpRight } from "lucide-react";

// ─── Pre-compute galaxy spiral particles (module-level, done once) ────────────
const GALAXY_PTS = (() => {
  type GPt = { r: number; a: number; dy: number; sz: number; op: number };
  const pts: GPt[] = [];
  // Dense core
  for (let i = 0; i < 90; i++) {
    const r = Math.random() * 20;
    pts.push({ r, a: Math.random() * Math.PI * 2, dy: (Math.random() - 0.5) * 8, sz: 1.2 + Math.random() * 2.8, op: 0.6 + Math.random() * 0.4 });
  }
  // Two spiral arms
  for (let arm = 0; arm < 2; arm++) {
    for (let i = 0; i < 180; i++) {
      const t = i / 180;
      const r = 20 + t * 140;
      const spiral = t * Math.PI * 4 + arm * Math.PI;
      const scatter = (Math.random() - 0.5) * r * 0.28;
      pts.push({
        r: r + scatter * 0.4,
        a: spiral + scatter * 0.06,
        dy: (Math.random() - 0.5) * 12,
        sz: Math.max(0.4, 2.4 - t * 1.9),
        op: Math.max(0.08, 0.9 - t * 0.72),
      });
    }
  }
  // Sparse halo
  for (let i = 0; i < 80; i++) {
    const r = 85 + Math.random() * 75;
    pts.push({ r, a: Math.random() * Math.PI * 2, dy: (Math.random() - 0.5) * 20, sz: 0.4 + Math.random() * 0.9, op: 0.06 + Math.random() * 0.18 });
  }
  return pts;
})();

export default function InteractiveLanding() {
  const t = useTranslations();
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeSectionRef = useRef(0);
  const [activeSection, setActiveSection] = useState(0);
  // 6 slides: Hero / Reliability / Clarity / DoWeNeedCode / CauseEffect / YouBePerception
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);

  // ─── IntersectionObserver ───────────────────────────────────────────────────
  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, idx) => {
      if (!el) return;
      const o = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { setActiveSection(idx); activeSectionRef.current = idx; }
          });
        },
        { threshold: 0.5 }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  // ─── Canvas animation ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = Math.round(window.innerWidth * 0.97);
      H = canvas.height = Math.round(window.innerHeight * 0.65);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse for cursor interaction
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    // ── Particle pool ──────────────────────────────────────────────────────────
    const N = 500;
    const pts = Array.from({ length: N }, (_, i) => ({
      norm: i / N,
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 400,
      z: (Math.random() - 0.5) * 200,
      theta: (i / N) * Math.PI * 2 + Math.random() * 0.3,
      phi: (Math.random() - 0.5) * Math.PI * 0.3,
      radius: 90 + Math.random() * 50,
      speed: 0.004 + Math.random() * 0.006,
      size: 1.8 + Math.random() * 2.4,
      alpha: 0.5 + Math.random() * 0.5,
      sz: 60 + Math.random() * 600,
      sx: (Math.random() - 0.5) * 2400,
      sy: (Math.random() - 0.5) * 1600,
    }));

    // ── Galaxy rotation ────────────────────────────────────────────────────────
    let galaxyRot = 0;

    // ── Helix (slide 6) ────────────────────────────────────────────────────────
    const HELIX_N = 220;
    const helixPts = Array.from({ length: HELIX_N }, (_, i) => {
      const t = i / HELIX_N;
      const turns = 5;
      const a = t * turns * Math.PI * 2;
      const r = 22 + t * 80; // conical: narrow at top, wide at bottom
      const y = -130 + t * 280;
      return { a, r, y, t };
    });
    let helixT = 0, helixDir = 1;

    // ── 3D rotation helper ─────────────────────────────────────────────────────
    const rot3D = (px: number, py: number, pz: number, rx: number, ry: number): [number, number, number] => {
      const cy = Math.cos(ry), sy = Math.sin(ry);
      const x1 = px * cy + pz * sy;
      const z1 = -px * sy + pz * cy;
      const cx2 = Math.cos(rx), sx2 = Math.sin(rx);
      return [x1, py * cx2 - z1 * sx2, py * sx2 + z1 * cx2];
    };

    // ── Cube draw ──────────────────────────────────────────────────────────────
    const cube = (cx: number, cy: number, s: number, t: number) => {
      const fy = cy + Math.sin(t) * 9;
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.9)"; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(cx, fy - s); ctx.lineTo(cx + s * 0.86, fy - s * 0.5); ctx.lineTo(cx, fy); ctx.lineTo(cx - s * 0.86, fy - s * 0.5); ctx.closePath();
      ctx.fillStyle = "rgba(18,18,18,0.92)"; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - s * 0.86, fy - s * 0.5); ctx.lineTo(cx, fy); ctx.lineTo(cx, fy + s); ctx.lineTo(cx - s * 0.86, fy + s * 0.5); ctx.closePath();
      ctx.fillStyle = "rgba(8,8,8,0.96)"; ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, fy); ctx.lineTo(cx + s * 0.86, fy - s * 0.5); ctx.lineTo(cx + s * 0.86, fy + s * 0.5); ctx.lineTo(cx, fy + s); ctx.closePath();
      ctx.fillStyle = "rgba(3,3,3,0.98)"; ctx.fill(); ctx.stroke();
      ctx.restore();
    };

    let time = 0, animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      time += 0.016;
      const state = activeSectionRef.current;
      const CX = W / 2, CY = H / 2;
      const mx = (mouse.x - window.innerWidth / 2) / window.innerWidth;
      const my = (mouse.y - window.innerHeight / 2) / window.innerHeight;

      // ════════ STATE 0: Orbiting ring + 3 cubes ════════════════════════════════
      if (state === 0) {
        pts.forEach((p) => {
          p.theta += p.speed;
          const px = p.radius * Math.cos(p.theta);
          const py = p.radius * Math.sin(p.theta) * Math.sin(p.phi) * 0.35;
          const pz = p.radius * Math.sin(p.theta) * Math.cos(p.phi);
          const persp = 350 / (350 + pz + 60);
          ctx.beginPath();
          ctx.arc(CX + px * persp, CY + py * persp, p.size * persp, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${p.alpha * Math.max(0.3, persp)})`;
          ctx.fill();
        });
        ctx.save();
        ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(CX - 145, CY); ctx.lineTo(CX + 145, CY); ctx.stroke();
        ctx.restore();
        cube(CX - 100, CY, 28, time * 1.5);
        cube(CX, CY, 28, time * 1.5 + Math.PI * 0.67);
        cube(CX + 100, CY, 28, time * 1.5 + Math.PI * 1.33);

      // ════════ STATE 1 & 2: Full-width sine wave ════════════════════════════════
      } else if (state === 1 || state === 2) {
        pts.forEach((p) => {
          const tx = p.norm * W * 1.3 - W * 0.65;
          const wy = Math.sin(tx * 0.013 + time * 2.2) * 85;
          const wz = Math.cos(tx * 0.013 + time * 2.2) * 20;
          p.x += (tx - p.x) * 0.055;
          p.y += (wy - p.y) * 0.055;
          p.z += (wz - p.z) * 0.055;
          const persp = 380 / (380 + p.z);
          ctx.beginPath();
          ctx.arc(CX + p.x * persp, CY + p.y * persp, p.size * persp, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${p.alpha * persp * 0.95})`;
          ctx.fill();
        });

      // ════════ STATE 3: Starfield ═══════════════════════════════════════════════
      } else if (state === 3) {
        pts.forEach((p) => {
          const prevZ = p.sz;
          p.sz -= 4.5;
          if (p.sz < 1) { p.sz = 600; p.sx = (Math.random() - 0.5) * W * 3; p.sy = (Math.random() - 0.5) * H * 3; return; }
          const s1 = 250 / prevZ, s2 = 250 / p.sz;
          const x1 = CX + p.sx * s1, y1 = CY + p.sy * s1;
          const x2 = CX + p.sx * s2, y2 = CY + p.sy * s2;
          if (x2 < -20 || x2 > W + 20 || y2 < -20 || y2 > H + 20) return;
          const br = Math.min(1, (1 - p.sz / 600) * 1.5);
          const starSz = Math.max(0.5, br * p.size * 0.7);
          ctx.save();
          ctx.strokeStyle = `rgba(255,255,255,${br * p.alpha * 0.8})`; ctx.lineWidth = starSz;
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
          ctx.restore();
          ctx.beginPath(); ctx.arc(x2, y2, starSz * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${br * p.alpha})`; ctx.fill();
        });

      // ════════ STATE 4: GALAXY SPIRAL — Cause & Effect ══════════════════════════
      } else if (state === 4) {
        galaxyRot += 0.0035;
        const tiltX = 0.42 + my * 0.18;  // galaxy disk tilt (cursor up-down)
        const viewY = mx * Math.PI * 0.55; // viewer orbit (cursor left-right)
        const gScale = Math.min(W, H) * 0.0028; // scene scale

        GALAXY_PTS.forEach((gp) => {
          const angle = gp.a + galaxyRot;
          // Galaxy disk in XZ plane
          const gx = gp.r * Math.cos(angle);
          const gz = gp.r * Math.sin(angle);
          const gy = gp.dy; // small vertical scatter

          // Tilt disk around X axis
          const tiltedY = gy * Math.cos(tiltX) - gz * Math.sin(tiltX);
          const tiltedZ = gy * Math.sin(tiltX) + gz * Math.cos(tiltX);

          // Apply cursor Y rotation
          const [rx, ry, rz] = rot3D(gx, tiltedY, tiltedZ, 0, viewY);

          const persp = 320 / (320 + rz * gScale + 80);
          const sx = CX + rx * gScale * persp;
          const sy = CY + ry * gScale * persp;
          if (sx < -15 || sx > W + 15 || sy < -15 || sy > H + 15) return;

          ctx.beginPath();
          ctx.arc(sx, sy, gp.sz * persp, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${gp.op * persp})`;
          ctx.fill();
        });

      // ════════ STATE 5: HELIX VORTEX — You be the perception ═══════════════════
      } else if (state === 5) {
        const rotY = mx * Math.PI * 1.1;
        const rotX = my * Math.PI * 0.35;
        const hScale = Math.min(W, H) * 0.0038;

        // Advance sphere along helix
        helixT += 0.007 * helixDir;
        if (helixT > 1) { helixT = 1; helixDir = -1; }
        if (helixT < 0) { helixT = 0; helixDir = 1; }

        // Draw helix dots
        helixPts.forEach((hp) => {
          const px = hp.r * Math.cos(hp.a) * hScale;
          const pz = hp.r * Math.sin(hp.a) * hScale;
          const py = hp.y * hScale;
          const [rx, ry, rz] = rot3D(px, py, pz, rotX, rotY);
          const persp = 480 / (480 + rz + 120);
          const sx = CX + rx * persp;
          const sy = CY + ry * persp;
          const op = (0.25 + hp.t * 0.55) * persp;
          const sz = Math.max(0.4, (1.8 - hp.t) * persp);
          ctx.beginPath();
          ctx.arc(sx, sy, sz, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${op})`;
          ctx.fill();
        });

        // Glowing sphere
        const sIdx = Math.min(HELIX_N - 1, Math.floor(helixT * HELIX_N));
        const sh = helixPts[sIdx];
        const spx = sh.r * Math.cos(sh.a) * hScale;
        const spz = sh.r * Math.sin(sh.a) * hScale;
        const spy = sh.y * hScale;
        const [srx, sry, srz] = rot3D(spx, spy, spz, rotX, rotY);
        const sPersp = 480 / (480 + srz + 120);
        const ssx = CX + srx * sPersp;
        const ssy = CY + sry * sPersp;

        const grd = ctx.createRadialGradient(ssx, ssy, 0, ssx, ssy, 18);
        grd.addColorStop(0, "rgba(255,255,255,1)");
        grd.addColorStop(0.35, "rgba(255,255,255,0.5)");
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.arc(ssx, ssy, 18, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const showDot = activeSection === 1 || activeSection === 2;

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#060606] font-sans">

      {/* ── Fixed fullscreen canvas ───────────────────────────────────────── */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <canvas ref={canvasRef} style={{ display: "block" }} />
      </div>

      {/* ── .?. semi-circle for slides 2 & 3 ─────────────────────────────── */}
      <div
        className="fixed left-0 top-[20%] z-50 pointer-events-none"
        style={{
          transition: "opacity 700ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1)",
          opacity: showDot ? 1 : 0,
          transform: showDot ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <svg style={{ height: "50vh", width: "auto" }} viewBox="0 0 400 1000"
          xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet">
          <path d="M 0 0 L 0 1000 A 400 500 0 0 0 0 0 Z" fill="rgba(255,255,255,1)" />
          <text x="250" y="500" textAnchor="middle" dominantBaseline="central"
            fontSize="150" fontWeight="600" fill="rgba(0,0,0,1)" fontFamily="inter,sans-serif">
            .?.:
          </text>
        </svg>
      </div>

      {/* ── Native CSS snap scroll ────────────────────────────────────────── */}
      <div
        className="w-full h-screen overflow-y-auto"
      >

        {/* ═══ SLIDE 1: Hero ════════════════════════════════════════════════ */}
        <div ref={(el) => { sectionRefs.current[0] = el; }}
          className="h-screen relative pt-[2%]">
          <div className="absolute top-[10%] left-0 p-4">
            <h1 className="font-extrabold leading-none tracking-wider text-white uppercase text-[2rem] sm:text-[3rem] lg:text-[5rem]">
              RAHMATSHO MUHAMMAD
              <br />
              <span className="font-thin tracking-widest whitespace-nowrap text-[0.7rem] sm:text-[1.25rem] lg:text-[1.5rem]">
                Frontend Engineer
              </span>
            </h1>
          </div>
          <div className="absolute bottom-[6%] right-4 md:right-8 flex flex-col items-end gap-3 md:gap-5">
            <div className="max-w-[52%]">
              <p className="font-thin text-right text-white/70 text-[3vw] md:text-[1.5vw] leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
            <h2 className="text-right font-bold text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight text-white">
              {t("narrative.slide1_cta")}
            </h2>
          </div>
        </div>

        {/* ═══ SLIDE 2: Reliability ═════════════════════════════════════════ */}
        <div ref={(el) => { sectionRefs.current[1] = el; }}
          className="h-screen relative pt-[2%]">
          {/* left-[13vw] clears the .?. semi-circle */}
          <div className="absolute top-[10%] left-[13vw] p-4 max-w-[40%]">
            <p className="font-thin text-white text-[0.85rem] md:text-[1.1rem] leading-relaxed">
              <b className="font-bold">Asking questions</b> is important!
              <br />
              Building isn&apos;t hard, knowing{" "}
              <b className="font-bold">what and how</b> to build is.
            </p>
          </div>
          <div className="absolute bottom-[6%] right-4 md:right-8 flex flex-col items-end">
            <h2 className="text-right font-bold text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight text-white">
              {t("narrative.slide2_cta")}
            </h2>
          </div>
        </div>

        {/* ═══ SLIDE 3: Clarity ═════════════════════════════════════════════ */}
        <div ref={(el) => { sectionRefs.current[2] = el; }}
          className="h-screen relative pt-[2%]">
          <div className="absolute top-[10%] left-[13vw] p-4 max-w-[40%]">
            <p className="font-thin text-white text-[0.85rem] md:text-[1.1rem] leading-relaxed">
              <b className="font-bold">Asking questions</b> is important!
              <br />
              Building isn&apos;t hard, knowing{" "}
              <b className="font-bold">what and how</b> to build is.
            </p>
          </div>
          <div className="absolute bottom-[6%] right-4 md:right-8 flex flex-col items-end">
            <h2 className="text-right font-bold text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight text-white">
              {t("narrative.slide3_cta")}
            </h2>
          </div>
        </div>

        {/* ═══ SLIDE 4: Do we need code ═════════════════════════════════════ */}
        <div ref={(el) => { sectionRefs.current[3] = el; }}
          className="h-screen relative pt-[2%]">
          <div className="absolute top-[10%] right-2 md:right-4 p-4 max-w-[42%]">
            <p className="font-thin text-white text-[0.85rem] md:text-[1.1rem] leading-relaxed text-right">
              Yes AI can code and refactor. But can it think for us?
              <br />
              Testing and Developing only what&apos;s{" "}
              <b className="font-bold">needed.</b>
            </p>
          </div>
          <div className="absolute bottom-[6%] left-4 md:left-8 flex flex-col items-start">
            <h2 className="text-left font-bold text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight text-white">
              {t("narrative.slide4_cta")}
            </h2>
          </div>
        </div>

        {/* ═══ SLIDE 5: Cause & Effect (Galaxy animation) ═══════════════════ */}
        <div ref={(el) => { sectionRefs.current[4] = el; }}
          className="h-screen relative pt-[2%]">
          <div className="absolute top-[10%] left-2 md:left-4 p-4 max-w-[42%]">
            <p className="font-thin text-white text-[0.85rem] md:text-[1.1rem] leading-relaxed">
              {t("narrative.slide5_text")}
            </p>
          </div>
          <div className="absolute bottom-[6%] right-4 md:right-8 flex flex-col items-end">
            <h2 className="text-right font-bold text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight text-white">
              {t("narrative.slide5_cta")}
            </h2>
          </div>
        </div>

        {/* ═══ SLIDE 6: You be the perception (Helix animation) ════════════ */}
        <div ref={(el) => { sectionRefs.current[5] = el; }}
          className="h-screen relative pt-[2%]">
          <div className="absolute top-[10%] right-2 md:right-4 p-4 max-w-[42%]">
            <p className="font-thin text-white text-[0.85rem] md:text-[1.1rem] leading-relaxed text-right">
              {t("narrative.slide6_text")}
              <br />
              <button
                onClick={() => router.push("/about")}
                className="font-bold text-white hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer"
              >
                <span>{t("narrative.connect")}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </p>
          </div>
          <div className="absolute bottom-[6%] left-4 md:left-8 flex flex-col items-start">
            <h2 className="text-left font-bold text-[1.8rem] sm:text-[3rem] md:text-[7vw] lg:text-[5vw] leading-tight text-white">
              {t("narrative.slide6_cta")}
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

# Upgrade brief — read before every phase

Hard constraints: additive only, no IA/copy/section-order changes, keep the
existing stack (Next.js 15, React 19, TS, Tailwind v4, GSAP+ScrollTrigger,
Lenis, Framer Motion, D3.js). New deps (three, @react-three/fiber, and
@react-three/drei only if a specific helper is needed) must be dynamically
imported, ssr:false. One signature 3D moment in the Hero only — restraint
everywhere else.

Locked tokens: Playfair Display (display) + DM Sans (body). Colors: Obsidian,
Stone, Gold, Forest. Source of truth: lib/design-tokens.ts (Phase 0).

Scroll coordination — there is exactly ONE scroll driver in this app:
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
Nothing else (Hero3D, JourneyScroll) gets its own scroll/rAF listener — they
all read progress from this one source.

8-point target (don't ship a change that doesn't trace to one of these):
1 Point of view  2 Typography  3 Color system  4 Hierarchy
5 Imagery intent  6 Motion  7 Mobile designed  8 Invisible (perf/a11y/SEO)

After finishing any phase: run `npm run build` + `eslint`, commit with a
message in the form `phase(N): <summary>`, update PHASE_LOG.md, then stop
and report back. Do not start the next phase in the same session unless told to.

export const tokens = {
  colors: {
    obsidian: '#0B0806', // Primary — deepest black (roasted espresso-bean)
    obsidianSoft: '#16110E', // Cards, surfaces (roasted dark coffee brown)
    stone: '#F5F0E8', // Secondary — warm ivory
    stoneSoft: '#EDE8DE', // Backgrounds, fills
    gold: '#C9A84C', // Accent — champagne gold
    goldLight: '#E2C97E', // Gold hover state
    forest: '#1E3A2F', // Support — deep forest mineral
    forestMid: '#2D5040', // Forest mid tone
    fogGray: '#8A8A8A', // Neutral — architectural gray
    fogLight: '#BDBDBD', // Light gray text
    fogDark: '#3A3A3A', // Dark gray
    white: '#FFFFFF',
    glass: 'rgba(255,255,255,0.04)',
    glassBorder: 'rgba(255,255,255,0.08)',
  },

  typography: {
    display: '"Playfair Display", Georgia, serif',
    body: '"DM Sans", system-ui, sans-serif',
    sizes: {
      hero: 'clamp(4rem, 10vw, 9rem)',
      section: 'clamp(2.5rem, 5vw, 5rem)',
      heading: 'clamp(1.5rem, 3vw, 2.5rem)',
      lead: 'clamp(1.1rem, 1.5vw, 1.35rem)',
      body: '1rem',
      caption: '0.8125rem',
      micro: '0.6875rem',
    },
    tracking: {
      hero: '-0.03em',
      heading: '-0.02em',
      caption: '0.12em',
      caps: '0.2em',
    },
    leading: {
      hero: 1.0,
      heading: 1.15,
      body: 1.7,
    },
  },

  spacing: {
    section: 'clamp(6rem, 12vw, 14rem)',
    gutter: 'clamp(1.5rem, 4vw, 3rem)',
    gap: 'clamp(1rem, 2vw, 2rem)',
  },

  motion: {
    ease: {
      out: [0.16, 1, 0.3, 1],
      inOut: [0.87, 0, 0.13, 1],
      spring: { type: 'spring', stiffness: 100, damping: 20 },
      springFast: { type: 'spring', stiffness: 260, damping: 30 },
    },
    duration: {
      instant: 0.15,
      fast: 0.3,
      normal: 0.6,
      slow: 1.0,
      cinematic: 1.8,
    },
  },

  breakpoints: {
    mobile: '375px',
    tablet: '768px',
    desktop: '1280px',
    wide: '1600px',
  },
};

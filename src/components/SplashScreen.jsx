import React, { useEffect, useState } from 'react';

/**
 * SplashScreen – plays once on app open.
 * Phases:
 *  0 → logo animates in  (0–600 ms)
 *  1 → subtitle fades in (600–1 100 ms)
 *  2 → pulse ring        (1 100–1 800 ms)
 *  3 → whole screen fades out (1 800–2 300 ms)
 *  done → unmounts
 */
export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => onDone(), 2350);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)',
        opacity: phase === 3 ? 0 : 1,
        transition: phase === 3 ? 'opacity 0.5s ease' : 'none',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* Ambient glow blob */}
      <div style={{
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
        filter: 'blur(40px)',
        transform: phase >= 1 ? 'scale(1.3)' : 'scale(0.8)',
        transition: 'transform 1.2s ease',
      }} />

      {/* Pulse ring */}
      <div style={{
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: '50%',
        border: '1.5px solid rgba(59,130,246,0.35)',
        opacity: phase === 2 ? 1 : 0,
        transform: phase === 2 ? 'scale(2.2)' : 'scale(1)',
        transition: 'opacity 0.6s ease, transform 0.7s ease',
      }} />
      <div style={{
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: '50%',
        border: '1px solid rgba(59,130,246,0.15)',
        opacity: phase === 2 ? 1 : 0,
        transform: phase === 2 ? 'scale(3.2)' : 'scale(1)',
        transition: 'opacity 0.8s ease 0.1s, transform 0.9s ease 0.1s',
      }} />

      {/* Logo mark icon */}
      <div style={{
        width: 72,
        height: 72,
        borderRadius: 20,
        background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        boxShadow: '0 0 40px rgba(99,102,241,0.45)',
        opacity: phase >= 0 ? 1 : 0,
        transform: phase >= 0 ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Hamburger lines as brand icon */}
        <svg width="34" height="28" viewBox="0 0 34 28" fill="none">
          <rect x="0" y="0"  width="20" height="4" rx="2" fill="white" opacity="0.9"/>
          <rect x="0" y="12" width="34" height="4" rx="2" fill="white"/>
          <rect x="0" y="24" width="20" height="4" rx="2" fill="white" opacity="0.9"/>
        </svg>
      </div>

      {/* Brand name – letter-by-letter stagger */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        {['R','F','Q'].map((ch, i) => (
          <span
            key={ch + i}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 52,
              color: '#3B82F6',
              opacity: phase >= 0 ? 1 : 0,
              transform: phase >= 0 ? 'translateY(0)' : 'translateY(28px)',
              transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.5s cubic-bezier(0.34,1.4,0.64,1) ${i * 0.07}s`,
              display: 'inline-block',
              lineHeight: 1,
            }}
          >
            {ch}
          </span>
        ))}
        {['B','i','d'].map((ch, i) => (
          <span
            key={ch + 'bid' + i}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: 52,
              color: '#F1F5F9',
              opacity: phase >= 0 ? 1 : 0,
              transform: phase >= 0 ? 'translateY(0)' : 'translateY(28px)',
              transition: `opacity 0.4s ease ${0.21 + i * 0.07}s, transform 0.5s cubic-bezier(0.34,1.4,0.64,1) ${0.21 + i * 0.07}s`,
              display: 'inline-block',
              lineHeight: 1,
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      {/* Subtitle */}
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 400,
        fontSize: 15,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(148,163,184,0.85)',
        marginTop: 14,
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}>
        Real-Time Auction Platform
      </p>

      {/* Thin progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 3,
        background: 'linear-gradient(90deg, #3B82F6, #6366F1)',
        borderRadius: '0 2px 2px 0',
        width: phase === 3 ? '100%' : phase === 2 ? '85%' : phase === 1 ? '55%' : '20%',
        transition: 'width 0.6s ease',
      }} />
    </div>
  );
}

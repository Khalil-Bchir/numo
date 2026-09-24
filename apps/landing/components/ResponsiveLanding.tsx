"use client";

import React, { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { animate, createTimeline, createScope, stagger, spring } from "animejs";

export function ResponsiveLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [heroState, setHeroState] = useState<1 | 2 | 3>(1);
  const [heroAutoPlay, setHeroAutoPlay] = useState(true);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [activeFeature, setActiveFeature] = useState<"capture" | "balance" | "insights">("capture");
  const [focalToggled, setFocalToggled] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  // Anime.js refs
  const landingRef = useRef<HTMLDivElement>(null);
  const animeScopeRef = useRef<any>(null);

  // Hero demo odometer refs & value stores
  const balanceRef = useRef<HTMLSpanElement>(null);
  const spendRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const balanceAnim = useRef({ val: 1240.0 });
  const spendAnim = useRef({ val: 18.5 });
  const progressAnim = useRef({ val: 68.8 });

  // Section 4 focal stat refs & stores
  const focalRef = useRef<HTMLDivElement>(null);
  const focalAllowanceRef = useRef<HTMLSpanElement>(null);
  const focalBarRef = useRef<HTMLDivElement>(null);
  const focalValue = useRef({ val: 1240.0 });
  const focalAllowanceValue = useRef({ val: 62.0 });
  const focalBarValue = useRef({ width: 68.8 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!heroAutoPlay) return;
    const interval = setInterval(() => {
      setHeroState((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [heroAutoPlay]);

  const toggleHeroAutoPlay = () => {
    setHeroAutoPlay((prev) => !prev);
  };

  // Anime.js Root Scope & Entrance Animations
  useEffect(() => {
    if (!landingRef.current) return;

    animeScopeRef.current = createScope({ root: landingRef.current }).add(() => {
      // 1. Hero Content Stagger Entrance
      animate(".anime-hero-item", {
        y: [24, 0],
        opacity: [0, 1],
        duration: 800,
        delay: stagger(90, { start: 80 }),
        ease: "out(3)",
      });

      // 2. Hero Interactive Stage Surface Glide-in
      animate(".hero-stage-surface", {
        y: [32, 0],
        scale: [0.96, 1],
        opacity: [0, 1],
        duration: 950,
        delay: 200,
        ease: "out(4)",
      });

      // 3. Ambient Breathing Gradient Orbs (looping)
      animate(".ambient-orb-1", {
        x: [-20, 20],
        y: [-14, 14],
        scale: [0.94, 1.06],
        duration: 6500,
        ease: "inOutQuad",
        loop: true,
        alternate: true,
      });

      animate(".ambient-orb-2", {
        x: [20, -20],
        y: [14, -14],
        scale: [1.06, 0.94],
        duration: 7500,
        ease: "inOutQuad",
        loop: true,
        alternate: true,
      });

      // 4. Subtle pulse for live demo active status badge
      animate(".anime-live-dot", {
        scale: [1, 1.35, 1],
        opacity: [0.7, 1, 0.7],
        duration: 2000,
        ease: "inOutQuad",
        loop: true,
      });
    });

    // 5. Scroll Reveal with IntersectionObserver
    const observerOptions = { threshold: 0.12, rootMargin: "0px 0px -40px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          if (target.id === "how-it-works") {
            animate(".anime-step-card", {
              y: [28, 0],
              opacity: [0, 1],
              duration: 750,
              delay: stagger(110),
              ease: "out(3)",
            });
            observer.unobserve(target);
          } else if (target.id === "features") {
            animate(".anime-feat-item", {
              y: [24, 0],
              opacity: [0, 1],
              duration: 700,
              delay: stagger(90),
              ease: "out(3)",
            });
            animate(".anime-feat-canvas", {
              scale: [0.96, 1],
              opacity: [0, 1],
              duration: 850,
              delay: 150,
              ease: "out(4)",
            });
            observer.unobserve(target);
          } else if (target.id === "privacy") {
            animate(".anime-privacy-card", {
              y: [24, 0],
              opacity: [0, 1],
              duration: 700,
              delay: stagger(110),
              ease: "out(3)",
            });
            observer.unobserve(target);
          }
        }
      });
    }, observerOptions);

    const stepSection = document.getElementById("how-it-works");
    const featSection = document.getElementById("features");
    const privSection = document.getElementById("privacy");
    if (stepSection) observer.observe(stepSection);
    if (featSection) observer.observe(featSection);
    if (privSection) observer.observe(privSection);

    return () => {
      observer.disconnect();
      if (animeScopeRef.current?.revert) {
        animeScopeRef.current.revert();
      }
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  // Anime.js Hero Demo Live Reactive Transitions (Odometer + spring cards)
  useEffect(() => {
    const isSaved = heroState === 3;
    const targetBalance = isSaved ? 1227.5 : 1240.0;
    const targetSpend = isSaved ? 31.0 : 18.5;
    const targetProgress = isSaved ? 68.1 : 68.8;

    // Smooth numerical tweening for balance
    animate(balanceAnim.current, {
      val: targetBalance,
      duration: 650,
      ease: "out(3)",
      onUpdate: () => {
        if (balanceRef.current) {
          balanceRef.current.textContent = balanceAnim.current.val.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
      },
    });

    // Smooth numerical tweening for today's spend
    animate(spendAnim.current, {
      val: targetSpend,
      duration: 650,
      ease: "out(3)",
      onUpdate: () => {
        if (spendRef.current) {
          spendRef.current.textContent = `${spendAnim.current.val.toFixed(2)} DT`;
        }
      },
    });

    // Progress bar width & label
    animate(progressAnim.current, {
      val: targetProgress,
      duration: 700,
      ease: "out(3)",
      onUpdate: () => {
        if (progressRef.current) {
          progressRef.current.style.width = `${progressAnim.current.val.toFixed(1)}%`;
        }
        if (progressLabelRef.current) {
          progressLabelRef.current.textContent = `${progressAnim.current.val.toFixed(1)}% Left`;
        }
      },
    });

    if (heroState === 3) {
      const list = document.getElementById("hero-tx-list");
      if (list) list.scrollTop = 0;

      // Animate newly added transaction entry with Anime.js spring physics
      const newItem = document.getElementById("tx-new-item");
      if (newItem) {
        animate(newItem, {
          scale: [0.88, 1],
          opacity: [0, 1],
          y: [-12, 0],
          duration: 450,
          ease: spring({ bounce: 0.35 }),
        });
      }

      // Micro balance scale bump to draw eye to the updated metric
      if (balanceRef.current) {
        animate(balanceRef.current, {
          scale: [1, 1.04, 1],
          duration: 380,
          ease: "out(2)",
        });
      }
    } else if (heroState === 2) {
      // Pop in the active input form card
      const formCard = document.getElementById("hero-state-2-view");
      if (formCard) {
        animate(formCard, {
          scale: [0.97, 1],
          opacity: [0, 1],
          duration: 320,
          ease: "out(3)",
        });
      }
    }
  }, [heroState]);

  // Anime.js Feature Canvas Switcher Animation
  useEffect(() => {
    const canvas = document.getElementById("feature-surface-canvas");
    if (canvas) {
      animate(canvas, {
        scale: [0.97, 1],
        opacity: [0, 1],
        y: [8, 0],
        duration: 320,
        ease: "out(3)",
      });
    }
  }, [activeFeature]);

  // Anime.js Focal Stat Number Animation
  useEffect(() => {
    const targetVal = focalToggled ? 1227.5 : 1240.0;
    const targetAllowance = focalToggled ? 61.37 : 62.0;
    const targetWidth = focalToggled ? 68.1 : 68.8;

    animate(focalValue.current, {
      val: targetVal,
      duration: 600,
      ease: "out(3)",
      onUpdate: () => {
        if (focalRef.current) {
          focalRef.current.textContent = focalValue.current.val.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
      },
    });

    animate(focalAllowanceValue.current, {
      val: targetAllowance,
      duration: 600,
      ease: "out(3)",
      onUpdate: () => {
        if (focalAllowanceRef.current) {
          focalAllowanceRef.current.textContent = `${focalAllowanceValue.current.val.toFixed(2)} DT daily allowance`;
        }
      },
    });

    animate(focalBarValue.current, {
      width: targetWidth,
      duration: 650,
      ease: "out(3)",
      onUpdate: () => {
        if (focalBarRef.current) {
          focalBarRef.current.style.width = `${focalBarValue.current.width.toFixed(1)}%`;
        }
      },
    });
  }, [focalToggled]);

  const toggleFocalStat = () => {
    setFocalToggled((prev) => !prev);
  };

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail && waitlistEmail.includes("@")) {
      setWaitlistSubmitting(true);
      setTimeout(() => {
        setWaitlistSubmitting(false);
        setWaitlistSubmitted(true);
      }, 350);
    }
  };

  const resetWaitlist = () => {
    setWaitlistSubmitted(false);
    setWaitlistEmail("");
  };

  return (
    <div ref={landingRef} className="w-full min-h-screen bg-background text-on-surface antialiased selection:bg-primary selection:text-on-primary transition-colors duration-200 relative overflow-x-hidden">

      {/* Mobile Nav Backdrop Scrim with Smooth Fade */}
      <div 
        id="mobile-nav-scrim"
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300 ease-out ${
          mobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileNavOpen(false)}
        aria-hidden="true"
      />

      {/* Top Navigation Bar & Merged Mobile Menu */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none" id="site-header">
        <div className={`w-full max-w-4xl backdrop-blur-xl border border-outline-variant pointer-events-auto rounded-[28px] px-4 sm:px-6 py-2.5 sm:py-3 transition-[max-width,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? "shadow-md" : "shadow-sm"
        } ${
          mobileNavOpen 
            ? "bg-surface-container-low/95 dark:bg-[#161618]/95 shadow-2xl max-w-lg" 
            : "bg-surface/80 dark:bg-surface/80"
        }`}>
          {/* Top Bar / Header Row */}
          <div className="w-full flex items-center justify-between flex-shrink-0">
            <a className="text-base sm:text-body-lg font-headline-sm tracking-tight text-on-surface font-semibold flex items-center gap-2.5" href="#" onClick={() => setMobileNavOpen(false)}>
              <img src="/icons/icon_primary_dark.svg" alt="Numo logo" className="w-6 h-6 rounded-[6px] shadow-xs" />
              Numo
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a className="text-on-surface font-semibold text-label-lg font-label-lg hover:text-primary transition-colors duration-150" href="#features">Features</a>
              <a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150 text-label-lg font-label-lg" href="#how-it-works">How it works</a>
              <a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150 text-label-lg font-label-lg" href="#privacy">Privacy</a>
            </nav>

            {/* Actions: CTA, Theme Toggle (Desktop or Mobile-Open), and Menu Toggle */}
            <div className="flex items-center gap-2">
              <a 
                className={`bg-primary text-on-primary text-xs sm:text-label-lg font-label-lg px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full hover:opacity-90 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] inline-flex items-center shadow-sm font-semibold ${
                  mobileNavOpen ? "opacity-0 scale-90 pointer-events-none hidden md:inline-flex md:opacity-100 md:scale-100 md:pointer-events-auto" : "opacity-100 scale-100"
                }`} 
                href="#waitlist"
              >
                Join the beta
              </a>

              {/* Theme Toggle - Always visible on desktop; on mobile visible next to close button when menu is open */}
              <div 
                id="mobile-theme-toggle-wrap" 
                className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileNavOpen 
                    ? "opacity-100 scale-100 flex items-center" 
                    : "opacity-0 scale-75 pointer-events-none hidden md:flex md:opacity-100 md:scale-100 md:pointer-events-auto"
                }`}
              >
                <ThemeToggle />
              </div>

              {/* Mobile Menu Open/Close Pill Button */}
              <button 
                onClick={() => setMobileNavOpen((prev) => !prev)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-outline-variant/60 bg-surface-container-low text-on-surface hover:bg-surface-container transition-all duration-300 ease-out active:scale-95 cursor-pointer flex-shrink-0" 
                id="btn-mobile-menu" 
                aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              >
                <span className={`material-symbols-outlined text-[19px] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  mobileNavOpen ? "rotate-90 text-primary" : "rotate-0 text-on-surface"
                }`}>
                  {mobileNavOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>

          {/* Merged Mobile Navigation Body with Coordinated Animated Height & Opacity */}
          <div 
            className={`md:hidden w-full grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mobileNavOpen 
                ? "grid-rows-[1fr] opacity-100" 
                : "grid-rows-[0fr] opacity-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              <div className={`pt-3 mt-3 border-t border-outline-variant/50 flex flex-col gap-1.5 transition-all duration-300 delay-50 ease-out ${
                mobileNavOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}>
                <a 
                  className="px-4 py-2.5 rounded-full text-on-surface font-medium hover:bg-surface-container text-sm transition-colors duration-150" 
                  href="#how-it-works" 
                  onClick={() => setMobileNavOpen(false)}
                >
                  How it works
                </a>
                <a 
                  className="px-4 py-2.5 rounded-full text-on-surface font-medium hover:bg-surface-container text-sm transition-colors duration-150" 
                  href="#features" 
                  onClick={() => setMobileNavOpen(false)}
                >
                  Features
                </a>
                <a 
                  className="px-4 py-2.5 rounded-full text-on-surface font-medium hover:bg-surface-container text-sm transition-colors duration-150" 
                  href="#privacy" 
                  onClick={() => setMobileNavOpen(false)}
                >
                  Privacy
                </a>

                {/* Join the beta CTA */}
                <a 
                  className="mt-2 bg-primary text-on-primary text-sm font-semibold px-5 py-3 rounded-full hover:opacity-90 text-center shadow-sm block active:scale-[0.98] transition-all duration-200" 
                  href="#waitlist" 
                  onClick={() => setMobileNavOpen(false)}
                >
                  Join the beta
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow relative">
        {/* Ambient Animated Glow Orbs (Anime.js loop) */}
        <div className="absolute top-16 left-1/4 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none ambient-orb-1 -z-10" />
        <div className="absolute top-32 right-1/4 translate-x-1/2 w-72 sm:w-80 h-72 sm:h-80 bg-tertiary/10 rounded-full blur-3xl pointer-events-none ambient-orb-2 -z-10" />

        {/* Hero Section with Living Interactive Product Surface */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-tint border border-primary-tint anime-hero-item">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span className="text-[13px] font-semibold tracking-wider text-primary uppercase">Personal Finance, Simplified</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[56px] font-display-lg text-on-surface tracking-tight leading-[1.1] text-balance font-bold anime-hero-item">
                Know where your money goes. Without thinking about it.
              </h1>
              <p className="text-base sm:text-lg md:text-body-lg font-body-lg text-on-surface-variant max-w-xl leading-relaxed anime-hero-item">
                Numo makes everyday expense tracking almost effortless. Record a purchase in seconds, see what you have left, and move on.
              </p>
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 anime-hero-item">
                <a className="bg-primary text-on-primary rounded-full px-7 py-3.5 font-label-lg text-label-lg hover:opacity-90 active:scale-[0.98] transition text-center apple-shadow font-semibold" href="#waitlist">
                  Join the beta
                </a>
                <a className="bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low rounded-full px-6 py-3.5 font-label-lg text-label-lg active:scale-[0.98] transition text-center font-medium" href="#how-it-works">
                  See how it works
                </a>
              </div>
              {/* Reassurance Badge */}
              <div className="flex items-center gap-2 pt-2 text-body-sm font-body-sm text-outline anime-hero-item">
                <span className="material-symbols-outlined text-[18px] text-outline">verified_user</span>
                <span>Built for iPhone · Private by design · Free during beta</span>
              </div>
            </div>

            {/* Right Hero: Living Product Demonstration Surface */}
            <div className="lg:col-span-6 w-full max-w-lg lg:max-w-none mx-auto">
              <div className="surface-stage rounded-[28px] p-6 sm:p-7 relative transition-all duration-300 hero-stage-surface">
                {/* Demo Card Header — single row at all sizes */}
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0 anime-live-dot"></span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-outline">Live Numo Demo</span>
                  </div>
                  {/* Compact pill-dot step indicators — never overflow */}
                  <div className="flex items-center gap-1.5">
                    <button id="btn-state-1" onClick={() => setHeroState(1)} title="Ready state"
                      className={`h-1.5 rounded-full transition-all duration-300 ${heroState === 1 ? "w-7 bg-primary" : "w-3 bg-outline-variant hover:bg-outline"}`}
                    />
                    <button id="btn-state-2" onClick={() => setHeroState(2)} title="Entry state"
                      className={`h-1.5 rounded-full transition-all duration-300 ${heroState === 2 ? "w-7 bg-primary" : "w-3 bg-outline-variant hover:bg-outline"}`}
                    />
                    <button id="btn-state-3" onClick={() => setHeroState(3)} title="Saved state"
                      className={`h-1.5 rounded-full transition-all duration-300 ${heroState === 3 ? "w-7 bg-primary" : "w-3 bg-outline-variant hover:bg-outline"}`}
                    />
                    <span className="w-px h-3 bg-outline-variant/60 mx-0.5"></span>
                    <button onClick={toggleHeroAutoPlay} id="btn-hero-autoplay" title="Toggle autoplay"
                      className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-surface-container-low transition"
                    >
                      <span className={`material-symbols-outlined text-[14px] ${heroAutoPlay ? "text-primary" : "text-outline"}`}>sync</span>
                    </button>
                  </div>
                </div>

                {/* Demo Canvas */}
                <div className="pt-4 space-y-4">
                  {/* Balance & Allowance Metric Surface */}
                  <div className="bg-surface-container-high rounded-[22px] border border-outline-variant p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-outline truncate">Monthly Budget</span>
                      <span ref={progressLabelRef} className="text-[11px] font-semibold text-primary px-2 py-0.5 rounded-full bg-primary-tint border border-primary-tint whitespace-nowrap flex-shrink-0" id="hero-progress-label">
                        68.8% Left
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-2">
                      <span ref={balanceRef} className="text-[32px] sm:text-[40px] lg:text-[36px] xl:text-[42px] font-bold tracking-tight text-on-surface tabular-nums" id="hero-balance">
                        1,240.00
                      </span>
                      <span className="text-base font-semibold text-on-surface-variant">DT</span>
                      <span className="text-xs text-outline font-normal">left · Oct</span>
                    </div>
                    <div className="w-full bg-outline-variant/60 h-1.5 rounded-full overflow-hidden mt-3">
                      <div
                        ref={progressRef}
                        className="bg-primary h-full rounded-full"
                        id="hero-progress-bar"
                        style={{ width: "68.8%" }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-outline-variant/60">
                      <div>
                        <span className="text-[11px] text-outline block">Today's spend</span>
                        <span ref={spendRef} className="text-sm font-semibold text-on-surface tabular-nums" id="hero-today-spend">
                          18.50 DT
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-outline block">Daily allowance</span>
                        <span className="text-sm font-semibold text-tertiary tabular-nums">
                          62.00 DT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ═══════════════════════════════════════════════════════
                      State switcher — CSS grid stacking.
                      All 3 states share grid-area 1/1, so this container's
                      height = the tallest state and NEVER changes.
                      Visibility toggled via opacity + pointer-events only.
                  ══════════════════════════════════════════════════════════ */}
                  <div id="hero-action-container" className="grid">

                    {/* State 1 — Record trigger */}
                    <div
                      id="hero-state-1-view"
                      onClick={() => setHeroState(2)}
                      className={`[grid-area:1/1] flex items-center justify-between bg-surface-container-lowest border border-outline-variant rounded-[18px] p-3.5 cursor-pointer hover:border-primary/50 transition-opacity duration-200 ${
                        heroState === 1 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-primary text-on-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-on-surface truncate">Record new expense</p>
                          <p className="text-[11px] text-outline">Tap to test instant capture</p>
                        </div>
                      </div>
                      <span className="flex-shrink-0 ml-2 text-xs font-semibold text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant whitespace-nowrap">
                        + Add
                      </span>
                    </div>

                    {/* State 2 — Entry form */}
                    <div
                      id="hero-state-2-view"
                      className={`[grid-area:1/1] bg-surface-container-lowest border-2 border-primary rounded-[20px] p-3.5 shadow-sm transition-opacity duration-200 ${
                        heroState === 2 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping flex-shrink-0"></span>
                          Instant Capture
                        </span>
                        <span className="text-[10px] text-outline">Tap Save</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-surface-container-high rounded-full px-4 py-2 border border-outline-variant min-w-0">
                          <span className="text-[10px] text-outline block leading-none mb-0.5">Amount</span>
                          <span className="text-lg font-bold text-on-surface tabular-nums leading-none">12.50 <span className="text-xs font-normal text-outline">DT</span></span>
                        </div>
                        <span className="flex-shrink-0 px-3.5 py-2 rounded-full bg-primary-tint border border-primary/30 text-primary text-xs font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">restaurant</span>
                          Food
                        </span>
                        <button
                          onClick={() => setHeroState(3)}
                          className="flex-shrink-0 bg-primary text-on-primary text-xs font-bold px-4 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          Save
                        </button>
                      </div>
                    </div>

                    {/* State 3 — Saved confirmation */}
                    <div
                      id="hero-state-3-view"
                      className={`[grid-area:1/1] bg-primary-tint border border-primary/30 rounded-[18px] p-3.5 flex items-center justify-between transition-opacity duration-200 ${
                        heroState === 3 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-7 h-7 flex-shrink-0 rounded-full bg-primary text-on-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-[15px]">check</span>
                        </span>
                        <span className="text-sm font-semibold text-on-surface truncate">12.50 DT added · Food</span>
                      </div>
                      <span className="flex-shrink-0 ml-2 text-[11px] font-medium text-primary bg-surface-container-lowest px-2.5 py-1 rounded-full border border-primary/20 whitespace-nowrap">
                        0.4s ✓
                      </span>
                    </div>

                  </div>

                  {/* Live Ledger Activity List */}
                  <div>
                    <div className="px-1 mb-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-outline">Today's Transactions</span>
                    </div>
                    {/* Fixed-height scroll container — stays exactly 196px high at all times */}
                    <div className="flex flex-col gap-2 h-[196px] overflow-y-auto pr-1 scrollbar-thin" id="hero-tx-list">
                      {/* New item — conditionally rendered in state 3 with smooth fade/slide in */}
                      {heroState === 3 && (
                        <div
                          id="tx-new-item"
                          className="bg-surface-container-lowest border-2 border-primary/40 p-3 rounded-[16px] flex items-center justify-between shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2 flex-shrink-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-tint text-primary flex items-center justify-center">
                              <span className="material-symbols-outlined text-[17px]">restaurant</span>
                            </div>
                            <div>
                              <p className="text-[13px] font-semibold text-on-surface leading-tight">Food</p>
                              <span className="text-[10px] text-primary font-medium">Just now · Instant Record</span>
                            </div>
                          </div>
                          <span className="text-[13px] font-bold text-on-surface tabular-nums">-12.50 DT</span>
                        </div>
                      )}
                      {/* Initial Transactions */}
                      <div className="bg-surface-container-high p-3 rounded-[16px] border border-outline-variant flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center text-on-surface">
                            <span className="material-symbols-outlined text-[16px]">restaurant</span>
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-on-surface leading-tight">Lunch</p>
                            <span className="text-[10px] text-outline">1:15 PM · Food</span>
                          </div>
                        </div>
                        <span className="text-[13px] font-semibold text-on-surface tabular-nums">-12.00 DT</span>
                      </div>
                      <div className="bg-surface-container-high p-3 rounded-[16px] border border-outline-variant flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center text-on-surface">
                            <span className="material-symbols-outlined text-[16px]">local_taxi</span>
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-on-surface leading-tight">Taxi</p>
                            <span className="text-[10px] text-outline">8:40 AM · Transport</span>
                          </div>
                        </div>
                        <span className="text-[13px] font-semibold text-on-surface tabular-nums">-8.50 DT</span>
                      </div>
                      <div className="bg-surface-container-high p-3 rounded-[16px] border border-outline-variant flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center text-on-surface">
                            <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-on-surface leading-tight">Groceries</p>
                            <span className="text-[10px] text-outline">Yesterday · Essentials</span>
                          </div>
                        </div>
                        <span className="text-[13px] font-semibold text-on-surface tabular-nums">-42.00 DT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Sequential Interactive Steps (Open. Record. Done.) */}
        <section className="py-16 sm:py-20 bg-surface-container-low" id="how-it-works">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-tint border border-primary-tint text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                Simple Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-on-surface tracking-tight font-bold">Open. Record. Done.</h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">
                Three steps are enough to keep your spending under control.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="steps-container">
              {/* Step 1 */}
              <div id="step-card-1" onMouseEnter={() => setActiveStep(1)} onClick={() => setActiveStep(1)} className={`hairline-card rounded-[24px] p-7 transition-all duration-300 cursor-default anime-step-card ${activeStep === 1 ? "step-active" : ""}`}>
                <span className={`step-num font-semibold text-headline-sm font-headline-sm tabular-nums block mb-4 transition-all duration-300 ${activeStep === 1 ? "text-primary" : "text-outline"}`}>01</span>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2 font-semibold">Open</h3>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  Open Numo directly from your Home Screen or Lock Screen widget.
                </p>
              </div>
              {/* Step 2 */}
              <div id="step-card-2" onMouseEnter={() => setActiveStep(2)} onClick={() => setActiveStep(2)} className={`hairline-card rounded-[24px] p-7 transition-all duration-300 cursor-default anime-step-card ${activeStep === 2 ? "step-active" : ""}`}>
                <span className={`step-num font-semibold text-headline-sm font-headline-sm tabular-nums block mb-4 transition-all duration-300 ${activeStep === 2 ? "text-primary" : "text-outline"}`}>02</span>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2 font-semibold">Record</h3>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  Enter the amount and category. No forms, no tagging, no friction.
                </p>
              </div>
              {/* Step 3 */}
              <div id="step-card-3" onMouseEnter={() => setActiveStep(3)} onClick={() => setActiveStep(3)} className={`hairline-card rounded-[24px] p-7 transition-all duration-300 cursor-default anime-step-card ${activeStep === 3 ? "step-active" : ""}`}>
                <span className={`step-num font-semibold text-headline-sm font-headline-sm tabular-nums block mb-4 transition-all duration-300 ${activeStep === 3 ? "text-primary" : "text-outline"}`}>03</span>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2 font-semibold">Done</h3>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  Your budget updates instantly. Close the app and go about your day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Editorial Continuous Product Surface (Transforms across feature states) */}
        <section className="py-16 sm:py-20 md:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8" id="features">
          <div className="max-w-2xl mb-14">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-tint border border-primary-tint text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              System Discipline
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display-md text-on-surface tracking-tight font-bold">
              Everything you need. Nothing you don't.
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mt-3">
              Numo focuses on the few things that make everyday money tracking useful.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Navigation Pills */}
            <div className="lg:col-span-5 space-y-4">
              {/* Tab 1 */}
              <div id="feat-btn-capture" onClick={() => setActiveFeature("capture")} className={`cursor-pointer p-6 rounded-[22px] transition-all duration-200 anime-feat-item ${activeFeature === "capture" ? "border-2 border-primary bg-surface-container-lowest shadow-sm" : "border border-outline-variant bg-surface-container-high hover:bg-surface-container-lowest"}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center ${activeFeature === "capture" ? "bg-primary-tint text-primary" : "bg-surface-container-low text-on-surface"}`}>
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Instant expense capture</h3>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant mt-3 leading-relaxed">
                  Enter an amount, choose a category, and save. No complicated forms or deep hierarchies.
                </p>
              </div>

              {/* Tab 2 */}
              <div id="feat-btn-balance" onClick={() => setActiveFeature("balance")} className={`cursor-pointer p-6 rounded-[22px] transition-all duration-200 anime-feat-item ${activeFeature === "balance" ? "border-2 border-primary bg-surface-container-lowest shadow-sm" : "border border-outline-variant bg-surface-container-high hover:bg-surface-container-lowest"}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center ${activeFeature === "balance" ? "bg-primary-tint text-primary" : "bg-surface-container-low text-on-surface"}`}>
                    <span className="material-symbols-outlined text-[20px]">pie_chart</span>
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Know what you have left</h3>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant mt-3 leading-relaxed">
                  See your remaining monthly budget and today's spending allowance without digging through charts.
                </p>
              </div>

              {/* Tab 3 */}
              <div id="feat-btn-insights" onClick={() => setActiveFeature("insights")} className={`cursor-pointer p-6 rounded-[22px] transition-all duration-200 anime-feat-item ${activeFeature === "insights" ? "border-2 border-primary bg-surface-container-lowest shadow-sm" : "border border-outline-variant bg-surface-container-high hover:bg-surface-container-lowest"}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center ${activeFeature === "insights" ? "bg-primary-tint text-primary" : "bg-surface-container-low text-on-surface"}`}>
                    <span className="material-symbols-outlined text-[20px]">equalizer</span>
                  </span>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Insights without the noise</h3>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant mt-3 leading-relaxed">
                  Understand where your money went with simple summaries instead of complicated financial dashboards.
                </p>
              </div>
            </div>

            {/* Right Continuous Native Surface Display */}
            <div className="lg:col-span-7">
              <div className="hairline-card rounded-[28px] p-7 md:p-9 min-h-[420px] flex flex-col justify-between anime-feat-canvas">
                {/* Top Surface Indicator */}
                <div className="flex items-center justify-between border-b border-outline-variant pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-outline" id="feat-indicator-text">
                      {activeFeature === "capture" ? "Instant Capture Preview" : activeFeature === "balance" ? "Live Balance Engine" : "Clear Financial Summaries"}
                    </span>
                  </div>
                  <span className="text-xs text-outline tabular-nums">Real-time local render</span>
                </div>

                {/* Surface Container with Animated States */}
                <div className="flex-1 flex flex-col justify-center" id="feature-surface-canvas">
                  {/* State A: Capture Content */}
                  {activeFeature === "capture" && (
                    <div className="space-y-4" id="feat-canvas-capture">
                      <div className="bg-surface-container-high rounded-[22px] p-6 border border-outline-variant">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-semibold text-outline uppercase tracking-wider">Quick Record</span>
                          <span className="text-xs text-primary font-medium bg-primary-tint border border-primary-tint px-2.5 py-0.5 rounded-full">Keyboardless entry</span>
                        </div>
                        <div className="bg-surface-container-lowest rounded-[18px] border border-outline-variant p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <span className="text-[11px] text-outline block">Expense Amount</span>
                            <span className="text-3xl font-bold text-on-surface tabular-nums">12.50 <span className="text-lg font-normal text-on-surface-variant">DT</span></span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="rounded-full bg-surface-container-low border border-outline-variant text-on-surface text-xs font-medium px-3.5 py-2 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-primary"></span> Food
                            </span>
                            <button className="bg-primary text-on-primary text-xs font-semibold rounded-full px-5 py-2.5 hover:opacity-90 transition active:scale-95 shadow-sm">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-outline text-center py-3.5 px-4 leading-relaxed">Tapping any category logs the expense with exact timestamp in under a second.</p>
                    </div>
                  )}

                  {/* State B: Balance Content */}
                  {activeFeature === "balance" && (
                    <div className="space-y-4" id="feat-canvas-balance">
                      <div className="bg-surface-container-high rounded-[22px] p-6 border border-outline-variant">
                        <div className="flex items-baseline justify-between mb-2">
                          <span className="text-xs font-semibold text-outline uppercase tracking-wider">Current Month</span>
                          <span className="text-xs font-semibold text-primary bg-primary-tint border border-primary-tint px-2.5 py-0.5 rounded-full">68% Available</span>
                        </div>
                        <div className="text-4xl font-bold text-on-surface tabular-nums tracking-tight mb-3">
                          1,240 DT <span className="text-base font-normal text-on-surface-variant">left</span>
                        </div>
                        <div className="w-full bg-outline-variant/60 h-3 rounded-full overflow-hidden flex mb-4">
                          <div className="bg-primary h-full rounded-full" style={{ width: "68%" }}></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-outline-variant text-xs tabular-nums">
                          <div>
                            <span className="text-outline block">Total Monthly Budget</span>
                            <span className="font-semibold text-on-surface text-sm">1,800 DT</span>
                          </div>
                          <div className="text-right">
                            <span className="text-outline block">Spent to date</span>
                            <span className="font-semibold text-on-surface text-sm">560 DT</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-outline text-center py-3.5 px-4 leading-relaxed">Your daily allowance automatically recalculates based on remaining days.</p>
                    </div>
                  )}

                  {/* State C: Insights Content */}
                  {activeFeature === "insights" && (
                    <div className="space-y-4" id="feat-canvas-insights">
                      <div className="bg-surface-container-high rounded-[22px] p-6 border border-outline-variant space-y-4">
                        <div className="flex items-center justify-between pb-1">
                          <span className="text-xs font-semibold uppercase tracking-wider text-outline">Category Distribution</span>
                          <span className="text-xs font-medium text-outline tabular-nums">October 2026</span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                              <span className="text-on-surface font-semibold">Food</span>
                              <span className="tabular-nums text-on-surface-variant">320 DT · 50%</span>
                            </div>
                            <div className="w-full bg-outline-variant/60 h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: "50%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                              <span className="text-on-surface font-semibold">Transport</span>
                              <span className="tabular-nums text-on-surface-variant">140 DT · 28%</span>
                            </div>
                            <div className="w-full bg-outline-variant/60 h-2 rounded-full overflow-hidden">
                              <div className="bg-primary/80 h-full rounded-full" style={{ width: "28%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                              <span className="text-on-surface font-semibold">Shopping</span>
                              <span className="tabular-nums text-on-surface-variant">95 DT · 18%</span>
                            </div>
                            <div className="w-full bg-outline-variant/60 h-2 rounded-full overflow-hidden">
                              <div className="bg-primary/60 h-full rounded-full" style={{ width: "18%" }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                              <span className="text-on-surface font-semibold">Bills</span>
                              <span className="tabular-nums text-on-surface-variant">80 DT · 14%</span>
                            </div>
                            <div className="w-full bg-outline-variant/60 h-2 rounded-full overflow-hidden">
                              <div className="bg-primary/40 h-full rounded-full" style={{ width: "14%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-outline text-center py-3.5 px-4 leading-relaxed">Clean proportional summaries that require zero financial literacy to digest.</p>
                    </div>
                  )}
                </div>

                {/* Quick Interactive Switcher Footer */}
                <div className="flex justify-center gap-2 pt-6 border-t border-outline-variant">
                  <button onClick={() => setActiveFeature("capture")} className={`text-xs px-3 py-1 rounded-full transition ${activeFeature === "capture" ? "font-semibold text-primary" : "text-outline hover:text-on-surface"}`}>1. Capture</button>
                  <span className="text-outline">·</span>
                  <button onClick={() => setActiveFeature("balance")} className={`text-xs px-3 py-1 rounded-full transition ${activeFeature === "balance" ? "font-semibold text-primary" : "text-outline hover:text-on-surface"}`}>2. Balance</button>
                  <span className="text-outline">·</span>
                  <button onClick={() => setActiveFeature("insights")} className={`text-xs px-3 py-1 rounded-full transition ${activeFeature === "insights" ? "font-semibold text-primary" : "text-outline hover:text-on-surface"}`}>3. Insights</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Budget Visualization Section (One number matters most) */}
        <section className="pt-16 sm:pt-20 md:pt-22 pb-12 sm:pb-14 bg-surface-container-lowest">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-tint border border-primary-tint text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Absolute Simplicity
            </span>
            <h2 className="text-display-md font-display-md text-on-surface tracking-tight mb-4 font-bold">One number matters most.</h2>
            {/* Large Focal Stat with Seamless State Continuity */}
            <div className="py-8">
              <div className="flex items-baseline justify-center gap-2">
                <div ref={focalRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface tabular-nums" id="focal-stat-number">
                  1,240.00
                </div>
                <span className="text-4xl font-normal text-on-surface-variant">DT</span>
              </div>
              <p className="text-headline-sm font-headline-sm text-outline mt-1 font-medium">left this month</p>
              {/* Monthly Progress Visual */}
              <div className="max-w-md mx-auto mt-8">
                <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden p-0.5 border border-outline-variant">
                  <div ref={focalBarRef} className="bg-primary h-full rounded-full" id="focal-progress-bar" style={{ width: "68.8%" }}></div>
                </div>
                <div className="flex justify-between items-center text-xs text-outline mt-3 tabular-nums">
                  <span>Day 19 of 31</span>
                  <span ref={focalAllowanceRef} id="focal-allowance-label">62.00 DT daily allowance</span>
                </div>
              </div>
              {/* Interactive simulation toggle */}
              <div className="mt-6 flex justify-center items-center gap-3">
                <button className="text-xs bg-surface-container-low border border-outline-variant hover:border-primary px-3.5 py-1.5 rounded-full text-on-surface transition flex items-center gap-1.5 font-medium active:scale-95" onClick={toggleFocalStat}>
                  <span className="material-symbols-outlined text-[15px] text-primary">sync_alt</span>
                  Toggle recent transaction ({focalToggled ? "Undo -12.50 DT" : "-12.50 DT"})
                </button>
              </div>
            </div>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed mt-4">
              No spreadsheet required. No complicated financial dashboard. Just a clear answer to the question: <span className="italic">"How much do I have left?"</span>
            </p>
          </div>
        </section>

        {/* Section 5: Made for the iPhone */}
        <section className="pt-12 sm:pt-14 md:pt-16 pb-16 sm:pb-20 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-tint border border-primary-tint text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              iOS Native
            </span>
            <h2 className="text-display-md font-display-md text-on-surface tracking-tight font-bold">Made for the iPhone.</h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">
              Designed with deep respect for Apple Human Interface Guidelines and modern iOS features.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Native UI Surface 1: Widgets */}
            <div className="hairline-card rounded-[22px] p-5 sm:p-6 text-left flex flex-col justify-between min-h-[300px] hover:border-primary/40 transition-all duration-200">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface-container-low border border-outline-variant/60 flex items-center justify-center text-on-surface mb-3.5">
                  <span className="material-symbols-outlined text-[20px]">widgets</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-1.5 font-semibold">Widgets</h3>
                <p className="text-[13px] leading-relaxed text-on-surface-variant">
                  See your budget without opening the app directly on your Lock or Home Screen.
                </p>
              </div>
              <div className="mt-5 h-[88px] w-full bg-surface-container-high border border-outline-variant rounded-[16px] p-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] text-outline">
                  <span className="font-medium text-on-surface flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Numo
                  </span>
                  <span>October</span>
                </div>
                <div className="flex items-baseline justify-between gap-1">
                  <span className="text-base font-bold text-on-surface tabular-nums">1,227.50 DT</span>
                  <span className="text-[10px] text-primary font-semibold px-2 py-0.5 rounded-full bg-primary-tint border border-primary-tint">68% Left</span>
                </div>
                <div className="w-full bg-outline-variant/60 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>
            </div>

            {/* Native UI Surface 2: Siri & Shortcuts */}
            <div className="hairline-card rounded-[22px] p-5 sm:p-6 text-left flex flex-col justify-between min-h-[300px] hover:border-primary/40 transition-all duration-200">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface-container-low border border-outline-variant/60 flex items-center justify-center text-on-surface mb-3.5">
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-1.5 font-semibold">Siri &amp; Shortcuts</h3>
                <p className="text-[13px] leading-relaxed text-on-surface-variant">
                  Hands-free recording with natural language recognition.
                </p>
              </div>
              <div className="mt-5 h-[88px] w-full bg-surface-container-high border border-outline-variant rounded-[16px] p-2.5 flex flex-col justify-between">
                <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-full px-3.5 py-1 text-xs text-on-surface font-medium italic flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary flex-shrink-0">mic</span>
                  <span className="truncate">"Add 12 dinars for lunch"</span>
                </div>
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-on-surface font-medium text-[11px] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-success text-[14px]">check_circle</span>
                    Food · 12.00 DT
                  </span>
                  <span className="text-[10px] text-outline font-medium px-2 py-0.5 rounded-full bg-surface-container border border-outline-variant/40">Logged</span>
                </div>
              </div>
            </div>

            {/* Native UI Surface 3: Dynamic Island */}
            <div className="hairline-card rounded-[22px] p-5 sm:p-6 text-left flex flex-col justify-between min-h-[300px] hover:border-primary/40 transition-all duration-200">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface-container-low border border-outline-variant/60 flex items-center justify-center text-on-surface mb-3.5">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-1.5 font-semibold">Dynamic Island</h3>
                <p className="text-[13px] leading-relaxed text-on-surface-variant">
                  Keep today's remaining allowance visible when useful with Live Activities.
                </p>
              </div>
              <div className="mt-5 h-[88px] w-full bg-surface-container-high border border-outline-variant rounded-[16px] p-2.5 flex items-center justify-center">
                <div className="bg-[#000000] border border-[#292929] text-white rounded-full px-3.5 py-2 text-[11px] flex items-center justify-between w-full shadow-sm">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    <span className="font-medium text-[10px] text-white/90 truncate">Numo Live</span>
                  </div>
                  <span className="tabular-nums font-semibold text-[11px] text-white whitespace-nowrap ml-2">62.00 DT left today</span>
                </div>
              </div>
            </div>

            {/* Native UI Surface 4: Quick Actions */}
            <div className="hairline-card rounded-[22px] p-5 sm:p-6 text-left flex flex-col justify-between min-h-[300px] hover:border-primary/40 transition-all duration-200">
              <div>
                <div className="w-10 h-10 rounded-full bg-surface-container-low border border-outline-variant/60 flex items-center justify-center text-on-surface mb-3.5">
                  <span className="material-symbols-outlined text-[20px]">touch_app</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-1.5 font-semibold">Quick Actions</h3>
                <p className="text-[13px] leading-relaxed text-on-surface-variant">
                  Haptic deep press on the app icon to log common frequent expenses in one tap.
                </p>
              </div>
              <div className="mt-5 h-[88px] w-full bg-surface-container-high border border-outline-variant rounded-[16px] p-2 flex flex-col justify-between">
                <div className="px-3 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between text-xs font-medium text-on-surface">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[14px] text-primary flex-shrink-0">coffee</span>
                    <span className="truncate text-[11px]">Record Coffee (4 DT)</span>
                  </div>
                  <span className="material-symbols-outlined text-[13px] text-outline flex-shrink-0 ml-1">chevron_right</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between text-xs font-medium text-on-surface">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[14px] text-outline flex-shrink-0">directions_car</span>
                    <span className="truncate text-[11px]">Record Taxi</span>
                  </div>
                  <span className="material-symbols-outlined text-[13px] text-outline flex-shrink-0 ml-1">chevron_right</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Privacy Section */}
        <section className="py-16 sm:py-20 bg-surface-container-low" id="privacy">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-tint border border-primary-tint text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Apple-native Ethics
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-on-surface tracking-tight font-bold">Your money is personal.</h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">
                Numo is designed around a local-first experience, clear data ownership, and minimal data collection.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="hairline-card rounded-[24px] p-7 anime-privacy-card">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface mb-4">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2 font-semibold">Local first</h3>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  Your everyday activity is designed to remain available on your device, fully functional offline.
                </p>
              </div>
              <div className="hairline-card rounded-[24px] p-7 anime-privacy-card">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface mb-4">
                  <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2 font-semibold">Minimal collection</h3>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  We collect only what the product needs to function. No tracking pixels or advertising brokers.
                </p>
              </div>
              <div className="hairline-card rounded-[24px] p-7 anime-privacy-card">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center text-on-surface mb-4">
                  <span className="material-symbols-outlined text-[20px]">database</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface mb-2 font-semibold">Your data</h3>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  Provide clear controls for instant JSON/CSV export, private iCloud sync, and permanent deletion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Beta Waitlist Section */}
        <section className="py-16 sm:py-20 md:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8" id="waitlist">
          <div className="bg-surface-container border border-outline-variant rounded-[28px] p-8 md:p-14 text-center max-w-[840px] mx-auto relative overflow-hidden">
            <span className="inline-block px-3.5 py-1 bg-surface-container-lowest border border-outline-variant rounded-full text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              Private Beta
            </span>
            <h2 className="text-display-md-mobile md:text-display-md font-display-md text-on-surface tracking-tight max-w-lg mx-auto font-bold">Be one of the first to use Numo.</h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mt-4 max-w-md mx-auto">
              Numo is currently in private beta. Join the waitlist and get early access when the app is ready.
            </p>
            {/* Waitlist Form & Confirmation Container */}
            <div className="mt-8 max-w-md mx-auto" id="waitlist-container">
              {/* Form View with Smooth Fade/Collapse */}
              <div 
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  waitlistSubmitted 
                    ? "grid-rows-[0fr] opacity-0 pointer-events-none scale-98" 
                    : "grid-rows-[1fr] opacity-100 pointer-events-auto scale-100"
                }`}
              >
                <div className="overflow-hidden">
                  <form className="flex flex-col sm:flex-row gap-3 items-center" id="waitlist-form" onSubmit={handleWaitlist}>
                    <input 
                      className="w-full rounded-full px-6 py-4 border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md font-body-md transition disabled:opacity-60 placeholder:text-outline" 
                      id="waitlist-email" 
                      value={waitlistEmail} 
                      disabled={waitlistSubmitting}
                      onChange={(e) => setWaitlistEmail(e.target.value)} 
                      placeholder="Your email address" 
                      required 
                      type="email" 
                    />
                    <button 
                      disabled={waitlistSubmitting}
                      className="w-full sm:w-auto shrink-0 bg-primary text-on-primary rounded-full px-8 py-4 font-label-lg text-label-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 apple-shadow font-semibold flex items-center justify-center gap-2 disabled:opacity-80 cursor-pointer" 
                      type="submit"
                    >
                      {waitlistSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                          <span>Securing spot...</span>
                        </>
                      ) : (
                        <span>Join the beta</span>
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-outline mt-4" id="waitlist-disclaimer">
                    No spam. Only beta access and important product updates.
                  </p>
                </div>
              </div>

              {/* Clean & Elegant Confirmation View with Smooth Expand */}
              <div 
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  waitlistSubmitted 
                    ? "grid-rows-[1fr] opacity-100 pointer-events-auto scale-100" 
                    : "grid-rows-[0fr] opacity-0 pointer-events-none scale-98"
                }`}
              >
                <div className="overflow-hidden">
                  <div 
                    className="py-8 px-6 sm:px-8 bg-surface-container-lowest border border-outline-variant rounded-[24px] text-center shadow-sm" 
                    id="waitlist-success"
                  >
                    {/* Clean Checkmark Badge */}
                    <div 
                      id="waitlist-success-icon" 
                      className="w-12 h-12 rounded-full bg-primary-tint border border-primary/25 text-primary flex items-center justify-center mx-auto mb-3 shadow-xs transition-transform duration-300"
                    >
                      <span className="material-symbols-outlined text-[24px]">done</span>
                    </div>

                    {/* Spot badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-tint border border-primary-tint text-[11px] font-semibold text-primary mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      Spot Reserved · Private Beta
                    </div>

                    <h3 className="text-headline-sm font-headline-sm font-bold text-on-surface">
                      You're on the list.
                    </h3>
                    <p className="text-body-sm text-on-surface-variant max-w-sm mx-auto mt-1.5 leading-relaxed">
                      We reserved your spot. We'll email you at <span className="font-semibold text-on-surface">{waitlistEmail}</span> when beta access is ready.
                    </p>

                    <div className="mt-5 pt-4 border-t border-outline-variant/60 flex items-center justify-center gap-3">
                      <span className="text-[11px] text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-success">lock</span>
                        Strictly zero spam
                      </span>
                      <span className="text-outline text-xs">·</span>
                      <button 
                        onClick={resetWaitlist} 
                        className="text-xs text-outline hover:text-primary font-medium transition rounded-full px-2.5 py-1 hover:bg-surface-container cursor-pointer"
                        type="button"
                      >
                        Enter another email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto px-6 py-12 gap-6">
          <div className="text-center md:text-left">
            <a className="text-headline-sm font-headline-sm font-semibold text-on-surface tracking-tight flex items-center gap-2.5 justify-center md:justify-start" href="#">
              <img src="/icons/icon_primary_dark.svg" alt="Numo logo" className="w-6 h-6 rounded-[6px]" />
              Numo
            </a>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">© 2026 Numo. Radical clarity for personal finance. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6 text-label-md font-label-md">
            <a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150" href="#privacy">Privacy</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150" href="#">Terms</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150" href="#">Security</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150" href="#">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

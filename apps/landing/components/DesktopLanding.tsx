"use client";

import React, { useState, useEffect } from "react";

export function DesktopLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroState, setHeroState] = useState<1 | 2 | 3>(1);
  const [heroAutoPlay, setHeroAutoPlay] = useState(true);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [activeFeature, setActiveFeature] = useState<"capture" | "balance" | "insights">("capture");
  const [focalToggled, setFocalToggled] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

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
    }, 2800);
    return () => clearInterval(interval);
  }, [heroAutoPlay]);

  const toggleHeroAutoPlay = () => {
    setHeroAutoPlay((prev) => !prev);
  };

  const toggleFocalStat = () => {
    setFocalToggled((prev) => !prev);
  };

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistEmail && waitlistEmail.includes("@")) {
      setWaitlistSubmitted(true);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FCF9F8] text-[#1c1b1b] antialiased selection:bg-primary-container selection:text-white">

{/*  Top Navigation Bar  */}
<header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none transition-all duration-200" id="site-header"><div className="w-full max-w-4xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-full px-6 py-3 border border-outline-variant/40 pointer-events-auto shadow-sm flex items-center justify-between transition-all duration-200"><a className="text-body-lg font-headline-sm tracking-tight text-on-surface font-semibold flex items-center gap-2" href="#"><span className="w-3 h-3 rounded-full bg-primary-container inline-block"></span>Numo</a><nav className="hidden md:flex items-center space-x-8"><a className="text-on-surface font-semibold text-label-lg font-label-lg hover:text-primary transition-colors duration-150" href="#features">Features</a><a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150 text-label-lg font-label-lg" href="#how-it-works">How it works</a><a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150 text-label-lg font-label-lg" href="#privacy">Privacy</a></nav><div className="flex items-center gap-3"><a className="bg-primary-container text-white text-label-lg font-label-lg px-5 py-2.5 rounded-full hover:bg-secondary transition duration-150 active:scale-[0.98] inline-flex items-center" href="#waitlist">Join the beta</a></div></div></header>
<main className="flex-grow">
{/*  Hero Section with Living Interactive Product Surface  */}
<section className="max-w-[1200px] mx-auto px-6 pt-28 pb-20">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
{/*  Left Hero Content (Preserved exactly)  */}
<div className="lg:col-span-6 space-y-7">
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F1EAFF] border border-[#E8E8EA]">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
<span className="text-[13px] font-semibold tracking-wider text-primary-container uppercase">Personal Finance, Simplified</span>
</div>
<h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-on-surface tracking-tight leading-[1.08] text-balance">
            Know where your money goes. Without thinking about it.
          </h1>
<p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl leading-relaxed">Numo makes everyday expense tracking almost effortless. Record a purchase in seconds, see what you have left, and move on.</p>
{/*  CTAs  */}
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
<a className="bg-primary-container text-white rounded-full px-7 py-3.5 font-label-lg text-label-lg hover:bg-secondary active:scale-[0.98] transition text-center apple-shadow" href="#waitlist">
              Join the beta
            </a>
<a className="bg-white border border-[#E8E8EA] text-on-surface hover:bg-[#F6F3F2] rounded-full px-6 py-3.5 font-label-lg text-label-lg active:scale-[0.98] transition text-center" href="#how-it-works">
              See how it works
            </a>
</div>
{/*  Reassurance Badge  */}
<div className="flex items-center gap-2 pt-2 text-body-sm font-body-sm text-outline">
<span className="material-symbols-outlined text-[18px] text-outline">verified_user</span>
<span className="">Built for iPhone · Private by design · Free during beta</span>
</div>
</div>
{/*  Right Hero: Living Product Demonstration Surface (No device mockups / frames)  */}
<div className="lg:col-span-6">
<div className="surface-stage bg-white rounded-[28px] border border-[#E8E8EA] p-6 sm:p-7 relative transition-all duration-300">
{/*  Interactive Controller Header  */}
<div className="flex items-center justify-between pb-5 border-b border-[#F6F3F2]">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-[#34C759] inline-block animate-pulse-subtle"></span>
<span className="text-xs font-semibold uppercase tracking-wider text-outline">Live Kinetic Demonstration</span>
</div>
{/*  Step state switcher / Replay button  */}
<div className="flex items-center gap-1.5 bg-[#F6F3F2] p-1 rounded-full text-[12px] font-medium">
<button id="btn-state-1" onClick={() => setHeroState(1)} className={`px-2.5 py-1 rounded-full transition-all ${heroState === 1 ? "bg-white text-on-surface shadow-sm font-semibold" : "text-outline hover:text-on-surface"}`}>1. Ready</button>
<button id="btn-state-2" onClick={() => setHeroState(2)} className={`px-2.5 py-1 rounded-full transition-all ${heroState === 2 ? "bg-white text-on-surface shadow-sm font-semibold" : "text-outline hover:text-on-surface"}`}>2. Entry</button>
<button id="btn-state-3" onClick={() => setHeroState(3)} className={`px-2.5 py-1 rounded-full transition-all ${heroState === 3 ? "bg-white text-on-surface shadow-sm font-semibold" : "text-outline hover:text-on-surface"}`}>3. Saved</button>
<button className="p-1 rounded-full text-outline hover:text-on-surface ml-0.5" id="btn-hero-autoplay"  title="Toggle autoplay">
<span className="material-symbols-outlined text-[16px] block">sync</span>
</button>
</div>
</div>
{/*  Demo Canvas Container  */}
<div className="pt-5 space-y-5">
{/*  Balance & Allowance Metric Surface  */}
<div className="bg-[#FCF9F8] rounded-[22px] border border-[#E8E8EA] p-5">
<div className="flex items-center justify-between">
<span className="text-[11px] font-semibold uppercase tracking-wider text-outline">Remaining Monthly Budget</span>
<span className="text-[11px] font-semibold text-primary-container px-2 py-0.5 rounded-full bg-[#F1EAFF]" id="hero-progress-label">68.8% Available</span>
</div>
<div className="flex items-baseline gap-1.5 mt-2">
<span className="text-[40px] sm:text-[44px] font-bold tracking-tight text-on-surface tabular-nums transition-colors duration-300" id="hero-balance">1,240.00</span>
<span className="text-body-lg font-semibold text-on-surface-variant">DT</span>
<span className="text-xs text-outline ml-1 font-normal">left for October</span>
</div>
{/*  Hairline Progress Bar  */}
<div className="w-full bg-[#E8E8EA] h-2 rounded-full overflow-hidden flex mt-3">
<div className="bg-primary-container h-full rounded-full transition-all duration-700 ease-out" id="hero-progress-bar" style={{ "width": "68.8%" }}></div>
</div>
{/*  Micro Metrics Row  */}
<div className="grid grid-cols-2 gap-3 mt-4 pt-3.5 border-t border-[#E8E8EA]/60">
<div>
<span className="text-[11px] text-outline block">Today's spend</span>
<span className="text-sm font-semibold text-on-surface tabular-nums transition-all" id="hero-today-spend">18.50 DT</span>
</div>
<div className="text-right">
<span className="text-[11px] text-outline block">Daily allowance</span>
<span className="text-sm font-semibold text-tertiary-container tabular-nums">62.00 DT</span>
</div>
</div>
</div>
{/*  Active Entry Bar / Prompt State (Transforms between States)  */}
<div className="transition-all duration-300" id="hero-action-container">
{/*  State 1 Trigger Button  */}
<div className={`flex items-center justify-between bg-white border border-[#E8E8EA] rounded-[18px] p-3 hover:border-primary-container/40 transition cursor-pointer hidden ${heroState === 1 ? "" : "hidden"}`} id="hero-state-1-view">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-primary-container text-white flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">add</span>
</div>
<div>
<p className="text-sm font-medium text-on-surface">Record new expense</p>
<p className="text-[11px] text-outline">Click to test instant capture</p>
</div>
</div>
<button className="bg-[#F6F3F2] text-on-surface text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-primary-container hover:text-white transition">
          + Add expense
        </button>
</div>
{/*  State 2 Active Entry Form  */}
<div className="bg-[#FFFFFF] border-2 border-primary-container rounded-[20px] p-4 space-y-3.5 shadow-sm" id="hero-state-2-view">
<div className="flex items-center justify-between">
<span className="text-[11px] font-semibold uppercase tracking-wider text-primary-container flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
            Instant Capture
          </span>
<span className="text-[11px] text-outline">Press Save or Wait</span>
</div>
<div className="flex items-center justify-between gap-3">
<div className="flex-1 bg-[#FCF9F8] rounded-[14px] px-3.5 py-2 border border-[#E8E8EA]">
<span className="text-[10px] text-outline block">Amount</span>
<div className="text-xl font-bold text-on-surface tabular-nums">12.50 <span className="text-xs font-normal text-outline">DT</span></div>
</div>
<div className="flex items-center gap-1.5">
<span className="px-3 py-2 rounded-[14px] bg-[#F1EAFF] border border-primary-container/30 text-primary-container font-semibold text-xs flex items-center gap-1">
<span className="material-symbols-outlined text-[15px]">restaurant</span> Food
            </span>
</div>
<button className="bg-primary-container text-white text-xs font-semibold px-4 py-3 rounded-full hover:bg-secondary active:scale-95 transition shadow-sm" >
            Save expense
          </button>
</div>
</div>
{/*  State 3 Saved Confirmation Pill  */}
<div className="bg-[#F1EAFF] border border-primary-container/30 rounded-[18px] p-3.5 flex items-center justify-between hidden" id="hero-state-3-view">
<div className="flex items-center gap-2.5">
<span className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center">
<span className="material-symbols-outlined text-[16px]">check</span>
</span>
<span className="text-sm font-semibold text-on-surface">12.50 DT added · Food</span>
</div>
<span className="text-[11px] font-medium text-primary-container bg-white px-2.5 py-1 rounded-full border border-primary-container/20">Updated in 0.4s</span>
</div>
</div>
{/*  Live Ledger Activity List  */}
<div>
<div className="flex items-center justify-between px-1 mb-2">
<span className="text-[11px] font-semibold uppercase tracking-wider text-outline">Today's Transactions</span>
<button className="text-[11px] text-primary-container font-medium hover:underline flex items-center gap-0.5" >
<span className="material-symbols-outlined text-[14px]">refresh</span> Reset
        </button>
</div>
<div className="space-y-2" id="hero-tx-list">
{/*  Dynamic New Item (Inserted on State 3)  */}
<div className="bg-[#FFFFFF] border-2 border-primary-container/40 p-3 rounded-[16px] flex items-center justify-between shadow-sm transition-all duration-300 hidden" id="tx-new-item">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-[10px] bg-[#F1EAFF] text-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[17px]">restaurant</span>
</div>
<div>
<p className="text-[13px] font-semibold text-on-surface leading-tight">Food</p>
<span className="text-[10px] text-primary-container font-medium">Just now · Instant Record</span>
</div>
</div>
<span className="text-[13px] font-bold text-on-surface tabular-nums">-12.50 DT</span>
</div>
{/*  Initial Transactions  */}
<div className="bg-[#FCF9F8] p-3 rounded-[16px] border border-[#E8E8EA] flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-[10px] bg-white flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined text-[16px]">restaurant</span>
</div>
<div>
<p className="text-[13px] font-medium text-on-surface leading-tight">Lunch</p>
<span className="text-[10px] text-outline">1:15 PM · Food</span>
</div>
</div>
<span className="text-[13px] font-semibold text-on-surface tabular-nums">-12.00 DT</span>
</div>
<div className="bg-[#FCF9F8] p-3 rounded-[16px] border border-[#E8E8EA] flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-[10px] bg-white flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined text-[16px]">local_taxi</span>
</div>
<div>
<p className="text-[13px] font-medium text-on-surface leading-tight">Taxi</p>
<span className="text-[10px] text-outline">8:40 AM · Transport</span>
</div>
</div>
<span className="text-[13px] font-semibold text-on-surface tabular-nums">-8.50 DT</span>
</div>
<div className="bg-[#FCF9F8] p-3 rounded-[16px] border border-[#E8E8EA] flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-[10px] bg-white flex items-center justify-center text-on-surface">
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
{/*  Section 2: Sequential Interactive Steps (Open. Record. Done.)  */}
<section className="py-20 bg-[#F6F3F2] border-y border-[#E8E8EA]" id="how-it-works">
<div className="max-w-[1200px] mx-auto px-6">
<div className="max-w-2xl mb-12">
<h2 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">Open. Record. Done.</h2>
<p className="text-body-lg font-body-lg text-on-surface-variant mt-2">
            Three steps are enough to keep your spending under control.
          </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="steps-container">
{/*  Step 1  */}
<div id="step-card-1" onMouseEnter={() => setActiveStep(1)} onClick={() => setActiveStep(1)} className={`hairline-card rounded-[24px] p-7 transition-all duration-300 cursor-default step-active ${activeStep === 1 ? "step-active" : ""}`}>
<span className="step-num text-primary-container font-semibold text-headline-sm font-headline-sm tabular-nums block mb-4 transition-all duration-300">01</span>
<h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Open</h3>
<p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Open Kinetic Minimal Ledger directly from your Home Screen or Lock Screen widget.
            </p>
</div>
{/*  Step 2  */}
<div id="step-card-2" onMouseEnter={() => setActiveStep(2)} onClick={() => setActiveStep(2)} className={`hairline-card rounded-[24px] p-7 transition-all duration-300 cursor-default ${activeStep === 2 ? "step-active" : ""}`}>
<span className="step-num text-outline font-semibold text-headline-sm font-headline-sm tabular-nums block mb-4 transition-all duration-300">02</span>
<h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Record</h3>
<p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Enter the amount and category. No forms, no tagging, no friction.
            </p>
</div>
{/*  Step 3  */}
<div id="step-card-3" onMouseEnter={() => setActiveStep(3)} onClick={() => setActiveStep(3)} className={`hairline-card rounded-[24px] p-7 transition-all duration-300 cursor-default ${activeStep === 3 ? "step-active" : ""}`}>
<span className="step-num text-outline font-semibold text-headline-sm font-headline-sm tabular-nums block mb-4 transition-all duration-300">03</span>
<h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Done</h3>
<p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Your budget updates instantly. Close the app and go about your day.
            </p>
</div>
</div>
</div>
</section>
{/*  Section 3: Editorial Continuous Product Surface (Transforms across feature states)  */}
<section className="py-24 max-w-[1200px] mx-auto px-6" id="features">
<div className="max-w-2xl mb-14">
<div className="inline-block text-[12px] font-semibold text-primary-container tracking-wider uppercase mb-2">System Discipline</div>
<h2 className="text-display-md-mobile md:text-display-md font-display-md text-on-surface tracking-tight">
          Everything you need. Nothing you don't.
        </h2>
<p className="text-body-lg font-body-lg text-on-surface-variant mt-3">
          Kinetic Minimal Ledger focuses on the few things that make everyday money tracking useful.
        </p>
</div>
{/*  Asymmetric Editorial Layout: Interactive State Switcher + Dynamic Living Canvas  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
{/*  Left Navigation Pills / Descriptors  */}
<div className="lg:col-span-5 space-y-4">
{/*  Tab 1  */}
<div id="feat-btn-capture" onClick={() => setActiveFeature("capture")} className={`cursor-pointer p-6 rounded-[22px] border-2 border-primary-container bg-white shadow-sm transition-all duration-200 ${activeFeature === "capture" ? "border-primary-container bg-white shadow-sm" : "border-[#E8E8EA] bg-[#FCF9F8] hover:bg-white"}`}>
<div className="flex items-center gap-3">
<span className="w-9 h-9 rounded-[12px] bg-[#F1EAFF] text-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">bolt</span>
</span>
<h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Instant expense capture</h3>
</div>
<p className="text-body-md font-body-md text-on-surface-variant mt-3 leading-relaxed">
        Enter an amount, choose a category, and save. No complicated forms or deep hierarchies.
      </p>
</div>
{/*  Tab 2  */}
<div id="feat-btn-balance" onClick={() => setActiveFeature("balance")} className={`cursor-pointer p-6 rounded-[22px] border border-[#E8E8EA] bg-[#FCF9F8] hover:bg-white transition-all duration-200 ${activeFeature === "balance" ? "border-primary-container bg-white shadow-sm" : "border-[#E8E8EA] bg-[#FCF9F8] hover:bg-white"}`}>
<div className="flex items-center gap-3">
<span className="w-9 h-9 rounded-[12px] bg-[#F6F3F2] text-on-surface flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">pie_chart</span>
</span>
<h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Know what you have left</h3>
</div>
<p className="text-body-md font-body-md text-on-surface-variant mt-3 leading-relaxed">
        See your remaining monthly budget and today's spending allowance without digging through charts.
      </p>
</div>
{/*  Tab 3  */}
<div id="feat-btn-insights" onClick={() => setActiveFeature("insights")} className={`cursor-pointer p-6 rounded-[22px] border border-[#E8E8EA] bg-[#FCF9F8] hover:bg-white transition-all duration-200 ${activeFeature === "insights" ? "border-primary-container bg-white shadow-sm" : "border-[#E8E8EA] bg-[#FCF9F8] hover:bg-white"}`}>
<div className="flex items-center gap-3">
<span className="w-9 h-9 rounded-[12px] bg-[#F6F3F2] text-on-surface flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">equalizer</span>
</span>
<h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Insights without the noise</h3>
</div>
<p className="text-body-md font-body-md text-on-surface-variant mt-3 leading-relaxed">
        Understand where your money went with simple summaries instead of complicated financial dashboards.
      </p>
</div>
</div>
{/*  Right Continuous Native Surface Display  */}
<div className="lg:col-span-7">
<div className="hairline-card rounded-[28px] p-7 md:p-9 min-h-[420px] flex flex-col justify-between">
{/*  Top Surface Indicator  */}
<div className="flex items-center justify-between border-b border-[#F6F3F2] pb-4 mb-6">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span className="text-xs font-semibold uppercase tracking-wider text-outline" id="feat-indicator-text">State A: Instant Capture Preview</span>
</div>
<span className="text-xs text-outline tabular-nums">Real-time local render</span>
</div>
{/*  Surface Container with Animated States  */}
<div className="flex-1 flex flex-col justify-center">
{/*  State A: Capture Content  */}
<div className={`space-y-4 ${activeFeature === "capture" ? "" : "hidden"}`} id="feat-canvas-capture">
<div className="bg-[#FCF9F8] rounded-[22px] p-6 border border-[#E8E8EA]">
<div className="flex items-center justify-between mb-4">
<span className="text-xs font-semibold text-outline uppercase tracking-wider">Quick Record</span>
<span className="text-xs text-primary-container font-medium bg-[#F1EAFF] px-2.5 py-0.5 rounded-full">Keyboardless entry</span>
</div>
<div className="bg-white rounded-[18px] border border-[#E8E8EA] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<span className="text-[11px] text-outline block">Expense Amount</span>
<span className="text-3xl font-bold text-on-surface tabular-nums">12.50 <span className="text-lg font-normal text-on-surface-variant">DT</span></span>
</div>
<div className="flex items-center gap-3">
<span className="rounded-full bg-[#F6F3F2] border border-[#E8E8EA] text-on-surface text-xs font-medium px-3.5 py-2 flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary-container"></span> Food
                </span>
<button className="bg-primary-container text-white text-xs font-semibold rounded-full px-5 py-2.5 hover:bg-secondary transition active:scale-95 shadow-sm">
                  Save
                </button>
</div>
</div>
</div>
<p className="text-xs text-outline text-center">Tapping any category logs the expense with exact timestamp in under a second.</p>
</div>
{/*  State B: Balance Content  */}
<div className="hidden space-y-4" id="feat-canvas-balance">
<div className="bg-[#FCF9F8] rounded-[22px] p-6 border border-[#E8E8EA]">
<div className="flex items-baseline justify-between mb-2">
<span className="text-xs font-semibold text-outline uppercase tracking-wider">Current Month</span>
<span className="text-xs font-semibold text-primary-container bg-[#F1EAFF] px-2.5 py-0.5 rounded-full">68% Available</span>
</div>
<div className="text-4xl font-bold text-on-surface tabular-nums tracking-tight mb-3">
              1,240 DT <span className="text-base font-normal text-on-surface-variant">left</span>
</div>
<div className="w-full bg-[#E8E8EA] h-3 rounded-full overflow-hidden flex mb-4">
<div className="bg-primary-container h-full rounded-full" style={{ "width": "68%" }}></div>
</div>
<div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E8E8EA] text-xs tabular-nums">
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
<p className="text-xs text-outline text-center">Your daily allowance automatically recalculates based on remaining days.</p>
</div>
{/*  State C: Insights Content  */}
<div className="hidden space-y-4" id="feat-canvas-insights">
<div className="bg-[#FCF9F8] rounded-[22px] p-6 border border-[#E8E8EA] space-y-4">
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
<div className="w-full bg-[#E8E8EA] h-2 rounded-full overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{ "width": "50%" }}></div>
</div>
</div>
<div>
<div className="flex justify-between text-xs font-medium mb-1.5">
<span className="text-on-surface font-semibold">Transport</span>
<span className="tabular-nums text-on-surface-variant">140 DT · 28%</span>
</div>
<div className="w-full bg-[#E8E8EA] h-2 rounded-full overflow-hidden">
<div className="bg-primary-container/80 h-full rounded-full" style={{ "width": "28%" }}></div>
</div>
</div>
<div>
<div className="flex justify-between text-xs font-medium mb-1.5">
<span className="text-on-surface font-semibold">Shopping</span>
<span className="tabular-nums text-on-surface-variant">95 DT · 18%</span>
</div>
<div className="w-full bg-[#E8E8EA] h-2 rounded-full overflow-hidden">
<div className="bg-primary-container/60 h-full rounded-full" style={{ "width": "18%" }}></div>
</div>
</div>
<div>
<div className="flex justify-between text-xs font-medium mb-1.5">
<span className="text-on-surface font-semibold">Bills</span>
<span className="tabular-nums text-on-surface-variant">80 DT · 14%</span>
</div>
<div className="w-full bg-[#E8E8EA] h-2 rounded-full overflow-hidden">
<div className="bg-primary-container/40 h-full rounded-full" style={{ "width": "14%" }}></div>
</div>
</div>
</div>
</div>
<p className="text-xs text-outline text-center">Clean proportional summaries that require zero financial literacy to digest.</p>
</div>
</div>
{/*  Quick Interactive Switcher Footer  */}
<div className="flex justify-center gap-2 pt-6 border-t border-[#F6F3F2]">
<button className="text-xs px-3 py-1 rounded-full text-outline hover:text-on-surface" >1. Capture</button>
<span className="text-outline">·</span>
<button className="text-xs px-3 py-1 rounded-full text-outline hover:text-on-surface" >2. Balance</button>
<span className="text-outline">·</span>
<button className="text-xs px-3 py-1 rounded-full text-outline hover:text-on-surface" >3. Insights</button>
</div>
</div>
</div>
</div>
</section>
{/*  Section 4: Budget Visualization Section (One number matters most) with Live Tick  */}
<section className="py-20 bg-white border-y border-[#E8E8EA]">
<div className="max-w-[800px] mx-auto px-6 text-center">
<span className="text-xs font-semibold uppercase tracking-widest text-primary-container mb-3 inline-block">Absolute Simplicity</span>
<h2 className="text-display-md font-display-md text-on-surface tracking-tight mb-4">One number matters most.</h2>
{/*  Large Focal Stat with Seamless State Continuity  */}
<div className="py-8">
<div className="flex items-baseline justify-center gap-2">
<div className="text-6xl md:text-7xl font-bold tracking-tight text-on-surface tabular-nums transition-all duration-500" id="focal-stat-number">
    1,240.00
  </div>
<span className="text-4xl font-normal text-on-surface-variant">DT</span>
</div>
<p className="text-headline-sm font-headline-sm text-outline mt-1 font-medium">left this month</p>
{/*  Monthly Progress Visual  */}
<div className="max-w-md mx-auto mt-8">
<div className="w-full bg-[#F0EDEC] h-3 rounded-full overflow-hidden p-0.5 border border-[#E8E8EA]">
<div className="bg-primary-container h-full rounded-full transition-all duration-700 ease-out" id="focal-progress-bar" style={{ "width": "68.8%" }}></div>
</div>
<div className="flex justify-between items-center text-xs text-outline mt-3 tabular-nums">
<span className="">Day 19 of 31</span>
<span id="focal-allowance-label" className="">62.00 DT daily allowance</span>
</div>
</div>
{/*  Interactive simulation toggle for visitors  */}
<div className="mt-6 flex justify-center items-center gap-3">
<button className="text-xs bg-[#F6F3F2] border border-[#E8E8EA] hover:border-primary-container px-3.5 py-1.5 rounded-full text-on-surface transition flex items-center gap-1.5 font-medium" onClick={toggleFocalStat}>
<span className="material-symbols-outlined text-[15px] text-primary-container">sync_alt</span>
    Toggle recent transaction (<span id="focal-toggle-label" className="">-12.50 DT</span>)
  </button>
</div>
</div>
<p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed mt-4">
          No spreadsheet required. No complicated financial dashboard. Just a clear answer to the question: <span className="italic">"How much do I have left?"</span>
</p>
</div>
</section>
{/*  Section 5: Made for the iPhone (Standalone Native iOS UI Surfaces, NO Mockups)  */}
<section className="py-24 max-w-[1200px] mx-auto px-6">
<div className="text-center max-w-2xl mx-auto mb-16">
<h2 className="text-display-md font-display-md text-on-surface tracking-tight">Made for the iPhone.</h2>
<p className="text-body-lg font-body-lg text-on-surface-variant mt-2">
          Designed with deep respect for Apple Human Interface Guidelines and modern iOS features.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{/*  Native UI Surface 1: Interactive Widget Preview  */}
<div className="hairline-card rounded-[24px] p-6 text-left flex flex-col justify-between h-[300px] hover:border-primary-container/40 transition">
<div>
<div className="w-10 h-10 rounded-[12px] bg-[#F6F3F2] flex items-center justify-center text-on-surface mb-4">
<span className="material-symbols-outlined text-[20px]">widgets</span>
</div>
<h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Widgets</h3>
<p className="text-body-sm font-body-sm text-on-surface-variant">
              See your budget without opening the app directly on your Lock or Home Screen.
            </p>
</div>
{/*  Standalone Apple Native Medium Widget Card  */}
<div className="bg-[#FCF9F8] border border-[#E8E8EA] rounded-[18px] p-3.5 space-y-2">
<div className="flex items-center justify-between text-[11px] text-outline">
<span className="font-medium text-on-surface flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span> Kinetic
    </span>
<span className="">October</span>
</div>
<div className="flex items-baseline justify-between">
<span className="text-xl font-bold text-on-surface tabular-nums">1,227.50 DT</span>
<span className="text-[10px] text-primary-container font-semibold">68% Left</span>
</div>
<div className="w-full bg-[#E8E8EA] h-1.5 rounded-full overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{ "width": "68%" }}></div>
</div>
</div>
</div>
{/*  Native UI Surface 2: Siri & Shortcuts Card  */}
<div className="hairline-card rounded-[24px] p-6 text-left flex flex-col justify-between h-[300px] hover:border-primary-container/40 transition">
<div>
<div className="w-10 h-10 rounded-[12px] bg-[#F6F3F2] flex items-center justify-center text-on-surface mb-4">
<span className="material-symbols-outlined text-[20px]">mic</span>
</div>
<h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Siri &amp; Shortcuts</h3>
<p className="text-body-sm font-body-sm text-on-surface-variant">
              Hands-free recording with natural language recognition.
            </p>
</div>
{/*  Standalone Siri Prompt & Confirmation Bubble  */}
<div className="space-y-2">
<div className="bg-[#FCF9F8] border border-[#E8E8EA] rounded-[14px] p-2.5 text-xs text-on-surface font-medium italic flex items-center gap-2">
<span className="material-symbols-outlined text-[15px] text-outline">mic</span>
    "Add 12 dinars for lunch"
  </div>
<div className="bg-white border border-[#E8E8EA] rounded-[14px] p-2 flex items-center justify-between text-xs">
<span className="text-on-surface font-medium text-[11px] flex items-center gap-1.5">
<span className="material-symbols-outlined text-tertiary-container text-[14px]">check_circle</span>
      Food · 12.00 DT
    </span>
<span className="text-[10px] text-outline">Logged</span>
</div>
</div>
</div>
{/*  Native UI Surface 3: Dynamic Island Pill  */}
<div className="hairline-card rounded-[24px] p-6 text-left flex flex-col justify-between h-[300px] hover:border-primary-container/40 transition">
<div>
<div className="w-10 h-10 rounded-[12px] bg-[#F6F3F2] flex items-center justify-center text-on-surface mb-4">
<span className="material-symbols-outlined text-[20px]">notifications_active</span>
</div>
<h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Dynamic Island</h3>
<p className="text-body-sm font-body-sm text-on-surface-variant">
              Keep today's remaining allowance visible when useful with Live Activities.
            </p>
</div>
{/*  Standalone Standalone Dynamic Island Pill Surface  */}
<div className="bg-black text-white rounded-full px-3.5 py-2.5 text-[11px] flex items-center justify-between shadow-md">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span className="font-medium text-[10px] text-white/90">Kinetic Live</span>
</div>
<span className="tabular-nums font-semibold text-[11px] text-white">62.00 DT left today</span>
</div>
</div>
{/*  Native UI Surface 4: Quick Actions Surface  */}
<div className="hairline-card rounded-[24px] p-6 text-left flex flex-col justify-between h-[300px] hover:border-primary-container/40 transition">
<div>
<div className="w-10 h-10 rounded-[12px] bg-[#F6F3F2] flex items-center justify-center text-on-surface mb-4">
<span className="material-symbols-outlined text-[20px]">touch_app</span>
</div>
<h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Quick Actions</h3>
<p className="text-body-sm font-body-sm text-on-surface-variant">
              Haptic deep press on the app icon to log common frequent expenses in one tap.
            </p>
</div>
{/*  Standalone iOS Haptic Context Menu Preview  */}
<div className="bg-white border border-[#E8E8EA] rounded-[16px] p-1.5 shadow-sm space-y-1">
<div className="px-2.5 py-1.5 rounded-[10px] bg-[#F6F3F2] flex items-center justify-between text-xs font-medium text-on-surface">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[15px] text-primary-container">coffee</span>
<span className="">Record Coffee (4 DT)</span>
</div>
<span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
</div>
<div className="px-2.5 py-1.5 rounded-[10px] flex items-center justify-between text-xs font-medium text-on-surface hover:bg-[#F6F3F2] transition">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[15px] text-outline">directions_car</span>
<span className="">Record Taxi</span>
</div>
<span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
</div>
</div>
</div>
</div>
</section>
{/*  Section 6: Privacy Section (Local-first & Apple-native ethics)  */}
<section className="py-20 bg-[#F6F3F2] border-y border-[#E8E8EA]" id="privacy">
<div className="max-w-[1200px] mx-auto px-6">
<div className="max-w-2xl mb-12">
<span className="text-xs font-semibold uppercase tracking-widest text-primary-container mb-2 block">Apple-native Ethics</span>
<h2 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">Your money is personal.</h2>
<p className="text-body-lg font-body-lg text-on-surface-variant mt-2">
            Kinetic Minimal Ledger is designed around a local-first experience, clear data ownership, and minimal data collection.
          </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="hairline-card rounded-[24px] p-7">
<div className="w-10 h-10 rounded-[12px] bg-[#FCF9F8] border border-[#E8E8EA] flex items-center justify-center text-on-surface mb-4">
<span className="material-symbols-outlined text-[20px]">lock</span>
</div>
<h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Local first</h3>
<p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Your everyday activity is designed to remain available on your device, fully functional offline.
            </p>
</div>
<div className="hairline-card rounded-[24px] p-7">
<div className="w-10 h-10 rounded-[12px] bg-[#FCF9F8] border border-[#E8E8EA] flex items-center justify-center text-on-surface mb-4">
<span className="material-symbols-outlined text-[20px]">visibility_off</span>
</div>
<h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Minimal collection</h3>
<p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              We collect only what the product needs to function. No tracking pixels or advertising brokers.
            </p>
</div>
<div className="hairline-card rounded-[24px] p-7">
<div className="w-10 h-10 rounded-[12px] bg-[#FCF9F8] border border-[#E8E8EA] flex items-center justify-center text-on-surface mb-4">
<span className="material-symbols-outlined text-[20px]">database</span>
</div>
<h3 className="text-headline-sm font-headline-sm text-on-surface mb-2">Your data</h3>
<p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
              Provide clear controls for instant JSON/CSV export, private iCloud sync, and permanent deletion.
            </p>
</div>
</div>
</div>
</section>
{/*  Beta Waitlist Section (With Smooth In-Place State Transition)  */}
<section className="py-24 max-w-[1200px] mx-auto px-6" id="waitlist">
<div className="bg-[#F0EDEC] border border-[#E8E8EA] rounded-[28px] p-8 md:p-14 text-center max-w-[840px] mx-auto relative overflow-hidden">
<span className="inline-block px-3 py-1 bg-white border border-[#E8E8EA] rounded-full text-xs font-semibold text-primary-container uppercase tracking-wider mb-4">
          Private Beta
        </span>
<h2 className="text-display-md-mobile md:text-display-md font-display-md text-on-surface tracking-tight max-w-lg mx-auto">Be one of the first to use Numo.</h2>
<p className="text-body-lg font-body-lg text-on-surface-variant mt-4 max-w-md mx-auto">
          Kinetic Minimal Ledger is currently in private beta. Join the waitlist and get early access when the app is ready.
        </p>
{/*  Waitlist Form Container  */}
<div className="mt-8 max-w-md mx-auto" id="waitlist-container">
<form className={`flex flex-col sm:flex-row gap-3 items-center ${waitlistSubmitted ? "hidden" : ""}`} id="waitlist-form" onSubmit={handleWaitlist}>
<input className="w-full bg-white rounded-full px-6 py-4 border border-[#E8E8EA] text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-body-md font-body-md transition" id="waitlist-email" value={waitlistEmail} onChange={(e) => setWaitlistEmail(e.target.value)} placeholder="Your email address" required type="email" />
<button className="w-full sm:w-auto shrink-0 bg-primary-container text-white rounded-full px-8 py-4 font-label-lg text-label-lg hover:bg-secondary active:scale-[0.98] transition apple-shadow" type="submit">
              Join the beta
            </button>
</form>
{/*  Quiet Success State (Smooth in-place replacement)  */}
<div className={`hidden py-6 px-6 bg-white border border-[#E8E8EA] rounded-[24px] text-center transition-all duration-300 shadow-sm ${waitlistSubmitted ? "" : "hidden"}`} id="waitlist-success">
<div className="w-10 h-10 rounded-full bg-[#F1EAFF] text-primary-container flex items-center justify-center mx-auto mb-2.5">
<span className="material-symbols-outlined text-[20px]">done</span>
</div>
<p className="font-semibold text-on-surface text-body-md">You're on the list.</p>
<p className="text-body-sm text-outline mt-1">We'll email you when your beta access is ready.</p>
</div>
<p className={`text-xs text-outline mt-4 ${waitlistSubmitted ? "hidden" : ""}`} id="waitlist-disclaimer">
            No spam. Only beta access and important product updates.
          </p>
</div>
</div>
</section>
{/*  Final CTA Section  */}
<section className="py-16 text-center max-w-[1200px] mx-auto px-6 border-t border-[#E8E8EA]">
<p className="text-xs font-semibold uppercase tracking-widest text-primary-container mb-3">PRIVATE BETA</p>
<h2 className="text-display-md-mobile md:text-display-md font-display-md text-on-surface tracking-tight mb-4">
        Make tracking your spending effortless.
      </h2>
<p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg mx-auto mb-8">
        Built for iPhone with radical clarity and quiet confidence.
      </p>
<div className="flex justify-center">
<a className="bg-primary-container text-white rounded-[18px] px-8 py-3.5 font-label-lg text-label-lg hover:bg-secondary transition active:scale-[0.98]" href="#waitlist">
          Join the beta
        </a>
</div>
</section>
</main>
{/*  Footer  */}
<footer className="bg-surface-container-lowest border-t border-outline-variant/30">
<div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto px-6 py-12 gap-6">
{/*  Wordmark & Copyright  */}
<div className="text-center md:text-left">
<a className="text-headline-sm font-headline-sm font-semibold text-on-surface tracking-tight" href="#">Numo</a>
<p className="text-body-sm font-body-sm text-on-surface-variant mt-1">© 2025 Numo. Radical clarity for personal finance. All rights reserved.</p>
</div>
{/*  Links  */}
<div className="flex items-center space-x-6 text-label-md font-label-md">
<a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150" href="#privacy">Privacy</a>
<a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150" href="#">Terms</a>
<a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150" href="#">Security</a>
<a className="text-on-surface-variant hover:text-on-surface transition-colors duration-150" href="#">System Status</a>
</div>
</div>
</footer>
{/*  Interactive Scripts: Dynamic Living Product Demonstrations  */}




    </div>
  );
}

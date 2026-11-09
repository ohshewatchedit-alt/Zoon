import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Sparkles, Heart, Film, Clapperboard, Tv, Volume2 } from 'lucide-react';

export const ZoonCinemaAnimation: React.FC = () => {
  // Animation state: 'arriving' -> 'tumbling' -> 'sleeping'
  const [animationStep, setAnimationStep] = useState<'arriving' | 'tumbling' | 'sleeping'>('sleeping');
  const [isPlaying, setIsPlaying] = useState(false);
  const [channel, setChannel] = useState(0);
  const [isPurring, setIsPurring] = useState(true);
  const [popcornCount, setPopcornCount] = useState(14);
  const [showHeart, setShowHeart] = useState(false);

  const channels = [
    { title: 'Ohshewatchedit Store', subtitle: 'Late Night World Cinema Marathon', color: 'from-amber-200 to-rose-200' },
    { title: 'Japen 1962 · Ozu & Kurosawa', subtitle: 'Alleyway 35mm Retrospective', color: 'from-amber-100 to-amber-300' },
    { title: 'France 1959 · Nouvelle Vague', subtitle: '400 Blows & Breathless', color: 'from-purple-200 to-pink-200' },
    { title: 'Iran & Korea · Modern Auteurs', subtitle: 'Kiarostami, Farhadi & Bong Joon-ho', color: 'from-yellow-200 to-amber-300' },
  ];

  const runAnimation = () => {
    setIsPlaying(true);
    setAnimationStep('arriving');

    // Step 1: Arriving from journey
    setTimeout(() => {
      setAnimationStep('tumbling');
    }, 2200);

    // Step 2: Popcorn tumble and sleep
    setTimeout(() => {
      setAnimationStep('sleeping');
      setIsPlaying(false);
    }, 4400);
  };

  const handlePetZoon = () => {
    setShowHeart(true);
    setIsPurring(true);
    setTimeout(() => setShowHeart(false), 1800);
  };

  return (
    <div className="w-full my-8 bg-[#fdfaf5] p-5 sm:p-8 rounded-3xl border-[3px] border-[#1e1b24] shadow-pop-lg relative overflow-hidden">
      {/* Background warm grain & glow */}
      <div className="absolute top-0 right-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-amber-300/25 rounded-full blur-3xl pointer-events-none" />

      {/* Header controls & Director Note */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b-2 border-[#1e1b24] relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-200 border-2 border-[#1e1b24] shadow-pop-sm text-[11px] font-black uppercase text-purple-950 mb-1 -rotate-1">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>Storekeeper & Aspiring Filmmaker</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#1e1b24] tracking-tight">
            Zoon's Homecoming: From World Film Alleys to the Couch
          </h3>
          <p className="text-xs text-stone-600 font-medium">
            Watch Zoon return from her international film journey, tumble the popcorn, and curl up by the warm glow of the CRT TV!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runAnimation}
            disabled={isPlaying}
            className="px-4 py-2 bg-amber-300 hover:bg-amber-200 text-[#1e1b24] font-black text-xs rounded-xl border-2 border-[#1e1b24] shadow-pop-sm flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
            <span>{isPlaying ? 'Zoon is walking...' : "Replay Zoon's Arrival 🎬"}</span>
          </button>
          
          <button
            onClick={() => setChannel((prev) => (prev + 1) % channels.length)}
            className="px-3 py-2 bg-white hover:bg-stone-50 text-[#1e1b24] font-black text-xs rounded-xl border-2 border-[#1e1b24] shadow-pop-sm flex items-center gap-1.5 transition-all cursor-pointer"
            title="Switch TV Screen"
          >
            <Tv className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">Switch Channel</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Animated Stage */}
      <div className="relative h-72 sm:h-80 w-full max-w-3xl mx-auto bg-[#faf4ea] rounded-2xl border-2 border-[#1e1b24] p-4 flex items-end justify-center overflow-hidden shadow-inner select-none">
        {/* Floor Line */}
        <div className="absolute bottom-6 left-0 right-0 h-1 bg-[#1e1b24]/40" />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#ede3d1] border-t-2 border-[#1e1b24]" />

        {/* 1. RETRO LAVENDER CRT TELEVISION (Faithful to user's logo draft) */}
        <div className="relative z-10 mr-4 sm:mr-10 mb-2 shrink-0">
          {/* TV Antenna */}
          <div className="absolute -top-7 left-12 w-16 h-8 pointer-events-none">
            <div className="w-0.75 h-9 bg-[#1e1b24] absolute left-3 top-0 -rotate-30 origin-bottom" />
            <div className="w-0.75 h-9 bg-[#1e1b24] absolute right-3 top-0 rotate-30 origin-bottom" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-[#1e1b24] absolute left-0.5 -top-1" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-[#1e1b24] absolute right-0.5 -top-1" />
          </div>

          {/* TV Main Body (Retro Lavender) */}
          <div className="w-48 sm:w-56 h-44 sm:h-52 bg-[#c084fc] rounded-3xl border-[3px] border-[#1e1b24] shadow-pop-sm p-3 flex flex-col justify-between relative">
            {/* Side Vents */}
            <div className="absolute left-1.5 top-12 space-y-1">
              <div className="w-1.5 h-0.5 bg-[#1e1b24] rounded-full" />
              <div className="w-1.5 h-0.5 bg-[#1e1b24] rounded-full" />
              <div className="w-1.5 h-0.5 bg-[#1e1b24] rounded-full" />
            </div>

            {/* TV Screen Stage */}
            <div className={`w-full h-32 sm:h-38 rounded-2xl border-2 border-[#1e1b24] bg-gradient-to-br ${channels[channel].color} p-2 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner transition-colors duration-500`}>
              {/* Scanlines effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

              {/* Hand-lettered logo on screen */}
              <div className="relative z-10">
                <span className="font-hand text-xl sm:text-2xl font-black text-rose-700 tracking-tight block leading-tight transform -rotate-2 drop-shadow-xs">
                  Ohshewatchedit
                </span>
                <span className="font-display text-xs sm:text-sm font-black text-[#1e1b24] block uppercase tracking-wider">
                  Store
                </span>
                <div className="text-[9px] font-bold text-purple-900 mt-1 bg-white/70 px-2 py-0.5 rounded-full border border-purple-300 inline-block">
                  {channels[channel].title}
                </div>
              </div>

              {/* Floating stars on screen */}
              <Sparkles className="w-4 h-4 text-amber-500 absolute top-2 right-2 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-amber-400 border border-[#1e1b24] absolute bottom-2 left-3" />
            </div>

            {/* Bottom Controls Panel */}
            <div className="flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400 border border-[#1e1b24]" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300 border border-[#1e1b24]" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-stone-200 border border-[#1e1b24] cursor-pointer" onClick={() => setChannel((c) => (c + 1) % channels.length)} />
                <div className="w-3 h-3 rounded-full bg-stone-200 border border-[#1e1b24] cursor-pointer" onClick={() => setChannel((c) => (c + 1) % channels.length)} />
              </div>
            </div>
          </div>

          {/* TV Legs */}
          <div className="flex justify-between px-6">
            <div className="w-3 h-3 bg-[#1e1b24] rotate-12 -mt-1 rounded-b" />
            <div className="w-3 h-3 bg-[#1e1b24] -rotate-12 -mt-1 rounded-b" />
          </div>
        </div>

        {/* 2. THE POPCORN BUCKET (Striped red & cream, tumbles over) */}
        <div 
          onClick={() => setPopcornCount((p) => p + 3)}
          className={`relative z-10 transition-all duration-500 cursor-pointer mb-2 ${
            animationStep === 'arriving'
              ? 'translate-x-0 rotate-0'
              : 'translate-x-2 rotate-80 origin-bottom-left'
          }`}
          title="Click to scatter more popcorn!"
        >
          {/* Popcorn Tub */}
          <div className="w-12 h-14 bg-white rounded-b-xl border-2 border-[#1e1b24] relative overflow-hidden shadow-pop-sm flex flex-col justify-between">
            <div className="absolute inset-0 flex">
              <div className="w-1/4 h-full bg-rose-500 border-r border-[#1e1b24]" />
              <div className="w-1/4 h-full bg-white border-r border-[#1e1b24]" />
              <div className="w-1/4 h-full bg-rose-500 border-r border-[#1e1b24]" />
              <div className="w-1/4 h-full bg-white" />
            </div>
            {/* Center Yellow Star on Tub */}
            <div className="relative z-10 m-auto w-6 h-6 rounded-full bg-amber-300 border border-[#1e1b24] flex items-center justify-center">
              <span className="text-[10px]">★</span>
            </div>
          </div>

          {/* Popcorn Top Fluff */}
          {animationStep === 'arriving' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-0.5">
              <div className="w-4 h-4 rounded-full bg-amber-200 border border-[#1e1b24]" />
              <div className="w-4 h-4 rounded-full bg-amber-100 border border-[#1e1b24] -ml-1" />
              <div className="w-4 h-4 rounded-full bg-amber-200 border border-[#1e1b24] -ml-1" />
            </div>
          )}
        </div>

        {/* Scattered Popcorn Kernels on the floor */}
        <div className="absolute bottom-6 left-1/3 flex gap-1 z-10">
          {Array.from({ length: popcornCount }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full bg-amber-200 border border-[#1e1b24] shadow-2xs transition-all duration-300 hover:scale-125 ${
                animationStep === 'arriving' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
              }`}
              style={{
                transform: `translateX(${(i % 6) * 10 - 20}px) translateY(${((i * 7) % 8) - 4}px) rotate(${i * 25}deg)`,
              }}
            />
          ))}
        </div>

        {/* 3. ZOON (Arrives -> Tumbles Popcorn -> Sleeps) */}
        <div
          onClick={handlePetZoon}
          className={`relative z-20 cursor-pointer transition-all duration-700 ease-out mb-2 ${
            animationStep === 'arriving'
              ? 'translate-x-32 scale-95'
              : animationStep === 'tumbling'
              ? 'translate-x-4 scale-100'
              : 'translate-x-0 scale-100'
          }`}
          title="Click to pet Zoon! She loves world cinema fans."
        >
          {/* Floating Heart / Purr Effect on Click */}
          {showHeart && (
            <div className="absolute -top-8 left-10 flex items-center gap-1 text-rose-500 font-hand text-lg font-black animate-bounce z-30">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              <span>Purrr! ❤️</span>
            </div>
          )}

          {/* Sleeping "Zzz" bubble when asleep */}
          {animationStep === 'sleeping' && (
            <div className="absolute -top-6 right-2 text-purple-700 font-display text-xs font-black animate-pulse flex items-center gap-0.5">
              <span>z</span>
              <span className="text-sm">Z</span>
              <span className="text-base">Z</span>
              <span className="text-xs">🐾</span>
            </div>
          )}

          {/* Illustrated Cat Body Structure (Mirroring the logo draft) */}
          <div className="relative w-36 sm:w-44 h-24 sm:h-28">
            {/* Curled Ginger Body */}
            <div className="w-32 sm:w-38 h-20 sm:h-24 bg-[#f97316] rounded-full border-[2.5px] border-[#1e1b24] relative overflow-hidden shadow-pop-sm">
              {/* Tabby Stripes */}
              <div className="absolute top-2 right-4 w-2.5 h-6 bg-[#ea580c] -rotate-12 rounded-full" />
              <div className="absolute top-3 right-10 w-2.5 h-8 bg-[#ea580c] -rotate-6 rounded-full" />
              <div className="absolute top-4 right-16 w-2.5 h-7 bg-[#ea580c] rotate-6 rounded-full" />
              <div className="absolute top-5 right-22 w-2 h-6 bg-[#ea580c] rotate-12 rounded-full" />

              {/* White Belly patch */}
              <div className="absolute bottom-0 left-6 w-16 h-8 bg-[#fff7ed] rounded-t-full border-t border-[#1e1b24]/40" />
            </div>

            {/* Curled Tail wrapping around body */}
            <div className="absolute -bottom-1 -right-3 w-16 h-8 border-b-[6px] border-r-[6px] border-[#ea580c] rounded-br-full -rotate-15">
              <div className="w-3 h-3 bg-[#fff7ed] rounded-full absolute -top-1 right-0 border border-[#1e1b24]" />
            </div>

            {/* Cat Head */}
            <div className="absolute -top-2 left-2 w-18 h-18 bg-[#f97316] rounded-full border-[2.5px] border-[#1e1b24] shadow-sm flex flex-col items-center justify-center">
              {/* Cat Ears */}
              <div className="w-5 h-6 bg-[#f97316] border-t-2 border-l-2 border-[#1e1b24] absolute -top-3 left-1 rotate-[-20deg] rounded-tl-md">
                <div className="w-3 h-3 bg-[#fecdd3] rounded-tl-sm m-auto mt-1" />
              </div>
              <div className="w-5 h-6 bg-[#f97316] border-t-2 border-r-2 border-[#1e1b24] absolute -top-3 right-1 rotate-[20deg] rounded-tr-md">
                <div className="w-3 h-3 bg-[#fecdd3] rounded-tr-sm m-auto mt-1" />
              </div>

              {/* White Muzzle & Face */}
              <div className="w-10 h-7 bg-[#fff7ed] rounded-full border-t border-[#1e1b24]/30 absolute bottom-2 flex flex-col items-center justify-center">
                {/* Cute Pink Nose */}
                <div className="w-2 h-1.5 bg-[#f43f5e] rounded-b-md" />
                {/* Smiling W Mouth */}
                <div className="text-[10px] font-black text-[#1e1b24] leading-none mt-0.5">ω</div>
              </div>

              {/* Sleeping Eyes (or awake if walking) */}
              <div className="flex gap-4 absolute top-6">
                {animationStep === 'arriving' ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-[#1e1b24]" />
                    <div className="w-2 h-2 rounded-full bg-[#1e1b24]" />
                  </>
                ) : (
                  <>
                    <div className="text-xs font-black text-[#1e1b24]">⌒</div>
                    <div className="text-xs font-black text-[#1e1b24]">⌒</div>
                  </>
                )}
              </div>

              {/* Whiskers */}
              <div className="absolute left-[-6px] bottom-3 w-3 h-0.5 bg-[#1e1b24] rotate-6" />
              <div className="absolute left-[-6px] bottom-4 w-3 h-0.5 bg-[#1e1b24] -rotate-6" />
              <div className="absolute right-[-6px] bottom-3 w-3 h-0.5 bg-[#1e1b24] -rotate-6" />
              <div className="absolute right-[-6px] bottom-4 w-3 h-0.5 bg-[#1e1b24] rotate-6" />
            </div>

            {/* Paws */}
            <div className="absolute bottom-0 left-10 flex gap-2 z-20">
              <div className="w-6 h-4 bg-[#fff7ed] rounded-full border-2 border-[#1e1b24]" />
              <div className="w-6 h-4 bg-[#fff7ed] rounded-full border-2 border-[#1e1b24] -ml-2" />
            </div>

            {/* GOLDEN COLLAR WITH SIGNATURE "Z" MEDALLION */}
            <div className="absolute bottom-5 left-11 z-30">
              {/* Collar band */}
              <div className="w-8 h-2 bg-[#581c87] rounded-full border border-[#1e1b24]" />
              {/* Golden "Z" Medallion dangling */}
              <div className="w-5 h-5 rounded-full bg-amber-300 border-1.5 border-[#1e1b24] shadow-xs flex items-center justify-center -mt-0.5 ml-1 animate-pulse">
                <span className="font-display font-black text-[10px] text-[#1e1b24] leading-none">
                  Z
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption note */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-amber-500 font-bold">🎬 Zoon's Aspiring Director Note:</span>
          <span className="font-hand text-sm font-bold text-purple-900">
            "Currently storyboarding my debut 35mm monochrome film!"
          </span>
        </div>
        <div className="text-[11px] text-stone-500">
          Tip: Tap the TV to flip channels, tap the popcorn to pop kernels, or tap Zoon to pet her!
        </div>
      </div>
    </div>
  );
};

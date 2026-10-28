"use client";

import React, { memo } from "react";
import type { StoryStage } from "@/data/story";
import { useLanguage } from "@/lib/i18n";

interface StageArtworkProps {
  stage: StoryStage;
}

const ARTWORK_SUBJECTS: Record<number, Record<string, string>> = {
  0: {
    "bn-IN": "মহাজাগতিক নিউক্লিওসিন্থেসিস ও প্রোটোপ্ল্যানেটারি ডিস্ক",
    "hi-IN": "ब्रह्मांडीय नाभिकीय संलयन एवं प्रोटोप्लेनेटरी डिस्क",
    es: "Nucleosíntesis Cósmica y Disco Protoplanetario",
    fr: "Nucléosynthèse Cosmique et Disque Protoplanétaire",
  },
  1: {
    "bn-IN": "হেডিয়ান ম্যাগমা মহাসাগর ও লৌহ কেন্দ্রের স্তরবিভাজন",
    "hi-IN": "हेडियन मैग्मा महासागर एवं लौह कोर विभेदन",
    es: "Océano de Magma Hádico y Diferenciación del Núcleo",
    fr: "Océan de Magma Hadéen et Différenciation du Noyau",
  },
  2: {
    "bn-IN": "গভীর সমুদ্রের ক্ষারীয় হাইড্রোথার্মাল ভেন্ট চিমনি",
    "hi-IN": "गहरे समुद्र की क्षारीय हाइड्रोथर्मल वेंट चिमनी",
    es: "Chimenea Hidrotermal Alcalina Submarina",
    fr: "Cheminée Hydrothermale Alcaline Sous-Marine",
  },
  3: {
    "bn-IN": "লুকা প্রোটোসেল ও কেমোলিথোঅটোট্রফিক ঝিল্লি",
    "hi-IN": "लूका प्रोटोसेल एवं कीमोलिथोऑटोट्रॉफिक झिल्ली",
    es: "Protocélula LUCA y Membrana Quimiolitoautótrofa",
    fr: "Protocellule LUCA et Membrane Chimiolithoautotrophe",
  },
  4: {
    "bn-IN": "আর্কিয়ান ব্যান্ডেড আয়রন গঠন ও সায়ানোব্যাকটেরিয়া",
    "hi-IN": "आर्कियन बैंडेड आयरन संरचनाएँ एवं सायनोबैक्टीरिया",
    es: "Formaciones de Hierro Bandeado y Cianobacterias",
    fr: "Formations de Fer Rubané Archéennes et Cyanobactéries",
  },
  5: {
    "bn-IN": "সিমবায়োজেনেসিস ও ইউক্যারিয়টিক কোষীয় গঠন",
    "hi-IN": "सहजीविता एवं यूकेरियोटिक कोशिकीय संरचना",
    es: "Simbiogénesis y Arquitectura Celular Eucariota",
    fr: "Symbiogenèse et Architecture Cellulaire Eucaryote",
  },
  6: {
    "bn-IN": "এডিয়াকারান সমুদ্রতল ও জটিল বহুকোষী জীবন",
    "hi-IN": "एडियाकरन समुद्र तल एवं जटिल बहुकोशिकीयता",
    es: "Lecho Marino Ediacárico y Multicelularidad Compleja",
    fr: "Fond Marin Édiacarien et Multicellularité Complexe",
  },
  7: {
    "bn-IN": "জীববৈচিত্র্যের মহাবৃক্ষ ও ফাইলোজেনোমিক্স",
    "hi-IN": "जीवविविधता का महावृक्ष एवं फाइलोजेनोमिक्स",
    es: "El Árbol de la Diversidad y Filogenómica",
    fr: "L'Arbre de la Diversité Vivante et Phylogénomique",
  },
};

/**
 * StageArtwork renders museum-grade, procedural visual representations
 * for each of the 7 evolutionary story stages.
 * Pure SVG + Canvas/CSS guarantees zero network latency, zero 404s,
 * and crisp vector fidelity at any screen density.
 */
function StageArtworkComponent({ stage }: StageArtworkProps) {
  const { t, locale, localizeStoryStage, ui } = useLanguage();
  const locStage = localizeStoryStage(stage);
  const { stageNumber, visualTheme, attribution, timeRange, eonOrEra } = stage;
  const accent = visualTheme.accentColor;
  const displayEon = locStage?.eonOrEra || eonOrEra;
  const displayTime = locStage?.timeRange || timeRange;
  const displaySubject = ARTWORK_SUBJECTS[stageNumber]?.[locale] || attribution.subject;

  return (
    <div
      className="relative rounded-2xl overflow-hidden glass-panel border border-[var(--surface-border)] shadow-2xl group transition-all duration-500"
      style={{
        background: "linear-gradient(180deg, rgba(16, 22, 32, 0.85) 0%, rgba(8, 12, 18, 0.95) 100%)",
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: `0 12px 40px -10px ${accent}25, 0 1px 2px 0 rgba(0, 0, 0, 0.4)`,
      }}
    >
      {/* Ambient background glow behind artwork */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-700 group-hover:opacity-60"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${accent}30 0%, transparent 70%)`,
        }}
      />

      {/* SVG Canvas Stage Illustration (Aspect Ratio 16:10) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <svg
          viewBox="0 0 640 400"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients tailored to each stage theme */}
            <linearGradient id={`grad-sky-${stageNumber}`} x1="0%" y1="0%" x2="0%" y2="100%">
              {stageNumber === 0 && (
                <>
                  <stop offset="0%" stopColor="#030008" />
                  <stop offset="40%" stopColor="#120524" />
                  <stop offset="75%" stopColor="#2e0854" />
                  <stop offset="100%" stopColor="#581c87" />
                </>
              )}
              {stageNumber === 1 && (
                <>
                  <stop offset="0%" stopColor="#1a0a04" />
                  <stop offset="50%" stopColor="#3d1204" />
                  <stop offset="85%" stopColor="#7c2d12" />
                  <stop offset="100%" stopColor="#ea580c" />
                </>
              )}
              {stageNumber === 2 && (
                <>
                  <stop offset="0%" stopColor="#021a24" />
                  <stop offset="50%" stopColor="#042f44" />
                  <stop offset="85%" stopColor="#0e5672" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </>
              )}
              {stageNumber === 3 && (
                <>
                  <stop offset="0%" stopColor="#021e17" />
                  <stop offset="50%" stopColor="#064e3b" />
                  <stop offset="85%" stopColor="#047857" />
                  <stop offset="100%" stopColor="#10b981" />
                </>
              )}
              {stageNumber === 4 && (
                <>
                  <stop offset="0%" stopColor="#1e1035" />
                  <stop offset="50%" stopColor="#3b0764" />
                  <stop offset="85%" stopColor="#581c87" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </>
              )}
              {stageNumber === 5 && (
                <>
                  <stop offset="0%" stopColor="#2a081a" />
                  <stop offset="50%" stopColor="#500724" />
                  <stop offset="85%" stopColor="#831843" />
                  <stop offset="100%" stopColor="#ec4899" />
                </>
              )}
              {stageNumber === 6 && (
                <>
                  <stop offset="0%" stopColor="#07152e" />
                  <stop offset="50%" stopColor="#0c2340" />
                  <stop offset="85%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#3d8ef8" />
                </>
              )}
              {stageNumber === 7 && (
                <>
                  <stop offset="0%" stopColor="#031f30" />
                  <stop offset="50%" stopColor="#075985" />
                  <stop offset="85%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </>
              )}
            </linearGradient>

            {/* Glowing filter */}
            <filter id={`glow-${stageNumber}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Sky / Sea */}
          <rect width="640" height="400" fill={`url(#grad-sky-${stageNumber})`} />

          {/* ─────────────────────────────────────────────────────────────
              STAGE 0: We Are Made of Stardust (Cosmic Origins & Nucleosynthesis)
          ───────────────────────────────────────────────────────────── */}
          {stageNumber === 0 && (
            <g>
              {/* Deep Space Background Void */}
              <rect width="640" height="400" fill="#04010a" />

              {/* Distant cosmic nebula clouds */}
              <path
                d="M-40 180 Q60 60 220 120 T520 80 Q660 100 680 240 Q620 340 440 320 T120 360 Z"
                fill="#3b0764"
                opacity="0.35"
                filter={`url(#glow-${stageNumber})`}
              />
              <path
                d="M100 220 Q240 140 380 200 T600 160 Q660 260 520 320 T200 300 Z"
                fill="#581c87"
                opacity="0.25"
                filter={`url(#glow-${stageNumber})`}
              />

              {/* Distant background stars and galaxies */}
              <circle cx="80" cy="50" r="1.5" fill="#ffffff" opacity="0.9" />
              <circle cx="140" cy="90" r="1" fill="#e9d5ff" opacity="0.7" />
              <circle cx="210" cy="40" r="2" fill="#ffffff" opacity="0.85" />
              <circle cx="290" cy="70" r="1.2" fill="#fde68a" opacity="0.8" />
              <circle cx="480" cy="45" r="1.8" fill="#ffffff" opacity="0.9" />
              <circle cx="560" cy="75" r="1.2" fill="#e9d5ff" opacity="0.75" />
              <circle cx="600" cy="35" r="1.5" fill="#ffffff" opacity="0.8" />
              <circle cx="50" cy="320" r="1.2" fill="#ffffff" opacity="0.6" />
              <circle cx="95" cy="270" r="1.8" fill="#fef08a" opacity="0.75" />
              <circle cx="570" cy="330" r="1.5" fill="#ffffff" opacity="0.7" />
              <circle cx="615" cy="280" r="1" fill="#e9d5ff" opacity="0.6" />

              {/* Supernova Shockwave (Expanding blast wave dispersing forged elements) */}
              <ellipse
                cx="190"
                cy="175"
                rx="155"
                ry="115"
                fill="none"
                stroke="#c084fc"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.5"
                filter={`url(#glow-${stageNumber})`}
              />
              <ellipse
                cx="190"
                cy="175"
                rx="110"
                ry="80"
                fill="none"
                stroke="#f472b6"
                strokeWidth="1.5"
                opacity="0.6"
              />
              {/* Supernova core remnant / energetic outburst */}
              <circle cx="190" cy="175" r="22" fill="#ffffff" filter={`url(#glow-${stageNumber})`} opacity="0.95" />
              <circle cx="190" cy="175" r="42" fill="#fbbf24" opacity="0.3" filter={`url(#glow-${stageNumber})`} />
              {/* Radiating relativistic energy jets */}
              <line x1="190" y1="65" x2="190" y2="285" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
              <line x1="95" y1="175" x2="285" y2="175" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />

              {/* Protoplanetary Accretion Disk (Solar Nebula ~4.6 BYA) */}
              {/* Outer dust lane ellipse */}
              <ellipse
                cx="450"
                cy="235"
                rx="160"
                ry="58"
                fill="none"
                stroke="#d97706"
                strokeWidth="18"
                strokeOpacity="0.35"
                transform="rotate(-12 450 235)"
              />
              {/* Intermediate accretion ring */}
              <ellipse
                cx="450"
                cy="235"
                rx="125"
                ry="44"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="14"
                strokeOpacity="0.55"
                transform="rotate(-12 450 235)"
                filter={`url(#glow-${stageNumber})`}
              />
              {/* Inner bright gaseous ring */}
              <ellipse
                cx="450"
                cy="235"
                rx="85"
                ry="28"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="8"
                strokeOpacity="0.75"
                transform="rotate(-12 450 235)"
              />

              {/* Early proto-Sun at center of Solar Nebula */}
              <circle cx="450" cy="235" r="20" fill="#fef08a" filter={`url(#glow-${stageNumber})`} />
              <circle cx="450" cy="235" r="32" fill="#f59e0b" opacity="0.4" filter={`url(#glow-${stageNumber})`} />

              {/* Accreting proto-Earth in orbit (~4.54 BYA) */}
              <g transform="rotate(-12 450 235)">
                {/* Orbital track hint */}
                <ellipse cx="450" cy="235" rx="105" ry="36" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />
                {/* Proto-Earth accretion sphere */}
                <circle cx="345" cy="235" r="8.5" fill="#38bdf8" stroke="#f97316" strokeWidth="2" filter={`url(#glow-${stageNumber})`} />
                {/* Debris wake around young Earth */}
                <circle cx="334" cy="236" r="2" fill="#fed7aa" opacity="0.8" />
                <circle cx="356" cy="233" r="1.5" fill="#fed7aa" opacity="0.8" />
              </g>

              {/* CHNOPS Elemental Symbols in the cosmic stream */}
              <g opacity="0.85" style={{ fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>
                {/* Carbon (C) */}
                <circle cx="105" cy="125" r="11" fill="rgba(168, 85, 247, 0.3)" stroke="#c084fc" strokeWidth="1.2" />
                <text x="105" y="129" fill="#f3e8ff" textAnchor="middle">C</text>

                {/* Hydrogen (H) */}
                <circle cx="280" cy="100" r="11" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" strokeWidth="1.2" />
                <text x="280" y="104" fill="#e0f2fe" textAnchor="middle">H</text>

                {/* Nitrogen (N) */}
                <circle cx="320" cy="305" r="11" fill="rgba(16, 185, 129, 0.3)" stroke="#34d399" strokeWidth="1.2" />
                <text x="320" y="309" fill="#d1fae5" textAnchor="middle">N</text>

                {/* Oxygen (O) */}
                <circle cx="360" cy="115" r="11" fill="rgba(244, 63, 94, 0.3)" stroke="#fb7185" strokeWidth="1.2" />
                <text x="360" y="119" fill="#ffe4e6" textAnchor="middle">O</text>

                {/* Phosphorus (P) */}
                <circle cx="560" cy="155" r="11" fill="rgba(245, 158, 11, 0.3)" stroke="#fbbf24" strokeWidth="1.2" />
                <text x="560" y="159" fill="#fef3c7" textAnchor="middle">P</text>

                {/* Sulfur (S) */}
                <circle cx="240" cy="275" r="11" fill="rgba(234, 179, 8, 0.3)" stroke="#facc15" strokeWidth="1.2" />
                <text x="240" y="279" fill="#fef9c3" textAnchor="middle">S</text>
              </g>

              {/* Cosmic dust connectors between elements */}
              <line x1="116" y1="125" x2="170" y2="155" stroke="rgba(192, 132, 252, 0.3)" strokeDasharray="3 3" />
              <line x1="280" y1="111" x2="350" y2="115" stroke="rgba(56, 189, 248, 0.3)" strokeDasharray="3 3" />
              <line x1="360" y1="126" x2="430" y2="215" stroke="rgba(251, 113, 133, 0.3)" strokeDasharray="3 3" />
              <line x1="240" y1="264" x2="310" y2="235" stroke="rgba(250, 204, 21, 0.3)" strokeDasharray="3 3" />
            </g>
          )}

          {/* ─────────────────────────────────────────────────────────────
              STAGE 1: The Prebiotic Cradle (Hadean Volcanism & Ocean)
          ───────────────────────────────────────────────────────────── */}
          {stageNumber === 1 && (
            <g>
              {/* Moon close to young Earth (4.5 BYA) */}
              <circle cx="510" cy="90" r="44" fill="#fed7aa" opacity="0.35" />
              <circle cx="510" cy="90" r="44" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
              <circle cx="495" cy="80" r="8" fill="#c2410c" opacity="0.3" />
              <circle cx="525" cy="100" r="12" fill="#c2410c" opacity="0.25" />

              {/* Atmospheric meteorite streaks */}
              <path d="M120 30 L220 90" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <path d="M380 20 L440 60" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />

              {/* Volcanic mountains / craggy crust */}
              <polygon points="-40,400 60,260 160,330 250,230 360,340 470,250 580,310 680,240 700,400" fill="#180804" />
              <polygon points="40,400 130,285 220,350 310,270 410,360 520,280 620,330 680,400" fill="#2d0f06" opacity="0.85" />

              {/* Magma flows and fissures */}
              <path d="M250 230 Q270 280 290 340 T320 400" stroke="#f97316" strokeWidth="5" fill="none" filter={`url(#glow-${stageNumber})`} />
              <path d="M470 250 Q450 300 430 350 T410 400" stroke="#fbbf24" strokeWidth="4" fill="none" filter={`url(#glow-${stageNumber})`} />
              <path d="M60 260 Q100 310 130 370" stroke="#ea580c" strokeWidth="3.5" fill="none" />

              {/* Hydrothermal steam plumes */}
              <ellipse cx="250" cy="225" rx="35" ry="50" fill="#f97316" opacity="0.35" filter={`url(#glow-${stageNumber})`} />
              <ellipse cx="470" cy="245" rx="30" ry="45" fill="#f59e0b" opacity="0.3" filter={`url(#glow-${stageNumber})`} />

              {/* Primeval ocean waves at bottom */}
              <path d="M0 350 C120 340 180 365 300 355 C420 345 500 370 640 355 L640 400 L0 400 Z" fill="#082f49" opacity="0.85" />
              <path d="M0 370 C140 360 220 380 340 370 C460 360 540 385 640 375 L640 400 L0 400 Z" fill="#0c4a6e" opacity="0.75" />
            </g>
          )}

          {/* ─────────────────────────────────────────────────────────────
              STAGE 2: The Spark of Self-Replication (RNA & Protocells)
          ───────────────────────────────────────────────────────────── */}
          {stageNumber === 2 && (
            <g>
              {/* Deep ocean vent background */}
              <rect width="640" height="400" fill="#031622" />

              {/* Hydrothermal chimney silhouette */}
              <polygon points="80,400 120,240 160,240 180,400" fill="#082230" />
              <polygon points="140,400 170,180 205,180 230,400" fill="#0a2c3d" />

              {/* Supercritical mineral smoke plume */}
              <path d="M185 180 Q160 120 180 60 Q210 20 250 10" stroke="#06b6d4" strokeWidth="22" strokeLinecap="round" fill="none" opacity="0.25" filter={`url(#glow-${stageNumber})`} />
              <path d="M185 180 Q200 130 190 70" stroke="#38bdf8" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.35" />

              {/* Lipid Bilayer Protocell Vesicle */}
              <circle cx="440" cy="210" r="115" fill="#083344" stroke="#06b6d4" strokeWidth="4" opacity="0.85" filter={`url(#glow-${stageNumber})`} />
              <circle cx="440" cy="210" r="105" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

              {/* Internal Catalytic RNA Ribbon (Double undulating helix) */}
              <path d="M370 230 Q400 160 440 210 T510 190" stroke="#a5f3fc" strokeWidth="4" fill="none" filter={`url(#glow-${stageNumber})`} />
              <path d="M370 190 Q410 240 450 180 T510 230" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* Base pair rungs */}
              <line x1="395" y1="185" x2="395" y2="215" stroke="#67e8f9" strokeWidth="2" opacity="0.75" />
              <line x1="430" y1="192" x2="430" y2="220" stroke="#67e8f9" strokeWidth="2" opacity="0.75" />
              <line x1="465" y1="185" x2="465" y2="215" stroke="#67e8f9" strokeWidth="2" opacity="0.75" />
              <line x1="490" y1="195" x2="490" y2="225" stroke="#67e8f9" strokeWidth="2" opacity="0.75" />

              {/* Floating prebiotic molecules & nucleotides */}
              <circle cx="280" cy="140" r="5" fill="#67e8f9" filter={`url(#glow-${stageNumber})`} />
              <circle cx="310" cy="280" r="4" fill="#a5f3fc" />
              <circle cx="580" cy="160" r="6" fill="#38bdf8" opacity="0.8" />
              <circle cx="350" cy="80" r="3" fill="#67e8f9" opacity="0.6" />
              <circle cx="560" cy="310" r="5" fill="#a5f3fc" opacity="0.7" />
            </g>
          )}

          {/* ─────────────────────────────────────────────────────────────
              STAGE 3: The Deep Microbial Ocean & LUCA (Stromatolites & GOE)
          ───────────────────────────────────────────────────────────── */}
          {stageNumber === 3 && (
            <g>
              {/* Archean green-tinted ocean */}
              <rect width="640" height="400" fill="#022c22" />

              {/* Sunbeam rays filtering down into the water */}
              <polygon points="120,0 200,0 320,400 180,400" fill="#10b981" opacity="0.12" />
              <polygon points="340,0 420,0 540,400 410,400" fill="#34d399" opacity="0.15" />

              {/* Coastal Stromatolite microbial mounds */}
              <ellipse cx="140" cy="380" rx="110" ry="70" fill="#064e3b" stroke="#059669" strokeWidth="2" />
              <ellipse cx="140" cy="350" rx="90" ry="50" fill="#047857" stroke="#10b981" strokeWidth="1.5" />
              <ellipse cx="140" cy="325" rx="70" ry="35" fill="#059669" stroke="#34d399" strokeWidth="1" />

              <ellipse cx="360" cy="390" rx="140" ry="80" fill="#064e3b" stroke="#059669" strokeWidth="2" />
              <ellipse cx="360" cy="360" rx="115" ry="60" fill="#047857" stroke="#10b981" strokeWidth="1.5" />
              <ellipse cx="360" cy="335" rx="85" ry="40" fill="#059669" stroke="#34d399" strokeWidth="1" />

              <ellipse cx="560" cy="380" rx="95" ry="65" fill="#064e3b" stroke="#059669" strokeWidth="2" />
              <ellipse cx="560" cy="350" rx="75" ry="45" fill="#047857" />

              {/* Oxygen gas bubbles rising (Great Oxidation Event) */}
              <circle cx="150" cy="270" r="8" fill="#6ee7b7" opacity="0.75" filter={`url(#glow-${stageNumber})`} />
              <circle cx="165" cy="220" r="12" fill="#a7f3d0" opacity="0.85" />
              <circle cx="145" cy="160" r="16" fill="#d1fae5" opacity="0.9" filter={`url(#glow-${stageNumber})`} />

              <circle cx="370" cy="280" r="9" fill="#6ee7b7" opacity="0.7" />
              <circle cx="390" cy="210" r="14" fill="#a7f3d0" opacity="0.8" />
              <circle cx="360" cy="130" r="18" fill="#ecfdf5" opacity="0.9" filter={`url(#glow-${stageNumber})`} />

              {/* Cyanobacteria filaments */}
              <path d="M220 280 Q240 230 230 180 T260 110" stroke="#34d399" strokeWidth="3" strokeDasharray="6 3" fill="none" opacity="0.8" />
              <path d="M470 290 Q450 240 480 190 T460 120" stroke="#10b981" strokeWidth="3" strokeDasharray="6 3" fill="none" opacity="0.8" />
            </g>
          )}

          {/* ─────────────────────────────────────────────────────────────
              STAGE 4: Eukaryogenesis & The Complex Cell (Endosymbiosis)
          ───────────────────────────────────────────────────────────── */}
          {stageNumber === 4 && (
            <g>
              {/* Proterozoic deep celestial ocean */}
              <rect width="640" height="400" fill="#130924" />

              {/* Large Eukaryotic Cell membrane */}
              <ellipse cx="320" cy="200" rx="220" ry="145" fill="#2e1065" stroke="#8b5cf6" strokeWidth="3.5" opacity="0.85" filter={`url(#glow-${stageNumber})`} />
              <ellipse cx="320" cy="200" rx="205" ry="132" fill="#3b0764" opacity="0.6" />

              {/* Central Nucleus with nuclear membrane pores */}
              <ellipse cx="280" cy="195" rx="75" ry="55" fill="#581c87" stroke="#c084fc" strokeWidth="2.5" />
              <ellipse cx="280" cy="195" rx="60" ry="42" fill="#4a044e" opacity="0.7" />
              {/* Chromatin threads inside nucleus */}
              <path d="M250 195 Q270 175 290 195 T310 185" stroke="#e9d5ff" strokeWidth="2.5" fill="none" opacity="0.8" />
              <path d="M260 210 Q280 225 300 205" stroke="#f3e8ff" strokeWidth="2" fill="none" opacity="0.7" />

              {/* Engulfed Mitochondrion (Endosymbiont with cristae) */}
              <g transform="translate(410, 150) rotate(-25)">
                <ellipse cx="0" cy="0" rx="42" ry="22" fill="#065f46" stroke="#34d399" strokeWidth="2.5" filter={`url(#glow-${stageNumber})`} />
                {/* Cristae inner foldings */}
                <path d="M-28 -5 Q-15 0 -28 5 M-10 -10 Q5 0 -10 10 M10 -10 Q22 0 10 10" stroke="#6ee7b7" strokeWidth="2" fill="none" />
              </g>

              {/* Second Mitochondrion */}
              <g transform="translate(210, 260) rotate(35)">
                <ellipse cx="0" cy="0" rx="34" ry="18" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                <path d="M-20 -4 Q-10 0 -20 4 M0 -8 Q10 0 0 8 M12 -8 Q20 0 12 8" stroke="#6ee7b7" strokeWidth="1.5" fill="none" />
              </g>

              {/* Endoplasmic reticulum folds */}
              <path d="M205 160 Q180 190 195 220" stroke="#a855f7" strokeWidth="2.5" fill="none" opacity="0.7" />
              <path d="M360 240 Q390 220 375 260" stroke="#a855f7" strokeWidth="2.5" fill="none" opacity="0.7" />

              {/* Ediacaran Dickinsonia silhouette in background */}
              <g transform="translate(520, 80) scale(0.65)" opacity="0.45">
                <ellipse cx="0" cy="0" rx="60" ry="38" fill="none" stroke="#c084fc" strokeWidth="2" />
                <line x1="-50" y1="0" x2="50" y2="0" stroke="#c084fc" strokeWidth="1.5" />
                <line x1="-30" y1="-25" x2="-30" y2="25" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="-35" x2="0" y2="35" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="30" y1="-25" x2="30" y2="25" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" />
              </g>
            </g>
          )}

          {/* ─────────────────────────────────────────────────────────────
              STAGE 5: Cambrian Explosion & Land Invasion (Fauna & Flora)
          ───────────────────────────────────────────────────────────── */}
          {stageNumber === 5 && (
            <g>
              {/* Paleozoic / Mesozoic dusk gradient */}
              <rect width="640" height="400" fill="#240718" />

              {/* Prehistoric tree ferns & lycophytes silhouette */}
              <polygon points="540,400 550,160 560,400" fill="#091a10" />
              {/* Palm/Fern fronds */}
              <path d="M550 160 Q490 120 460 150" stroke="#047857" strokeWidth="3" fill="none" />
              <path d="M550 160 Q610 110 635 140" stroke="#047857" strokeWidth="3" fill="none" />
              <path d="M550 175 Q470 170 450 200" stroke="#047857" strokeWidth="2.5" fill="none" />
              <path d="M550 175 Q620 160 640 190" stroke="#047857" strokeWidth="2.5" fill="none" />

              {/* Swimming Anomalocaris predator silhouette (Cambrian) */}
              <g transform="translate(180, 140) scale(0.85) rotate(-12)">
                <ellipse cx="0" cy="0" rx="80" ry="26" fill="#be185d" opacity="0.9" filter={`url(#glow-${stageNumber})`} />
                {/* Lateral swimming lobes */}
                <ellipse cx="-40" cy="22" rx="16" ry="8" fill="#f43f5e" />
                <ellipse cx="-15" cy="25" rx="18" ry="9" fill="#f43f5e" />
                <ellipse cx="15" cy="26" rx="20" ry="10" fill="#f43f5e" />
                <ellipse cx="45" cy="22" rx="17" ry="8" fill="#f43f5e" />
                {/* Stalked compound eyes */}
                <circle cx="75" cy="-16" r="9" fill="#fb7185" />
                <circle cx="65" cy="-18" r="8" fill="#fda4af" />
                {/* Barbed frontal appendages */}
                <path d="M85 0 Q110 15 95 35" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" fill="none" />
              </g>

              {/* Benthic Trilobite on seafloor */}
              <g transform="translate(120, 340) scale(0.65)">
                <ellipse cx="0" cy="0" rx="45" ry="32" fill="#831843" stroke="#f472b6" strokeWidth="2" />
                <line x1="-35" y1="0" x2="35" y2="0" stroke="#fda4af" strokeWidth="2" />
                <line x1="-20" y1="-28" x2="-20" y2="28" stroke="#fda4af" strokeWidth="1.5" />
                <line x1="10" y1="-30" x2="10" y2="30" stroke="#fda4af" strokeWidth="1.5" />
              </g>

              {/* Theropod dinosaur silhouette against sky */}
              <g transform="translate(420, 270) scale(0.75)" opacity="0.9">
                {/* Torso & Legs */}
                <ellipse cx="0" cy="0" rx="45" ry="25" fill="#4c0519" />
                <path d="M-15 15 L-30 65 L-15 70" stroke="#4c0519" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M15 15 L5 65 L20 70" stroke="#4c0519" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* Tail */}
                <path d="M-40 -5 Q-95 -20 -130 5" stroke="#4c0519" strokeWidth="14" strokeLinecap="round" fill="none" />
                {/* Neck & Head */}
                <path d="M35 -10 Q65 -35 85 -20" stroke="#4c0519" strokeWidth="12" strokeLinecap="round" fill="none" />
                <polygon points="80,-30 110,-20 85,-10" fill="#4c0519" />
              </g>
            </g>
          )}

          {/* ─────────────────────────────────────────────────────────────
              STAGE 6: The Twig of Humanity (African Savanna & Stars)
          ───────────────────────────────────────────────────────────── */}
          {stageNumber === 6 && (
            <g>
              {/* Deep nocturnal blue sky */}
              <rect width="640" height="400" fill="#040d1a" />

              {/* Canopy of stars */}
              <circle cx="100" cy="60" r="1.5" fill="#ffffff" opacity="0.9" />
              <circle cx="180" cy="40" r="2" fill="#93c5fd" opacity="0.8" />
              <circle cx="260" cy="85" r="1" fill="#ffffff" opacity="0.6" />
              <circle cx="340" cy="30" r="2.5" fill="#ffffff" opacity="0.95" filter={`url(#glow-${stageNumber})`} />
              <circle cx="430" cy="70" r="1.5" fill="#bfdbfe" opacity="0.75" />
              <circle cx="520" cy="45" r="2" fill="#ffffff" opacity="0.85" />
              <circle cx="580" cy="90" r="1" fill="#ffffff" opacity="0.7" />

              {/* Milky Way dust cloud */}
              <ellipse cx="320" cy="80" rx="260" ry="35" fill="#1e3a8a" opacity="0.25" transform="rotate(-15 320 80)" filter={`url(#glow-${stageNumber})`} />

              {/* Savanna Horizon & Acacia Tree Silhouette */}
              <polygon points="0,400 0,330 640,310 640,400" fill="#030712" />

              {/* Flat-topped Acacia tree silhouette */}
              <path d="M140 330 Q145 250 155 210" stroke="#020617" strokeWidth="8" fill="none" />
              <ellipse cx="140" cy="195" rx="75" ry="16" fill="#020617" />
              <ellipse cx="170" cy="180" rx="55" ry="14" fill="#020617" />
              <ellipse cx="110" cy="205" rx="45" ry="12" fill="#020617" />

              {/* Hominin bipedal figures walking across savanna ridge */}
              <g transform="translate(360, 312) scale(0.65)">
                {/* Figure 1 (Adult) */}
                <circle cx="0" cy="-65" r="6" fill="#1e293b" />
                <path d="M0 -58 L0 -25 L-8 0" stroke="#1e293b" strokeWidth="4" fill="none" />
                <path d="M0 -25 L8 0" stroke="#1e293b" strokeWidth="4" fill="none" />
                <path d="M-6 -45 L-12 -25" stroke="#1e293b" strokeWidth="3" fill="none" />

                {/* Figure 2 (Accompanied) */}
                <circle cx="28" cy="-58" r="5" fill="#1e293b" />
                <path d="M28 -52 L28 -20 L22 0" stroke="#1e293b" strokeWidth="3.5" fill="none" />
                <path d="M28 -20 L34 0" stroke="#1e293b" strokeWidth="3.5" fill="none" />
              </g>

              {/* Firelight / Campfire glow */}
              <circle cx="480" cy="318" r="12" fill="#f59e0b" filter={`url(#glow-${stageNumber})`} opacity="0.8" />
              <circle cx="480" cy="316" r="6" fill="#fef08a" />
              {/* Embers drifting up */}
              <circle cx="482" cy="290" r="1.5" fill="#fbbf24" opacity="0.8" />
              <circle cx="478" cy="270" r="1" fill="#f97316" opacity="0.6" />
              <circle cx="485" cy="250" r="1.2" fill="#fef08a" opacity="0.7" />
            </g>
          )}

          {/* ─────────────────────────────────────────────────────────────
              STAGE 7: The Interconnected Tree (Fractal Tree of Life)
          ───────────────────────────────────────────────────────────── */}
          {stageNumber === 7 && (
            <g>
              {/* Celestial deep blue */}
              <rect width="640" height="400" fill="#021626" />

              {/* Center radiating pulse of common ancestry (LUCA) */}
              <circle cx="320" cy="350" r="18" fill="#38bdf8" filter={`url(#glow-${stageNumber})`} opacity="0.85" />
              <circle cx="320" cy="350" r="8" fill="#ffffff" />

              {/* Major Primary Trunks (Bacteria, Archaea, Eukaryota) */}
              {/* Bacteria Trunk (Left) */}
              <path d="M320 350 Q230 300 170 230" stroke="#0ea5e9" strokeWidth="5" fill="none" opacity="0.9" />
              <path d="M170 230 Q120 180 80 120" stroke="#38bdf8" strokeWidth="3" fill="none" />
              <path d="M170 230 Q180 160 160 90" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
              <circle cx="80" cy="120" r="5" fill="#7dd3fc" filter={`url(#glow-${stageNumber})`} />
              <circle cx="160" cy="90" r="5" fill="#7dd3fc" filter={`url(#glow-${stageNumber})`} />

              {/* Archaea Trunk (Middle-Left) */}
              <path d="M320 350 Q280 270 260 190" stroke="#38bdf8" strokeWidth="4" fill="none" />
              <path d="M260 190 Q240 130 250 70" stroke="#7dd3fc" strokeWidth="2.5" fill="none" />
              <circle cx="250" cy="70" r="5" fill="#bae6fd" filter={`url(#glow-${stageNumber})`} />

              {/* Eukaryota Trunk (Right / Canopy) */}
              <path d="M320 350 Q380 280 430 210" stroke="#38bdf8" strokeWidth="6" fill="none" opacity="0.95" filter={`url(#glow-${stageNumber})`} />
              {/* Plant branch */}
              <path d="M430 210 Q390 140 370 80" stroke="#34d399" strokeWidth="3" fill="none" />
              <circle cx="370" cy="80" r="6" fill="#6ee7b7" filter={`url(#glow-${stageNumber})`} />
              {/* Fungi branch */}
              <path d="M430 210 Q460 140 470 70" stroke="#fbbf24" strokeWidth="3" fill="none" />
              <circle cx="470" cy="70" r="6" fill="#fde68a" filter={`url(#glow-${stageNumber})`} />
              {/* Metazoa / Animal branch */}
              <path d="M430 210 Q510 160 560 100" stroke="#f43f5e" strokeWidth="3.5" fill="none" />
              <circle cx="560" cy="100" r="7" fill="#fda4af" filter={`url(#glow-${stageNumber})`} />

              {/* Radiating constellation dots connecting all leaves */}
              <line x1="80" y1="120" x2="160" y2="90" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
              <line x1="160" y1="90" x2="250" y2="70" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
              <line x1="250" y1="70" x2="370" y2="80" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
              <line x1="370" y1="80" x2="470" y2="70" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
              <line x1="470" y1="70" x2="560" y2="100" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />

              {/* Subtle starlight sparkles */}
              <circle cx="320" cy="180" r="2" fill="#ffffff" opacity="0.75" />
              <circle cx="480" cy="270" r="2.5" fill="#ffffff" opacity="0.8" />
              <circle cx="190" cy="300" r="2" fill="#ffffff" opacity="0.6" />
            </g>
          )}
        </svg>

        {/* Top-Right Pill on Image: Era & Time Coordinates */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10.5px] font-medium text-white/90 shadow-lg">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}
          />
          <span>{displayEon}</span>
          <span className="text-white/40">·</span>
          <span className="text-white/70">{displayTime}</span>
        </div>

        {/* Bottom Bar on Image: Title & Scientific Verification Tag */}
        <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase text-white/60 mb-0.5">
              {ui.story.scientificReconstruction || t("story.scientificReconstruction", "Scientific Reconstruction")}
            </div>
            <div className="text-xs font-semibold text-white/95">
              {displaySubject}
            </div>
          </div>
          <div className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-white/10 backdrop-blur-sm text-white/80 border border-white/10">
            {attribution.license}
          </div>
        </div>
      </div>

      {/* Attribution Drawer Footer */}
      <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-[var(--text-tertiary)]">
        <span className="truncate max-w-[280px]">
          {attribution.source} · {attribution.credit}
        </span>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-white/40">
          {stageNumber === 0
            ? `0 (${ui.story.prologue || t("story.prologue", "Prologue")})`
            : `${ui.story.stageCounter || t("story.stageCounter", "Stage")} ${stageNumber}`}
        </span>
      </div>
    </div>
  );
}

export default memo(StageArtworkComponent);

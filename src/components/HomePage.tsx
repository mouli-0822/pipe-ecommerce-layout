import React, { useState } from 'react';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Droplets,
  Wrench,
  Star,
  CheckCircle2,
  Crown,
  BadgePercent,
  Clock,
  Award,
  Sparkles,
  Percent,
  Gauge,
  Layers,
  Flame,
  Plus,
} from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  COMPANY_INFO,
  type CatalogProduct,
  type ProductCategory,
  type ImageCrop,
} from '../data/catalog';
import { ProductCard } from './ProductCard';
import { CroppedAssetImage } from './CroppedAssetImage';
import { type ActivePage } from './Navbar';
import { resolveAssetPath } from '../utils/assetPath';

interface HomePageProps {
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: CatalogProduct) => void;
  onQuickAdd: (product: CatalogProduct) => void;
  onNavigate: (
    page: ActivePage,
    categoryFilter?: ProductCategory | 'All',
    search?: string
  ) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  wishlist,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  onNavigate,
}) => {
  const findById = (id: string) =>
    CATALOG_PRODUCTS.find((p) => p.id === id) || CATALOG_PRODUCTS[0];

  // Interactive Hero Division Switcher State
  const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);
  // Interactive Featured Section Quick Filter
  const [featuredTab, setFeaturedTab] = useState<'all' | 'pvc' | 'cpvc' | 'swr'>('all');

  const heroShowcases = [
    {
      code: '01',
      shortLabel: 'Aquasafe ISI PVC',
      pressureTag: '4 KG · 6 KG · 10 KG · 15 KG',
      tempOrSpec: '20 mm (½") – 400 mm (16")',
      highlightMetric: 'Rs. 192',
      metricSub: 'Starts / 6M Pipe',
      product: findById('astral-aquasafe-10kg'),
    },
    {
      code: '02',
      shortLabel: 'CPVC SDR 11 / 13.5',
      pressureTag: 'HOT & COLD WATER · 93°C',
      tempOrSpec: '½" to 8" · 3 Mtr & 5 Mtr',
      highlightMetric: 'Rs. 273',
      metricSub: 'Starts / 3M Pipe',
      product: findById('cpvc-pipe-sdr11-3m-5m'),
    },
    {
      code: '03',
      shortLabel: 'SWR Selfit & Foamcore',
      pressureTag: 'TYPE A · TYPE B · SN 8',
      tempOrSpec: '2½" to 12" Zero-Leak Ring',
      highlightMetric: 'Rs. 1,140',
      metricSub: 'Starts / 6M SWR',
      product: findById('astral-swr-pipe-selfit'),
    },
    {
      code: '04',
      shortLabel: 'Cleo 4D & Valves',
      pressureTag: '4-LAYER UV · ANTIBACTERIAL',
      tempOrSpec: '500L – 2000L & Industrial',
      highlightMetric: 'Rs. 4,750',
      metricSub: 'Starts / 500L Tank',
      product: findById('cover-astral-cleo-4d-tank'),
    },
  ];

  const currentHero = heroShowcases[activeHeroSlide] || heroShowcases[0];

  // 1. 10 Circular Category Medallions below Hero
  const circularCategories: {
    label: string;
    specSub: string;
    category: ProductCategory | 'All';
    search?: string;
    crop?: ImageCrop;
    isDeals?: boolean;
  }[] = [
    {
      label: 'Aquasafe PVC',
      specSub: '4–15 KG',
      category: 'Aquasafe PVC Pipes',
      crop: findById('astral-aquasafe-10kg').imageCrop,
    },
    {
      label: 'Foamcore Pipe',
      specSub: 'SN 2/4/8',
      category: 'Aquasafe PVC Pipes',
      search: 'Foam Core',
      crop: findById('astral-foamcore-underground').imageCrop,
    },
    {
      label: 'SWR Pipes',
      specSub: 'Type A & B',
      category: 'SWR Pipes & Fittings',
      search: 'Selfit',
      crop: findById('astral-swr-pipe-selfit').imageCrop,
    },
    {
      label: 'SWR Fittings',
      specSub: 'Tee & Elbow',
      category: 'SWR Pipes & Fittings',
      crop: findById('swr-door-tee-elbow-shoe45').imageCrop,
    },
    {
      label: 'CPVC Pipes',
      specSub: 'SDR 11/13.5',
      category: 'CPVC Pipes & Fittings',
      search: 'SDR 11',
      crop: findById('cpvc-pipe-sdr11-3m-5m').imageCrop,
    },
    {
      label: 'CPVC Fittings',
      specSub: 'Brass & Union',
      category: 'CPVC Pipes & Fittings',
      search: 'Elbow',
      crop: findById('cpvc-elbow-tee-coupler-shoe').imageCrop,
    },
    {
      label: 'Pipe Fix Solvent',
      specSub: '101 · 307 · 206',
      category: 'Solvents & Primers',
      crop: findById('solvent-pvc-101-pipefix').imageCrop,
    },
    {
      label: 'Traps & Gullies',
      specSub: 'P/S/Q & Gully',
      category: 'Traps, Gullies & Valves',
      crop: findById('swr-traps-gully-backflow').imageCrop,
    },
    {
      label: 'Tanks & Bath',
      specSub: 'Cleo 4D & Suite',
      category: 'Sanitaryware, Tanks & Pumps',
      crop: findById('cover-astral-cleo-4d-tank').imageCrop,
    },
    {
      label: '02.10.25 Rates',
      specSub: 'PDF Sheets',
      category: 'All',
      isDeals: true,
    },
  ];

  // 2. Row 1: FEATURED PRODUCTS (5 cards with interactive division tab filter)
  const allFeaturedRows: Record<
    'all' | 'pvc' | 'cpvc' | 'swr',
    { product: CatalogProduct; badge?: string; reviews: number }[]
  > = {
    all: [
      { product: findById('astral-aquasafe-10kg'), badge: 'Bestseller', reviews: 120 },
      { product: findById('cpvc-pipe-sdr11-3m-5m'), badge: 'ISI / SDR 11', reviews: 98 },
      { product: findById('swr-door-tee-elbow-shoe45'), badge: 'IS 14735', reviews: 86 },
      { product: findById('solvent-pvc-101-pipefix'), badge: 'Fast Cure', reviews: 203 },
      { product: findById('cover-astral-cleo-4d-tank'), badge: 'Cleo 4D UV', reviews: 76 },
    ],
    pvc: [
      { product: findById('astral-aquasafe-4kg'), badge: 'ISI 4 KG', reviews: 142 },
      { product: findById('astral-aquasafe-6kg'), badge: 'ISI 6 KG', reviews: 96 },
      { product: findById('astral-aquasafe-10kg'), badge: 'Bestseller', reviews: 120 },
      { product: findById('astral-aquasafe-15kg'), badge: 'ISI 15 KG', reviews: 88 },
      { product: findById('astral-foamcore-underground'), badge: 'SN 2 / 4 / 8', reviews: 117 },
    ],
    cpvc: [
      { product: findById('cpvc-pipe-sdr11-3m-5m'), badge: 'SDR 11 Hot/Cold', reviews: 98 },
      { product: findById('cpvc-pipe-sdr135-3m-5m'), badge: 'SDR 13.5', reviews: 74 },
      { product: findById('cpvc-elbow-tee-coupler-shoe'), badge: '90° & Tee', reviews: 112 },
      { product: findById('cpvc-valves-mta-fta-flange'), badge: 'Ball Valves', reviews: 173 },
      { product: findById('solvent-cpvc-307-pipefix'), badge: 'CPVC 307', reviews: 165 },
    ],
    swr: [
      { product: findById('astral-swr-pipe-selfit'), badge: 'Type A & B', reviews: 84 },
      { product: findById('swr-door-tee-elbow-shoe45'), badge: 'Door Access', reviews: 86 },
      { product: findById('swr-single-y-reducer-y'), badge: 'Branch Y', reviews: 64 },
      { product: findById('swr-tee-elbow-cleanout-double'), badge: 'Double Y', reviews: 79 },
      { product: findById('swr-traps-gully-backflow'), badge: 'Gully & Traps', reviews: 91 },
    ],
  };

  const featuredRow = allFeaturedRows[featuredTab];

  // 3. Row 2: BEST SELLERS (5 cards matching middle row)
  const bestSellersRow: { product: CatalogProduct; reviews: number }[] = [
    { product: findById('astral-aquasafe-4kg'), reviews: 142 },
    { product: findById('astral-aquasafe-6kg'), reviews: 96 },
    { product: findById('astral-swr-pipe-selfit'), reviews: 84 },
    { product: findById('astral-foamcore-underground'), reviews: 117 },
    { product: findById('cpvc-valves-mta-fta-flange'), reviews: 173 },
  ];

  // 4. Row 3: JUST FOR YOU (5 centered minimal cards)
  const justForYouRow: CatalogProduct[] = [
    findById('solvent-cpvc-307-pipefix'),
    findById('solvent-upvc-206-717-primer'),
    findById('swr-traps-gully-backflow'),
    findById('swr-single-y-reducer-y'),
    findById('cover-pumps-valves-hoses-manhole'),
  ];

  // 5. Row 4: PIPING INSPIRATION (4 dark engineering guide cards)
  const inspirationCards = [
    {
      specCode: 'IS 4985 · 15 KG',
      titleLine1: 'BUILD',
      titleLine2: 'PRESSURE',
      subtitle: 'Aquasafe 4KG–15KG Spec Plan',
      product: findById('astral-aquasafe-15kg'),
    },
    {
      specCode: 'IS 13592 · RING-FIT',
      titleLine1: 'STAY',
      titleLine2: 'LEAK-FREE',
      subtitle: 'SWR Selfit & Ring-Fit Guide',
      product: findById('swr-tee-elbow-cleanout-double'),
    },
    {
      specCode: 'IS 15778 · 93°C HOT',
      titleLine1: 'FLOW',
      titleLine2: 'BETTER',
      subtitle: 'CPVC SDR 11 Hot Water Spec',
      product: findById('cpvc-elbow-tee-coupler-shoe'),
    },
    {
      specCode: '4D UV · CERAMIC',
      titleLine1: 'STORE',
      titleLine2: 'SAFER',
      subtitle: 'Cleo 4D & Sanitaryware Guide',
      product: findById('cover-sanitaryware-bath-suite'),
    },
  ];

  // 6. Row 5: WHAT OUR CUSTOMERS SAY
  const customerReviews = [
    {
      initials: 'KR',
      name: 'Karthik R.',
      role: 'Civil Project Engineer',
      quote:
        '"Amazing pipe quality and fast site delivery! Papies Company has completely streamlined our Astral Aquasafe and SWR procurement."',
      accentBg: 'bg-sky-700',
    },
    {
      initials: 'SK',
      name: 'Saravanan K.',
      role: 'MEP Plumbing Contractor',
      quote:
        '"Great products and wholesale support. The CPVC SDR 11 pipes and Pipe Fix solvents are durable and worth every rupee."',
      accentBg: 'bg-[#0B1524]',
    },
    {
      initials: 'UT',
      name: 'Usman T.',
      role: 'Residential Developer',
      quote:
        '"Fits perfectly and zero leakage on our apartment project. Highly recommend Papies Company to anyone serious about plumbing!"',
      accentBg: 'bg-sky-600',
    },
  ];

  return (
    <div className="bg-[#F4F7FA] text-slate-900 pb-8">
      {/* =====================================================================
          1. UNIQUE CUSTOM-ENGINEERED PAPIES® HYDRAULIC HERO BANNER
             Preserves the exact Barlow Condensed + Brush font hierarchy while
             delivering a bespoke 8K Piping Showcase & Live Division Switcher
      ===================================================================== */}
      <section className="relative bg-[#050E1C] text-white overflow-hidden border-b border-sky-500/30">
        {/* Architectural Blueprint Grid + Radial Sky-Blue Water Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.12) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 62% 45%, rgba(2, 132, 199, 0.42), transparent 52%), radial-gradient(circle at 12% 25%, rgba(56, 189, 248, 0.18), transparent 40%)',
          }}
        />

        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-8 pt-8 pb-7 lg:py-11">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
            {/* LEFT 5 COLUMNS: Signature Typography ("MORE THAN / PIPING / A BETTER FLOW") + Live Pressure Gauge Bar */}
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/15 border border-sky-400/35 text-sky-300 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>PAPIES® ENGINEERED PIPING · WEF {COMPANY_INFO.priceListDate}</span>
              </div>

              <div className="space-y-0">
                <div className="font-display font-black italic uppercase text-4xl sm:text-6xl leading-[0.88] tracking-wide text-white">
                  MORE THAN
                </div>
                <div className="font-brush text-5xl sm:text-7xl text-[#38BDF8] leading-[0.94] -rotate-2 py-1 drop-shadow-[0_6px_28px_rgba(2,132,199,0.65)]">
                  PIPING
                </div>
                <div className="font-display font-black italic uppercase text-3xl sm:text-5xl leading-[0.92] tracking-wide text-white lg:pl-8">
                  A BETTER FLOW
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Authorized wholesale supply for genuine <strong className="text-white">Astral Aquasafe ISI PVC</strong>,{' '}
                <strong className="text-sky-300">CPVC SDR 11</strong>,{' '}
                <strong className="text-white">SWR Selfit</strong> &amp;{' '}
                <strong className="text-sky-300">Cleo 4D Tanks</strong> —{' '}
                <span className="text-sky-200 font-medium">{COMPANY_INFO.taglineTamil}</span>.
              </p>

              {/* Unique Pressure Class Telemetry Strip */}
              <div className="bg-[#09192F]/90 border border-sky-400/25 rounded-lg p-2.5 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-sky-300 mb-1.5">
                  <span className="inline-flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-sky-400" />
                    CERTIFIED PRESSURE MATRIX
                  </span>
                  <span className="text-emerald-400 font-bold">238 SIZES READY</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 text-center">
                  {[
                    { label: '4 KG', sub: 'Agri/Line', cat: 'Aquasafe PVC Pipes' as ProductCategory },
                    { label: '6 KG', sub: 'Supply', cat: 'Aquasafe PVC Pipes' as ProductCategory },
                    { label: '10 KG', sub: 'Mainline', cat: 'Aquasafe PVC Pipes' as ProductCategory },
                    { label: '15 KG', sub: 'High-Head', cat: 'Aquasafe PVC Pipes' as ProductCategory },
                    { label: 'SDR 11', sub: '93°C CPVC', cat: 'CPVC Pipes & Fittings' as ProductCategory },
                  ].map((spec) => (
                    <button
                      key={spec.label}
                      type="button"
                      onClick={() => onNavigate('collection', spec.cat, spec.label)}
                      className="bg-white/5 hover:bg-[#0284C7] border border-sky-400/20 hover:border-sky-300 rounded px-1.5 py-1 transition-all cursor-pointer group"
                    >
                      <span className="block font-display font-extrabold text-xs text-white leading-none">
                        {spec.label}
                      </span>
                      <span className="block text-[9px] text-slate-400 group-hover:text-sky-100 mt-0.5">
                        {spec.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hero CTA Buttons */}
              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('collection', 'All')}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#0284C7] hover:bg-sky-500 text-white font-display font-extrabold text-sm uppercase tracking-wider rounded-md shadow-[0_10px_25px_rgba(2,132,199,0.45)] transition-all cursor-pointer"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('brochure')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-sky-400/40 font-display font-bold text-sm uppercase tracking-wider rounded-md transition-all cursor-pointer"
                >
                  <span>EXPLORE COLLECTION</span>
                </button>
              </div>

              {/* Bottom 3 Hero Icon Pillars */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-7 text-xs text-slate-200">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>ISI Certified</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-sky-400" />
                  <span>Leak-Free Flow</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-sky-400" />
                  <span>Built Stronger</span>
                </span>
              </div>
            </div>

            {/* CENTER 5 COLUMNS: Unique 8K Architectural Piping Stage + Interactive Live System Switcher */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-[#0C213B] to-[#071527] p-3 sm:p-4 border border-sky-400/40 shadow-[0_24px_60px_rgba(2,132,199,0.35)]">
                {/* Top 8K Architectural Hero Scene Banner */}
                <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden border border-sky-300/30">
                  <img
                    src={resolveAssetPath('/assets/generated/hero_pipes_engineering.jpg')}
                    alt="Papies Company Engineered Astral Piping Showcase"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050E1C] via-[#050E1C]/25 to-transparent" />

                  {/* Top-Left Live Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#050E1C]/85 backdrop-blur-md border border-sky-400/40 px-2.5 py-1 rounded-md">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                      ASTRAL PIPES MASTER SYSTEM
                    </span>
                  </div>

                  {/* Top-Right WhatsApp Desk Pill */}
                  <div className="absolute top-3 right-3 bg-[#0284C7] text-white px-2.5 py-1 rounded-md font-mono text-[10px] font-bold">
                    {COMPANY_INFO.whatsappNumbers[0]}
                  </div>

                  {/* Bottom Overlay Caption inside 8K Stage */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 block">
                        ACTIVE SPOTLIGHT · {currentHero.pressureTag}
                      </span>
                      <h3 className="font-display font-extrabold text-lg sm:text-xl uppercase tracking-wide text-white leading-tight">
                        {currentHero.product.name}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-white text-[#0B1524] font-mono font-extrabold text-xs shrink-0 shadow">
                      {currentHero.highlightMetric}
                    </span>
                  </div>
                </div>

                {/* Interactive Spotlight Card + 4 Division Selector Tabs */}
                <div className="mt-3 grid grid-cols-12 gap-3 items-stretch">
                  {/* Left 5 Cols: 8K Studio Cutout of Selected System */}
                  <div
                    onClick={() => onSelectProduct(currentHero.product)}
                    className="col-span-5 bg-white rounded-xl p-2.5 flex flex-col justify-between cursor-pointer border-2 border-sky-400 hover:scale-[1.02] transition-transform shadow-md"
                  >
                    <div className="h-28 sm:h-32 flex items-center justify-center">
                      <CroppedAssetImage
                        crop={currentHero.product.imageCrop}
                        alt={currentHero.product.name}
                        className="w-full h-full"
                        eager
                      />
                    </div>
                    <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="block text-[9px] font-mono uppercase text-slate-400">
                          {currentHero.metricSub}
                        </span>
                        <span className="font-mono font-extrabold text-xs text-[#0B1524]">
                          {currentHero.highlightMetric}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickAdd(currentHero.product);
                        }}
                        className="w-7 h-7 rounded-md bg-[#0B1524] hover:bg-[#0284C7] text-white flex items-center justify-center transition-colors cursor-pointer"
                        title="Quick Add Default Size"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right 7 Cols: 4 Interactive Division Switcher Buttons */}
                  <div className="col-span-7 flex flex-col justify-between gap-1.5">
                    {heroShowcases.map((item, idx) => {
                      const isActive = idx === activeHeroSlide;
                      return (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => setActiveHeroSlide(idx)}
                          className={`w-full text-left px-3 py-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isActive
                              ? 'bg-[#0284C7] border-sky-300 text-white shadow-sm'
                              : 'bg-[#09182C]/90 hover:bg-[#0E2440] border-sky-500/20 text-slate-200'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`font-mono text-[10px] font-bold ${
                                  isActive ? 'text-sky-100' : 'text-sky-400'
                                }`}
                              >
                                {item.code}
                              </span>
                              <span className="font-display font-bold text-xs sm:text-sm uppercase tracking-wide truncate">
                                {item.shortLabel}
                              </span>
                            </div>
                            <p
                              className={`text-[10px] truncate ${
                                isActive ? 'text-sky-100' : 'text-slate-400'
                              }`}
                            >
                              {item.tempOrSpec}
                            </p>
                          </div>
                          <span
                            className={`font-mono text-[11px] font-extrabold shrink-0 ${
                              isActive ? 'text-white' : 'text-sky-300'
                            }`}
                          >
                            {item.highlightMetric}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* FAR-RIGHT 2 COLUMNS: Signature Angled Brush Slogan ("PURE WATER GREAT PIPES") */}
            <div className="hidden lg:flex lg:col-span-2 flex-col items-end justify-between h-full py-4 select-none">
              <div className="bg-white/5 border border-sky-400/25 rounded-lg px-3 py-2 text-right">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-sky-300">
                  BROCHURE EDITION
                </span>
                <span className="font-mono font-extrabold text-sm text-white">02.10.2025</span>
              </div>

              <div className="-rotate-6 text-right font-brush text-2xl xl:text-3xl leading-[1.05] text-white tracking-wider my-6">
                <div>PURE</div>
                <div>WATER</div>
                <div className="text-sky-300">GREAT</div>
                <div>PIPES</div>
                <svg viewBox="0 0 140 18" className="w-32 h-4 mt-1 ml-auto" fill="none">
                  <path
                    d="M4 12C42 4 95 3 136 8"
                    stroke="#0284C7"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 15C55 10 98 9 130 13"
                    stroke="#38BDF8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <button
                type="button"
                onClick={() => onSelectProduct(currentHero.product)}
                className="text-right group cursor-pointer"
              >
                <span className="block text-[10px] font-mono uppercase tracking-wider text-sky-400 group-hover:text-sky-300">
                  VIEW RATE TABLE →
                </span>
                <span className="text-[11px] font-semibold text-slate-300">
                  {currentHero.product.brochurePage}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. 10-ITEM CIRCULAR CATEGORY MEDALLION ROW (Now with 8K Studio Assets + Spec Badges)
      ===================================================================== */}
      <section className="bg-white border-b border-slate-200/80 py-6 shadow-2xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-4">
            {circularCategories.map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() =>
                  cat.isDeals
                    ? onNavigate('brochure')
                    : onNavigate('collection', cat.category, cat.search || '')
                }
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                <div
                  className={`relative w-15 h-15 sm:w-17 sm:h-17 rounded-full flex items-center justify-center p-2 transition-all duration-200 group-hover:scale-105 ${
                    cat.isDeals
                      ? 'bg-sky-50 border-2 border-[#0284C7] text-[#0284C7] shadow-xs'
                      : 'bg-white border-2 border-slate-200 group-hover:border-[#0284C7] shadow-2xs group-hover:shadow-md'
                  }`}
                >
                  {cat.isDeals ? (
                    <div className="w-9 h-9 rounded-full border-2 border-[#0B1524] flex items-center justify-center text-[#0B1524]">
                      <Percent className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  ) : (
                    cat.crop && (
                      <CroppedAssetImage
                        crop={cat.crop}
                        alt={cat.label}
                        className="w-full h-full rounded-full"
                      />
                    )
                  )}
                </div>
                <span
                  className={`mt-2 text-[11px] sm:text-xs font-bold leading-tight ${
                    cat.isDeals
                      ? 'text-[#0284C7]'
                      : 'text-slate-800 group-hover:text-[#0284C7]'
                  }`}
                >
                  {cat.label}
                </span>
                <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                  {cat.specSub}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SECTION 1: FEATURED PRODUCTS (With Interactive Division Filter Pills)
      ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-2xl sm:text-[28px] uppercase tracking-wide text-slate-900 leading-none">
                FEATURED PRODUCTS
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-sky-100 text-[#0284C7] rounded">
                8K STUDIO CATALOG
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Top picks from the {COMPANY_INFO.priceListDate} Astral Pipes Price List to power your
              pipeline.
            </p>
          </div>

          {/* Unique Interactive Quick-Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Top Picks' },
              { id: 'pvc', label: 'ISI PVC (4–15 KG)' },
              { id: 'cpvc', label: 'CPVC Hot/Cold' },
              { id: 'swr', label: 'SWR Drainage' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFeaturedTab(tab.id as 'all' | 'pvc' | 'cpvc' | 'swr')}
                className={`px-3 py-1.5 rounded-md font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  featuredTab === tab.id
                    ? 'bg-[#0B1524] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-400 hover:text-[#0284C7]'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => onNavigate('collection', 'All')}
              className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#0284C7] cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredRow.map(({ product, badge, reviews }) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
              variant="featured"
              badgeOverride={badge}
              reviewCount={reviews}
            />
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. SECTION 2: 2-COLUMN SPLIT PROMO BANNERS (With 8K Studio Visuals & Spec Pills)
      ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Banner: Sky Blue Gradient Wholesale Banner */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border border-sky-300/30">
            <div className="space-y-2.5 z-10 max-w-xs">
              <div className="inline-flex items-center gap-1.5 font-display font-black italic uppercase text-xl sm:text-2xl tracking-wide text-white">
                <Zap className="w-5 h-5 fill-amber-300 text-amber-300" />
                <span>WHOLESALE RATES</span>
              </div>

              <div>
                <p className="font-display font-bold uppercase text-sm tracking-wider text-sky-100">
                  OFFICIAL BROCHURE · SN 2 / SN 4 / SN 8
                </p>
                <p className="font-display font-black uppercase text-4xl sm:text-5xl leading-none tracking-tight text-white">
                  238 SIZES
                </p>
                <p className="text-xs text-sky-100 mt-1">
                  Direct Factory Price List for Underground Foamcore &amp; ISI Pressure Pipes.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('collection', 'Aquasafe PVC Pipes')}
                  className="px-4 py-2.5 bg-[#0B1524] hover:bg-slate-900 text-white font-display font-bold text-xs uppercase tracking-wider rounded-md cursor-pointer transition-colors"
                >
                  SHOP THE RATES
                </button>

                {/* Digital Date Box */}
                <div className="bg-white/95 text-[#0B1524] px-3 py-1.5 rounded-md text-center shadow-xs">
                  <span className="block text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                    WEF Date
                  </span>
                  <span className="font-mono font-extrabold text-sm sm:text-base tracking-wider">
                    02 : 10 : 25
                  </span>
                </div>
              </div>
            </div>

            {/* Right 8K Studio Cutout */}
            <div
              onClick={() => onSelectProduct(findById('astral-foamcore-underground'))}
              className="w-40 h-40 sm:w-44 sm:h-44 bg-white rounded-xl p-2.5 shrink-0 flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform border-2 border-white"
            >
              <CroppedAssetImage
                crop={findById('astral-foamcore-underground').imageCrop}
                alt="Astral Foamcore Underground PVC Pipe"
                className="w-full h-32"
              />
              <span className="text-[10px] font-mono font-extrabold text-[#0B1524] mt-1">
                FOAMCORE SN 8 · 6M
              </span>
            </div>
          </div>

          {/* Right Banner: Dark Industrial NEW ARRIVALS + Angled Brush Text */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#091322] via-[#10223A] to-[#163050] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-sky-500/25">
            <div className="space-y-2.5 z-10 max-w-[230px]">
              <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>HOT &amp; COLD 93°C RATED</span>
              </div>
              <h3 className="font-display font-extrabold uppercase text-3xl sm:text-4xl leading-none tracking-wide text-white">
                NEW ARRIVALS
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fresh Astral CPVC Pro SDR 11 &amp; Brass Transition stock for a stronger pipeline tomorrow.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('collection', 'CPVC Pipes & Fittings')}
                  className="px-5 py-2.5 bg-white hover:bg-sky-400 text-[#0B1524] font-display font-extrabold text-xs uppercase tracking-wider rounded-md cursor-pointer transition-colors"
                >
                  SHOP NEW
                </button>
              </div>
            </div>

            {/* Center 8K Studio Cutout */}
            <div
              onClick={() => onSelectProduct(findById('cpvc-pipe-sdr11-3m-5m'))}
              className="w-36 h-36 sm:w-40 sm:h-40 bg-white rounded-xl p-2.5 shrink-0 flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform border-2 border-sky-400"
            >
              <CroppedAssetImage
                crop={findById('cpvc-pipe-sdr11-3m-5m').imageCrop}
                alt="Astral CPVC Pipe SDR 11"
                className="w-full h-28"
              />
              <span className="text-[10px] font-mono font-extrabold text-[#0B1524] mt-1">
                CPVC SDR 11 · Rs. 312
              </span>
            </div>

            {/* Far Right Angled Brush Slogan */}
            <div className="hidden sm:flex flex-col items-end justify-center select-none -rotate-6 font-brush text-lg leading-tight text-sky-300/90 text-right">
              <span>FLOW</span>
              <span>HIGHER</span>
              <span className="text-white">GO</span>
              <span>FURTHER</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. SECTION 3: BEST SELLERS (5-Column Product Grid)
      ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-[28px] uppercase tracking-wide text-slate-900 leading-none">
              BEST SELLERS
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Loved by civil engineers. Trusted by thousands of contractors.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('collection', 'All')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#0284C7] cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {bestSellersRow.map(({ product, reviews }) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
              variant="bestseller"
              reviewCount={reviews}
            />
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. SECTION 4: JUST FOR YOU (5-Column Centered Minimal Grid)
      ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-[28px] uppercase tracking-wide text-slate-900 leading-none">
              JUST FOR YOU
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Because your plumbing &amp; drainage specifications matter.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('collection', 'All')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#0284C7] cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {justForYouRow.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
              variant="minimal"
            />
          ))}
        </div>
      </section>

      {/* =====================================================================
          7. SECTION 5: PIPING INSPIRATION (4 Dark Technical Spec Cards)
      ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-[28px] uppercase tracking-wide text-slate-900 leading-none">
              PIPING INSPIRATION
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Specs. Pressure Classes. Installation. A stronger pipeline starts here.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('brochure')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#0284C7] cursor-pointer"
          >
            <span>Explore More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {inspirationCards.map((card) => (
            <div
              key={card.titleLine2}
              onClick={() => onSelectProduct(card.product)}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#091426] via-[#0E223D] to-[#133155] text-white p-5 flex items-center justify-between gap-3 cursor-pointer border border-sky-900/40 hover:border-sky-400 transition-all shadow-xs"
            >
              <div className="space-y-1.5 z-10">
                <span className="inline-block px-2 py-0.5 rounded bg-sky-500/20 border border-sky-400/30 font-mono text-[9px] font-bold text-sky-300 uppercase tracking-wider">
                  {card.specCode}
                </span>
                <div className="font-display font-extrabold uppercase text-xl sm:text-2xl leading-[0.95] tracking-wide text-white">
                  <div>{card.titleLine1}</div>
                  <div className="text-sky-400">{card.titleLine2}</div>
                </div>
                <p className="text-[11px] text-slate-300">{card.subtitle}</p>
                <span className="inline-flex items-center gap-1 pt-1 text-[11px] font-semibold text-white group-hover:text-sky-300">
                  Inspect Spec <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div className="w-24 h-24 bg-white rounded-lg p-1.5 shrink-0 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-sky-200">
                <CroppedAssetImage
                  crop={card.product.imageCrop}
                  alt={card.product.name}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          8. SECTION 6: WHAT OUR CUSTOMERS SAY (3 Verified Buyer Cards)
      ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-[28px] uppercase tracking-wide text-slate-900 leading-none">
              WHAT OUR CUSTOMERS SAY
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Real engineers. Real pipelines.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#0284C7] cursor-pointer"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {customerReviews.map((rev) => (
            <div
              key={rev.name}
              className="bg-white rounded-xl border border-slate-200/85 p-5 flex items-start gap-4 shadow-2xs hover:border-sky-300 transition-colors"
            >
              {/* Circular Avatar */}
              <div
                className={`w-12 h-12 rounded-full ${rev.accentBg} text-white font-display font-extrabold text-lg flex items-center justify-center shrink-0 shadow-xs`}
              >
                {rev.initials}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{rev.role}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.quote}</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-sans font-bold text-xs text-slate-900">{rev.name}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                    Verified Buyer
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          9. SECTION 7: PAPIES PRO DARK LOYALTY BANNER
      ===================================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8">
        <div className="bg-[#0B1524] text-white rounded-xl px-6 py-4 sm:py-5 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-sm border border-sky-500/20">
          {/* Left: Gold Crown + PAPIES PRO */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <Crown className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-wider text-white leading-none">
                PAPIES PRO
              </h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                More Wholesale Rewards. A Stronger Pipeline.
              </p>
            </div>
          </div>

          {/* Center: 4 Perks with Gold Icons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 text-xs text-slate-200">
            <span className="inline-flex items-center gap-1.5">
              <BadgePercent className="w-4 h-4 text-amber-400" />
              <span>Wholesale Discounts</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Priority Site Dispatch</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>ISI Test Certificates</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Contractor BOQ Desk</span>
            </span>
          </div>

          {/* Right: JOIN NOW Button */}
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-6 py-2.5 bg-[#0284C7] hover:bg-sky-500 text-white font-display font-extrabold text-sm uppercase tracking-wider rounded-md shrink-0 transition-colors cursor-pointer"
          >
            JOIN NOW
          </button>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Package,
  RotateCcw,
  Flame,
  HelpCircle,
  Globe,
  Truck,
  Menu,
  X,
} from 'lucide-react';
import { COMPANY_INFO, type ProductCategory } from '../data/catalog';

export type ActivePage =
  | 'home'
  | 'collection'
  | 'product-details'
  | 'brochure'
  | 'about'
  | 'contact';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (
    page: ActivePage,
    categoryFilter?: ProductCategory | 'All',
    search?: string
  ) => void;
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
}

/**
 * PAPIES® Athletic/Industrial Emblem & Condensed Italic Wordmark
 * Modeled directly on the FITNEX® — STRONGER EVERYDAY logo in image_6cd80b66.png,
 * adapted to Papies Company's Sky Blue, Deep Navy & White palette.
 */
export const PapiesFitnexStyleLogo: React.FC<{
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}> = ({ variant = 'dark', size = 'md' }) => {
  const mainTitleColor = variant === 'light' ? 'text-sky-400' : 'text-[#0284C7]';
  const peakColor = variant === 'light' ? '#FFFFFF' : '#0B1524';
  const accentColor = variant === 'light' ? '#38BDF8' : '#0284C7';
  const subTextColor = variant === 'light' ? 'text-slate-300' : 'text-slate-600';

  const iconDims =
    size === 'lg'
      ? 'w-14 h-10'
      : size === 'sm'
        ? 'w-9 h-6'
        : 'w-11 h-8 sm:w-12 sm:h-8';

  const titleSize =
    size === 'lg'
      ? 'text-4xl sm:text-5xl'
      : size === 'sm'
        ? 'text-2xl'
        : 'text-2xl sm:text-[32px]';

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      {/* Twin-Peak / Pipeline Chevron Emblem matching FITNEX left mark */}
      <svg viewBox="0 0 68 42" className={`${iconDims} shrink-0`} fill="none">
        {/* Left Dark Navy Peak */}
        <path
          d="M2 38L20 8L30 24L23 30L20 24L11 38H2Z"
          fill={peakColor}
        />
        {/* Center-Right Sky Blue Peak with Dynamic Pipe Slash */}
        <path
          d="M22 38L39 6L62 38H51L39 20L28 38H22Z"
          fill={accentColor}
        />
        {/* Dynamic Cross-Cut Flow Swoosh */}
        <path
          d="M14 29L46 14L66 22L44 21L14 29Z"
          fill={accentColor}
        />
      </svg>

      <div className="flex flex-col leading-none">
        <div className="flex items-start">
          <span
            className={`font-display font-black italic uppercase tracking-wider leading-[0.88] ${mainTitleColor} ${titleSize}`}
          >
            PAPIES
          </span>
          <span className={`font-sans font-bold text-[10px] ml-0.5 ${mainTitleColor}`}>
            ®
          </span>
        </div>
        <span
          className={`font-sans font-bold uppercase tracking-[0.22em] text-[7.5px] sm:text-[8.5px] mt-0.5 ${subTextColor}`}
        >
          ENGINEERED FLOW EVERYDAY
        </span>
      </div>
    </div>
  );
};

// Keep alias for any existing imports
export const PapiesGeometricLogo = PapiesFitnexStyleLogo;

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  wishlistCount = 2,
  onOpenCart,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('collection', 'All', searchInput);
  };

  const subNavLinks: {
    label: string;
    page: ActivePage;
    category?: ProductCategory | 'All';
    search?: string;
    isHighlight?: boolean;
  }[] = [
    { label: 'Shop All', page: 'collection', category: 'All', search: '' },
    { label: 'Aquasafe PVC', page: 'collection', category: 'Aquasafe PVC Pipes', search: '' },
    { label: 'Foamcore SN', page: 'collection', category: 'Aquasafe PVC Pipes', search: 'Foam Core' },
    { label: 'SWR Selfit', page: 'collection', category: 'SWR Pipes & Fittings', search: 'Selfit' },
    { label: 'SWR Fittings', page: 'collection', category: 'SWR Pipes & Fittings', search: '' },
    { label: 'CPVC Pipes', page: 'collection', category: 'CPVC Pipes & Fittings', search: 'SDR' },
    { label: 'CPVC Valves', page: 'collection', category: 'CPVC Pipes & Fittings', search: 'Valve' },
    { label: 'Pipe Fix Solvents', page: 'collection', category: 'Solvents & Primers', search: '' },
    { label: 'Traps & Gullies', page: 'collection', category: 'Traps, Gullies & Valves', search: '' },
    { label: 'Brochure PDF', page: 'brochure' },
    { label: 'About Us', page: 'about' },
    { label: '02.10.25 Rates', page: 'collection', category: 'All', search: '', isHighlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. Top Dark Utility Strip (matching FITNEX top bar in image_6cd80b66.png) */}
      <div className="bg-[#0B1524] text-slate-200 text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left 3 Utility Highlights */}
          <div className="flex items-center divide-x divide-slate-700">
            <span className="inline-flex items-center gap-1.5 pr-3">
              <Package className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Priority Dispatch on Bulk Orders</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3">
              <RotateCcw className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>100% Genuine ISI &amp; SDR Stock</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 pl-3 text-sky-300 font-medium">
              <Flame className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>{COMPANY_INFO.taglineTamil}</span>
            </span>
          </div>

          {/* Right 3 Utility Actions */}
          <div className="flex items-center divide-x divide-slate-700 text-[11px]">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 pr-3 hover:text-sky-300 transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-sky-400" />
              <span>Order Desk: {COMPANY_INFO.whatsappNumbers[0]}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 hover:text-sky-300 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>Ph: {COMPANY_INFO.landline}</span>
            </button>
            <span className="inline-flex items-center gap-1.5 pl-3 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>India (INR ₹)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main White Brand + Pill Search + Account/Wishlist/Cart Bar */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
          {/* Left: PAPIES Logo */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-left focus:outline-none shrink-0 cursor-pointer"
          >
            <PapiesFitnexStyleLogo variant="dark" size="md" />
          </button>

          {/* Center: Wide Pill Search Input with Dark Right Button */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-xl relative"
            role="search"
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for Astral PVC pipes, SWR fittings, CPVC valves, solvents..."
              className="w-full h-10 pl-4 pr-12 rounded-md bg-slate-100/90 border border-slate-300/80 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 transition-colors"
            />
            <button
              type="submit"
              aria-label="Search Catalog"
              className="absolute right-0 top-0 bottom-0 w-11 bg-[#0B1524] hover:bg-sky-600 text-white rounded-r-md flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Right: Account / Wishlist / Cart Icons */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hidden sm:inline-flex items-center gap-2 text-slate-700 hover:text-sky-600 transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
              <span className="text-xs font-medium">Account</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('collection', 'All')}
              className="hidden sm:inline-flex items-center gap-2 text-slate-700 hover:text-sky-600 transition-colors cursor-pointer relative"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              <span className="text-xs font-medium">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="px-1.5 py-0.2 bg-sky-100 text-sky-700 font-mono text-[10px] font-bold rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              data-testid="navbar-cart-button"
              className="inline-flex items-center gap-2 text-slate-800 hover:text-sky-600 transition-colors cursor-pointer relative"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
                <span
                  data-testid="navbar-cart-count"
                  className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 bg-[#0284C7] text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center shadow-2xs"
                >
                  {cartCount}
                </span>
              </div>
              <span className="text-xs font-semibold ml-1">Cart</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-1.5 text-slate-700 hover:text-sky-600 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Secondary Horizontal Category Sub-Bar (matching FITNEX sub-nav) */}
      <nav
        aria-label="Main Navigation"
        className="hidden md:block bg-white border-b border-slate-200/90"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 h-10 flex items-center justify-between gap-2 overflow-x-auto">
          {subNavLinks.map((item) => {
            const isCurrent =
              (item.page === 'brochure' && activePage === 'brochure') ||
              (item.page === 'about' && activePage === 'about') ||
              (item.label === 'Shop All' && activePage === 'collection');
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.page, item.category, item.search)}
                className={`text-xs whitespace-nowrap py-1 px-2 transition-colors cursor-pointer ${
                  item.isHighlight
                    ? 'font-bold text-[#0284C7] hover:text-sky-700'
                    : isCurrent
                      ? 'font-bold text-[#0284C7] border-b-2 border-[#0284C7]'
                      : 'font-medium text-slate-700 hover:text-[#0284C7]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Search & Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search pipes, fittings, sizes..."
              className="w-full h-9 px-3 bg-slate-100 border border-slate-300 text-xs rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="h-9 px-3 bg-[#0B1524] text-white rounded-r-md flex items-center justify-center"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
          <div className="grid grid-cols-2 gap-1.5">
            {subNavLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  onNavigate(item.page, item.category, item.search);
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

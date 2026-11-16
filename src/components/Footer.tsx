import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Award,
  Phone,
  MessageSquare,
  FileText,
  Globe,
} from 'lucide-react';
import { COMPANY_INFO, type ProductCategory } from '../data/catalog';
import { PapiesFitnexStyleLogo, type ActivePage } from './Navbar';

interface FooterProps {
  onNavigate: (page: ActivePage, categoryFilter?: ProductCategory | 'All', search?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [subscriberInput, setSubscriberInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberInput.trim()) return;
    setSubscribed(true);
    setSubscriberInput('');
  };

  return (
    <footer className="bg-white text-slate-800 border-t border-slate-200">
      {/* =====================================================================
          1. "STAY IN THE LOOP" NEWSLETTER + 4 TRUST BADGES STRIP
             (Exact match to the pre-footer bar in image_6cd80b66.png)
      ===================================================================== */}
      <div className="border-b border-slate-200 py-5 px-4 sm:px-8 bg-white">
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: STAY IN THE LOOP */}
          <div className="text-center lg:text-left shrink-0">
            <h3 className="font-display font-extrabold text-xl uppercase tracking-wide text-slate-900 leading-none">
              STAY IN THE LOOP
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Get {COMPANY_INFO.priceListDate} price list updates, stock alerts &amp; new arrivals.
            </p>
          </div>

          {/* Center: Input + Solid Sky Blue Subscribe Button */}
          <div className="w-full max-w-md">
            <form onSubmit={handleSubscribe} className="flex items-center">
              <input
                type="text"
                value={subscriberInput}
                onChange={(e) => setSubscriberInput(e.target.value)}
                placeholder="Enter your email or WhatsApp number"
                className="w-full h-10 px-3.5 rounded-l-md border border-slate-300 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="h-10 px-5 bg-[#0284C7] hover:bg-sky-600 text-white font-sans font-bold text-xs rounded-r-md shrink-0 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#0284C7] font-medium mt-1">
                Subscribed to Papies Company price list alerts!
              </p>
            )}
          </div>

          {/* Right: 4 Trust Badges with Icons (matching Fast & Reliable Delivery | Secure Payments | 30-Day Returns | 100% Authentic) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] text-slate-700 shrink-0">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-slate-800 shrink-0 stroke-[1.7]" />
              <div className="leading-tight">
                <p className="font-semibold">Fast &amp; Reliable</p>
                <p className="text-slate-500">Site Delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-800 shrink-0 stroke-[1.7]" />
              <div className="leading-tight">
                <p className="font-semibold">Official Rates</p>
                <p className="text-slate-500">WEF {COMPANY_INFO.priceListDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-slate-800 shrink-0 stroke-[1.7]" />
              <div className="leading-tight">
                <p className="font-semibold">Instant BOQ</p>
                <p className="text-slate-500">238 Sizes Ready</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-slate-800 shrink-0 stroke-[1.7]" />
              <div className="leading-tight">
                <p className="font-semibold">100% Authentic</p>
                <p className="text-slate-500">Astral Pipes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. MAIN 5-COLUMN FOOTER (Matching FITNEX Footer Layout)
      ===================================================================== */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Col 1 (3 cols): PAPIES® Logo */}
          <div className="lg:col-span-3 space-y-3">
            <PapiesFitnexStyleLogo variant="dark" size="md" />
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              {COMPANY_INFO.taglineTamil} · Authorized Astral Pipes, SWR Fittings, CPVC Systems &amp;
              Sanitaryware Distributor.
            </p>
          </div>

          {/* Col 2 (2 cols): Shop */}
          <div className="lg:col-span-2">
            <h4 className="font-sans font-bold text-xs text-slate-900 mb-3">Shop</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collection', 'All')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  All Products (21 Series)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collection', 'Aquasafe PVC Pipes')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  Aquasafe ISI PVC Pipes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collection', 'SWR Pipes & Fittings')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  Best Sellers (SWR)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('collection', 'CPVC Pipes & Fittings')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  CPVC SDR 11 &amp; 13.5
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 (2 cols): Support */}
          <div className="lg:col-span-2">
            <h4 className="font-sans font-bold text-xs text-slate-900 mb-3">Support</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  Order Desk: {COMPANY_INFO.whatsappNumbers[0]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  WhatsApp: {COMPANY_INFO.whatsappNumbers[1]}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brochure')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  Size &amp; Pressure Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  Ph: {COMPANY_INFO.landline}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 (2 cols): About */}
          <div className="lg:col-span-2">
            <h4 className="font-sans font-bold text-xs text-slate-900 mb-3">About</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  Papies Pro Club
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brochure')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  Official PDF Brochure
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#0284C7] cursor-pointer"
                >
                  Wholesale Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5 (3 cols): Follow Us & Hashtag */}
          <div className="lg:col-span-3 flex flex-col lg:items-end justify-between space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-sans font-bold text-xs text-slate-900">Connect</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  aria-label="Phone Order Desk"
                  className="w-7 h-7 rounded-md bg-[#0B1524] hover:bg-[#0284C7] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  aria-label="WhatsApp Order Desk"
                  className="w-7 h-7 rounded-md bg-[#0B1524] hover:bg-[#0284C7] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('brochure')}
                  aria-label="Brochure PDF"
                  className="w-7 h-7 rounded-md bg-[#0B1524] hover:bg-[#0284C7] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('collection', 'All')}
                  aria-label="Catalog"
                  className="w-7 h-7 rounded-md bg-[#0B1524] hover:bg-[#0284C7] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="font-sans font-bold text-sm text-slate-900">
              #EngineeredFlowEveryday
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. BOTTOM DARK COPYRIGHT BAR (Matching bottom strip of image_6cd80b66.png)
      ===================================================================== */}
      <div className="bg-[#0B1524] text-slate-300 text-[11px] py-3 px-4 sm:px-8">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} {COMPANY_INFO.name} ({COMPANY_INFO.partnerBrand}). All
            rights reserved.
          </span>
          <span className="text-sky-300 font-medium">
            Stronger Pipelines. A Better Flow World.
          </span>
        </div>
      </div>
    </footer>
  );
};

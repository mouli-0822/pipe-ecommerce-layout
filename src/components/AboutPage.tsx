import React from 'react';
import { ShieldCheck, FileCheck2, Phone, Award, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, BROCHURE_PAGES, type ProductCategory } from '../data/catalog';
import { PapiesGeometricLogo, type ActivePage } from './Navbar';

interface AboutPageProps {
  onNavigate: (page: ActivePage, categoryFilter?: ProductCategory | 'All') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white text-[#081C34] pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-[#061527] via-[#081C34] to-[#0C2C4E] text-white py-16 border-b border-sky-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PapiesGeometricLogo variant="light" size="sm" />
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-4 max-w-3xl leading-tight">
            {COMPANY_INFO.name} — Engineered Water Flow &amp; Piping Distribution
          </h1>
          <p className="text-sky-300 text-base sm:text-lg font-semibold mt-3">
            {COMPANY_INFO.taglineTamil}
          </p>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Authorized distributor and wholesale supply desk for Astral Aquasafe ISI PVC Pipes,
            Foam Core Underground Drainage, SWR Selfit Systems, CPVC SDR 11 &amp; 13.5 Plumbing,
            Pipe Fix Solvents, and Cleo 4D Water Storage Tanks.
          </p>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-sky-600">
              OFFICIAL BROCHURE IDENTITY · WEF {COMPANY_INFO.priceListDate}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#081C34]">
              Complete Digital Edition of Our Printed Astral Pipes Price List
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {COMPANY_INFO.name} serves civil engineers, plumbing contractors, agricultural
              developers, and hardware dealers with transparent, factory-aligned price schedules.
              Our catalog covers every single diameter, pressure rating, and standard package
              quantity printed in our {COMPANY_INFO.priceListDate} brochure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-sky-50/50 border border-sky-100">
                <ShieldCheck className="w-6 h-6 text-sky-600 mb-2" />
                <h3 className="font-display font-bold text-sm text-[#081C34]">
                  Page 03: Aquasafe ISI PVC &amp; Solvents
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  20 mm to 400 mm uPVC pressure pipes in 4 KG, 6 KG, 10 KG &amp; 15 KG classes, Foam
                  Core SN 2/4/8, SWR Selfit Type A/B, and Pipe Fix 101/307/206/717 solvents.
                </p>
              </div>

              <div className="p-5 bg-sky-50/50 border border-sky-100">
                <FileCheck2 className="w-6 h-6 text-sky-600 mb-2" />
                <h3 className="font-display font-bold text-sm text-[#081C34]">
                  Page 04: Astral SWR Fittings &amp; Traps
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Door Tees, Door Elbows, Shoe 45°, Vent Cowls, Single/Double Ys, Pan Connectors,
                  P/S/Q Traps, Gully Traps, and Back Flow Prevention Valves.
                </p>
              </div>

              <div className="p-5 bg-sky-50/50 border border-sky-100">
                <Award className="w-6 h-6 text-sky-600 mb-2" />
                <h3 className="font-display font-bold text-sm text-[#081C34]">
                  Page 05: CPVC SDR 11 &amp; 13.5 Systems
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Hot &amp; cold water CPVC pipes (3M &amp; 5M), Elbows, Tees, Couplers, Unions,
                  Flanges, Brass MTA/FTA, CPVC Ball Valves, and Concealed Valves.
                </p>
              </div>

              <div className="p-5 bg-sky-50/50 border border-sky-100">
                <Phone className="w-6 h-6 text-sky-600 mb-2" />
                <h3 className="font-display font-bold text-sm text-[#081C34]">
                  Page 01: Sanitaryware, Tanks &amp; Pumps
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Ceramic wash basins, wall-hung closets, rain showers, Astral Cleo 4D 4-layer
                  antibacterial tanks, hydro-pneumatic pumps, and industrial butterfly valves.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('collection', 'All')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#081C34] hover:bg-sky-600 text-white text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Browse All Piping Series</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('brochure')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-100 hover:bg-sky-200 text-[#081C34] text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>View Original Brochure Pages</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Official Brochure Summary Card */}
          <div className="lg:col-span-5 bg-[#081C34] text-white p-6 sm:p-8 border border-sky-900 space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                VERIFIED BROCHURE METADATA
              </span>
              <h3 className="font-display font-bold text-xl text-white mt-1">
                Official Order &amp; Dispatch Details
              </h3>
            </div>

            <dl className="space-y-4 text-xs border-y border-sky-500/20 py-5">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Company Name</dt>
                <dd className="font-semibold text-white text-right">{COMPANY_INFO.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Catalog Brand</dt>
                <dd className="font-semibold text-sky-300 text-right">{COMPANY_INFO.partnerBrand}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Price List Date</dt>
                <dd className="font-mono text-white text-right">{COMPANY_INFO.priceListDate}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">WhatsApp Order Desk 1</dt>
                <dd className="font-mono font-bold text-sky-300 text-right">
                  {COMPANY_INFO.whatsappNumbers[0]}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">WhatsApp Order Desk 2</dt>
                <dd className="font-mono font-bold text-sky-300 text-right">
                  {COMPANY_INFO.whatsappNumbers[1]}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Office Landline</dt>
                <dd className="font-mono text-white text-right">{COMPANY_INFO.landline}</dd>
              </div>
            </dl>

            <div className="grid grid-cols-2 gap-3">
              {BROCHURE_PAGES.map((sheet) => (
                <div key={sheet.pageNumber} className="bg-white/5 p-2.5 border border-sky-400/20">
                  <img
                    src={sheet.src}
                    alt={sheet.title}
                    className="w-full h-28 object-contain bg-white p-1"
                  />
                  <p className="text-[10px] font-mono text-sky-300 mt-1.5">
                    PAGE {sheet.pageNumber}
                  </p>
                  <p className="text-[11px] font-semibold text-white truncate">{sheet.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

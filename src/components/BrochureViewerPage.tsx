import React, { useState } from 'react';
import { ZoomIn, ZoomOut, ArrowRight, FileText } from 'lucide-react';
import {
  BROCHURE_PAGES,
  CATALOG_PRODUCTS,
  COMPANY_INFO,
  type CatalogProduct,
} from '../data/catalog';
import { formatINR, getStartingPrice } from '../utils/catalogLogic';
import { resolveAssetPath } from '../utils/assetPath';

interface BrochureViewerPageProps {
  onSelectProduct: (product: CatalogProduct) => void;
}

export const BrochureViewerPage: React.FC<BrochureViewerPageProps> = ({
  onSelectProduct,
}) => {
  const [activeSheetId, setActiveSheetId] = useState(BROCHURE_PAGES[0].id);
  const [zoom, setZoom] = useState(1);

  const activeSheet =
    BROCHURE_PAGES.find((p) => p.id === activeSheetId) || BROCHURE_PAGES[0];

  const sheetProducts = CATALOG_PRODUCTS.filter((p) => {
    if (activeSheet.id === 'page-01') return p.brochurePage === 'Page 01 — Cover Showcase';
    if (activeSheet.id === 'page-03') return p.brochurePage === 'Page 03 — PVC, SWR & Solvent';
    if (activeSheet.id === 'page-04') return p.brochurePage === 'Page 04 — SWR Fittings';
    return p.brochurePage === 'Page 05 — CPVC Systems';
  });

  return (
    <div className="min-h-screen bg-sky-50/40 pb-20">
      <div className="bg-gradient-to-r from-[#061527] via-[#081C34] to-[#0C2B4E] text-white border-b border-sky-400/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-300 mb-1">
            ORIGINAL BROCHURE SHEETS · PRICE LIST EFFECTIVE {COMPANY_INFO.priceListDate}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Official Astral Pipes Price List Brochure (Pages 01, 03, 04 &amp; 05)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
            Inspect every original sheet from the {COMPANY_INFO.name} Astral Pipes Price List
            brochure, or click any extracted pipe/fitting series on the right to open its
            interactive size &amp; price configurator.
          </p>

          {/* Sheet Selector Tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {BROCHURE_PAGES.map((sheet) => {
              const active = sheet.id === activeSheetId;
              return (
                <button
                  key={sheet.id}
                  type="button"
                  onClick={() => {
                    setActiveSheetId(sheet.id);
                    setZoom(1);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    active
                      ? 'bg-sky-500 text-[#04101F]'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-sky-400/25'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>
                    Page {sheet.pageNumber}: {sheet.title.split('—')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Original High-Resolution Brochure Sheet */}
        <div className="lg:col-span-7 bg-white border border-sky-100 p-6 shadow-xs">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-display text-sm font-bold text-[#081C34]">
                Page {activeSheet.pageNumber} · {activeSheet.title}
              </h2>
              <p className="text-xs text-slate-500">{activeSheet.subtitle}</p>
            </div>

            <div className="inline-flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
                aria-label="Zoom out brochure page"
                className="p-2 bg-sky-50 text-sky-700 hover:bg-sky-100 cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-[#081C34] px-2 tabular-nums">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
                aria-label="Zoom in brochure page"
                className="p-2 bg-sky-50 text-sky-700 hover:bg-sky-100 cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-auto max-h-[760px] bg-slate-50 p-4 flex justify-center border border-slate-100">
            <img
              src={resolveAssetPath(activeSheet.src)}
              alt={activeSheet.title}
              referrerPolicy="no-referrer"
              style={{ width: `${zoom * 100}%`, maxWidth: zoom === 1 ? '540px' : 'none' }}
              className="h-auto object-contain shadow-sm transition-all duration-150"
            />
          </div>
        </div>

        {/* Right 5 Cols: Interactive Products Extracted From This Sheet */}
        <div className="lg:col-span-5 bg-white border border-sky-100 p-6 flex flex-col gap-4">
          <div>
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600">
              DIRECT INTERACTIVE CATALOG LINKS
            </p>
            <h2 className="font-display text-xl font-bold text-[#081C34] mt-0.5">
              Series Extracted from Page {activeSheet.pageNumber} ({sheetProducts.length})
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {sheetProducts.map((prod) => (
              <div
                key={prod.id}
                className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#081C34] truncate">
                    {prod.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {prod.configurableLabel} · Starting at{' '}
                    <span className="font-mono font-bold text-sky-700">
                      {formatINR(getStartingPrice(prod))}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProduct(prod)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 hover:bg-[#081C34] text-sky-700 hover:text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Select Sizes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

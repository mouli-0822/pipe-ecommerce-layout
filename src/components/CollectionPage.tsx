import React, { useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw, FileText } from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  COMPANY_INFO,
  type CatalogProduct,
  type ProductCategory,
} from '../data/catalog';
import { filterAndSortProducts, type FilterCriteria } from '../utils/catalogLogic';
import { ProductCard } from './ProductCard';

interface CollectionPageProps {
  selectedCategory: ProductCategory | 'All';
  searchQuery: string;
  wishlist: string[];
  onCategoryChange: (cat: ProductCategory | 'All') => void;
  onSearchChange: (q: string) => void;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: CatalogProduct) => void;
  onQuickAdd: (product: CatalogProduct) => void;
  onOpenBrochure?: () => void;
}

const CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Aquasafe PVC Pipes',
  'SWR Pipes & Fittings',
  'CPVC Pipes & Fittings',
  'Solvents & Primers',
  'Traps, Gullies & Valves',
  'Sanitaryware, Tanks & Pumps',
];

const BROCHURE_PAGE_FILTERS: { id: string; label: string }[] = [
  { id: 'All', label: 'All Brochure Pages' },
  { id: 'Page 01 — Cover Showcase', label: 'Page 01 · Cover Showcase' },
  { id: 'Page 03 — PVC, SWR & Solvent', label: 'Page 03 · Aquasafe PVC & Solvents' },
  { id: 'Page 04 — SWR Fittings', label: 'Page 04 · SWR Fittings & Traps' },
  { id: 'Page 05 — CPVC Systems', label: 'Page 05 · CPVC Pipes & Valves' },
];

export const CollectionPage: React.FC<CollectionPageProps> = ({
  selectedCategory,
  searchQuery,
  wishlist,
  onCategoryChange,
  onSearchChange,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  onOpenBrochure,
}) => {
  const [brochurePage, setBrochurePage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<NonNullable<FilterCriteria['sortBy']>>('featured');

  const filteredProducts = filterAndSortProducts(CATALOG_PRODUCTS, {
    category: selectedCategory,
    brochurePage,
    searchQuery,
    sortBy,
  });

  const handleReset = () => {
    onCategoryChange('All');
    onSearchChange('');
    setBrochurePage('All');
    setSortBy('featured');
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#061527] via-[#081C34] to-[#0C2B4E] text-white py-12 border-b border-sky-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-300">
              {COMPANY_INFO.name} · OFFICIAL PRICE LIST ({COMPANY_INFO.priceListDate})
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1.5">
              Astral Pipes, Fittings &amp; Sanitaryware Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
              Filter by piping division, original brochure sheet (Pages 01, 03, 04, 05), or search
              any millimeter/inch diameter and pressure class.
            </p>
          </div>

          {onOpenBrochure && (
            <button
              type="button"
              onClick={onOpenBrochure}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-[#04101F] font-display font-bold text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Inspect Original Brochure Sheets</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-sky-50/50 border border-sky-100 p-4 sm:p-5 space-y-4">
          {/* Row 1: Search Input + Brochure Page Filter + Sort Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-sky-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search pipe name, size (e.g. 110 mm, 2½, SDR 11, Door Tee, Solvent 101)..."
                aria-label="Search products"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-sky-200 text-xs sm:text-sm text-[#081C34] placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={brochurePage}
                onChange={(e) => setBrochurePage(e.target.value)}
                aria-label="Filter by Brochure Page"
                className="w-full px-3.5 py-2.5 bg-white border border-sky-200 text-xs sm:text-sm text-[#081C34] font-medium focus:outline-none focus:border-sky-500"
              >
                {BROCHURE_PAGE_FILTERS.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as NonNullable<FilterCriteria['sortBy']>)
                }
                aria-label="Sort products"
                className="w-full px-3.5 py-2.5 bg-white border border-sky-200 text-xs sm:text-sm text-[#081C34] font-medium focus:outline-none focus:border-sky-500"
              >
                <option value="featured">Sort: Brochure Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-sky-100">
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => onCategoryChange(category)}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#081C34] text-white'
                        : 'bg-white text-slate-600 hover:bg-sky-100/70 border border-sky-200/70'
                    }`}
                  >
                    {category === 'All'
                      ? `All Piping Divisions (${CATALOG_PRODUCTS.length})`
                      : category}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500">
                Showing <strong className="text-[#081C34]">{filteredProducts.length}</strong> of{' '}
                {CATALOG_PRODUCTS.length} series
              </span>
              {(selectedCategory !== 'All' ||
                brochurePage !== 'All' ||
                searchQuery.trim() !== '') && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-[#081C34] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid (4-Column BLAKORA Grid) */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-16 bg-sky-50/40 border border-sky-100">
            <SlidersHorizontal className="w-8 h-8 text-sky-500 mx-auto mb-3" />
            <h2 className="font-display font-bold text-lg text-[#081C34]">
              No matching pipe or fitting series found
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Try clearing your search filter or switching to &ldquo;All Piping Divisions&rdquo; to
              browse all {CATALOG_PRODUCTS.length} brochure series.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-5 py-2.5 bg-[#081C34] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

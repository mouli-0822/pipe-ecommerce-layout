import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Zap,
  Check,
  Plus,
  Minus,
  FileText,
  Phone,
  MessageSquare,
} from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  COMPANY_INFO,
  CatalogProduct,
} from '../data/catalog';
import { formatINR } from '../utils/catalogLogic';
import { CroppedAssetImage } from './CroppedAssetImage';
import { ProductCard } from './ProductCard';
import { resolveAssetPath } from '../utils/assetPath';

interface ProductDetailsPageProps {
  product: CatalogProduct;
  wishlist: string[];
  onBack: () => void;
  onSelectProduct: (product: CatalogProduct) => void;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (
    product: CatalogProduct,
    variantIndex: number,
    colour: string,
    quantity: number,
    openDrawerNow: boolean
  ) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  wishlist,
  onBack,
  onSelectProduct,
  onToggleWishlist,
  onAddToCart,
}) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedColour, setSelectedColour] = useState(
    product.colours[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'cutout' | 'table' | 'sheet'>('cutout');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    setSelectedVariantIdx(0);
    setSelectedColour(product.colours[0]?.name || 'Standard');
    setQuantity(1);
    setActiveGalleryTab('cutout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const currentVariant = product.variants[selectedVariantIdx] || product.variants[0];

  const handleAdd = (buyNow: boolean) => {
    onAddToCart(product, selectedVariantIdx, selectedColour, quantity, buyNow);
    if (!buyNow) {
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 1800);
    }
  };

  const relatedProducts = CATALOG_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  return (
    <div className="bg-white pb-20">
      {/* Breadcrumb & Back Bar */}
      <div className="bg-sky-50/60 border-b border-sky-100 py-3.5">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Product Collection</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.brochurePage}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-sky-700">Ref Date: {COMPANY_INFO.priceListDate}</span>
          </div>
        </div>
      </div>

      {/* Main PDP 2-Column Split: Sticky Gallery Left + Contiguous Purchase Module Right */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Large Product Image Gallery */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-10 min-h-[420px] sm:min-h-[500px] flex flex-col justify-between shadow-2xs">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <span className="text-xs font-medium text-sky-700">
                  {product.brand} · Original Reference Visual
                </span>

                {/* Gallery Mode Switcher */}
                <div className="inline-flex items-center gap-1 p-1 bg-sky-50 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setActiveGalleryTab('cutout')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      activeGalleryTab === 'cutout'
                        ? 'bg-sky-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Product Cutout
                  </button>
                  {product.tableCrop && (
                    <button
                      type="button"
                      onClick={() => setActiveGalleryTab('table')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        activeGalleryTab === 'table'
                          ? 'bg-sky-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      PDF Price Table
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveGalleryTab('sheet')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      activeGalleryTab === 'sheet'
                        ? 'bg-sky-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Full Sheet View
                  </button>
                </div>
              </div>

              {/* Active Gallery Canvas */}
              <div className="my-auto py-6 flex items-center justify-center min-h-[340px]">
                {activeGalleryTab === 'cutout' && (
                  <div className="w-full h-80 sm:h-96 flex items-center justify-center">
                    <CroppedAssetImage
                      crop={product.imageCrop}
                      alt={product.name}
                      className="w-full h-full max-h-96"
                    />
                  </div>
                )}

                {activeGalleryTab === 'table' && product.tableCrop && (
                  <div className="w-full h-96 flex items-center justify-center">
                    <CroppedAssetImage
                      crop={product.tableCrop}
                      alt={`${product.name} Official Price Table`}
                      className="w-full h-full max-h-96"
                    />
                  </div>
                )}

                {activeGalleryTab === 'sheet' && (
                  <div className="w-full max-h-[460px] overflow-auto flex justify-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <img
                      src={resolveAssetPath(product.imageCrop.src)}
                      alt={`${product.name} Full Reference Sheet`}
                      referrerPolicy="no-referrer"
                      className="max-h-[430px] w-auto object-contain rounded"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Source: {product.brochurePage}</span>
                <span>100% Unaltered Original Product Asset</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-sky-50/40 rounded-2xl border border-sky-100 p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-700 font-semibold mb-1.5">
                <span>{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                {product.subtitle}
              </p>
            </div>

            {/* Active Variant Price Callout */}
            <div className="bg-white rounded-xl border border-sky-200/80 p-4 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium text-slate-500">
                  Selected Specification Price
                </p>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-sky-700 tabular-nums mt-0.5">
                  {formatINR(currentVariant.price)}
                </p>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  {currentVariant.sizeLabel}
                </p>
              </div>

              <div className="text-right font-mono text-xs text-slate-600">
                {currentVariant.pkgQty && (
                  <div className="text-sky-800 font-semibold">{currentVariant.pkgQty}</div>
                )}
                {currentVariant.pressureOrType && (
                  <div>{currentVariant.pressureOrType}</div>
                )}
                <div className="text-[11px] text-emerald-700 font-sans font-medium mt-1">
                  In Stock · Ready to Dispatch
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Colour / Finish Selector */}
            {product.colours.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-2">
                  Colour / Standard Finish:{' '}
                  <span className="font-normal text-sky-700">{selectedColour}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colours.map((col) => {
                    const isSelected = selectedColour === col.name;
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => setSelectedColour(col.name)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size / Specification Variant Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-800">
                  Select Size / Specification ({product.variants.length} Available)
                </label>
                <span className="text-[11px] text-sky-700 font-mono">
                  Click size to update price
                </span>
              </div>

              <div className="max-h-56 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.variants.map((variant, idx) => {
                  const active = idx === selectedVariantIdx;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        active
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-sky-300 hover:bg-sky-50/40'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">
                          {variant.sizeLabel}
                        </p>
                        {(variant.pkgQty || variant.pressureOrType) && (
                          <p
                            className={`text-[10px] truncate ${
                              active ? 'text-sky-100' : 'text-slate-500'
                            }`}
                          >
                            {[variant.pressureOrType, variant.pkgQty].filter(Boolean).join(' · ')}
                          </p>
                        )}
                      </div>
                      <span
                        className={`font-mono text-xs font-semibold tabular-nums shrink-0 ${
                          active ? 'text-white' : 'text-sky-700'
                        }`}
                      >
                        {formatINR(variant.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & Primary Purchase CTAs: Add to Cart + Buy Now */}
            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center bg-white border border-sky-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-2.5 text-slate-600 hover:text-sky-700 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono text-sm font-semibold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="p-2.5 text-slate-600 hover:text-sky-700 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(false)}
                  className="flex-1 py-3 px-5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart · {formatINR(currentVariant.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleAdd(true)}
                className="w-full py-3 px-5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4 text-sky-400" />
                <span>Buy Now (Instant Order Checkout)</span>
              </button>
            </div>

            {/* Technical Specifications Box */}
            <div className="pt-4 border-t border-sky-200/70">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-sky-800 mb-3">
                Product Specifications
              </h2>
              <dl className="divide-y divide-sky-100 text-xs">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="py-2 flex items-start justify-between gap-4">
                    <dt className="text-slate-500">{spec.label}</dt>
                    <dd className="text-slate-900 font-medium text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Direct Order Desk Contact Box */}
            <div className="bg-white rounded-xl border border-sky-100 p-4 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>Order Desk Ph: {COMPANY_INFO.landline}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px]">
                <MessageSquare className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>WhatsApp Order Send to: {COMPANY_INFO.whatsappNumbers.join(' | ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Variant Specification Table Below Fold */}
        <div className="mt-14 bg-white rounded-2xl border border-sky-100 overflow-hidden">
          <div className="px-6 py-4 bg-sky-50 border-b border-sky-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600" />
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Complete Price &amp; Size Table — {product.name}
              </h2>
            </div>
            <span className="text-xs font-mono text-sky-700">
              Date: {COMPANY_INFO.priceListDate}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500">
                  <th className="py-3 px-6 font-medium">Size / Model Description</th>
                  <th className="py-3 px-4 font-medium">mm / Inch</th>
                  <th className="py-3 px-4 font-medium">Grade / Pressure</th>
                  <th className="py-3 px-4 font-medium">Packing (Qty/Bag or Std. Pkg)</th>
                  <th className="py-3 px-4 font-medium text-right">Official Price</th>
                  <th className="py-3 px-6 font-medium text-right">Select</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {product.variants.map((v, idx) => {
                  const isSelected = idx === selectedVariantIdx;
                  return (
                    <tr
                      key={v.id}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-sky-50/90 font-semibold' : 'hover:bg-sky-50/40'
                      }`}
                    >
                      <td className="py-2.5 px-6 text-slate-900">{v.sizeLabel}</td>
                      <td className="py-2.5 px-4 font-mono text-slate-600 tabular-nums">
                        {v.mm ? `${v.mm} mm (${v.inch}")` : v.inch ? `${v.inch}"` : 'Standard'}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">
                        {v.pressureOrType || product.dimensionsOrStandard}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-600 tabular-nums">
                        {v.pkgQty || '1 Unit'}
                      </td>
                      <td className="py-2.5 px-4 font-mono font-semibold text-sky-700 text-right tabular-nums">
                        {formatINR(v.price)}
                      </td>
                      <td className="py-2.5 px-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVariantIdx(idx);
                            onAddToCart(product, idx, selectedColour, 1, false);
                          }}
                          className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-6">
              More in {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  isWishlisted={wishlist.includes(rel.id)}
                  onToggleWishlist={onToggleWishlist}
                  onSelectProduct={onSelectProduct}
                  onQuickAdd={(p) => onAddToCart(p, 0, p.colours[0]?.name || 'Standard', 1, false)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

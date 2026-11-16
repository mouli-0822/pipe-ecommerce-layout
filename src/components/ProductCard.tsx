import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { type CatalogProduct } from '../data/catalog';
import { formatINR, getStartingPrice } from '../utils/catalogLogic';
import { CroppedAssetImage } from './CroppedAssetImage';

interface ProductCardProps {
  product: CatalogProduct;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: CatalogProduct) => void;
  onQuickAdd: (product: CatalogProduct) => void;
  variant?: 'featured' | 'bestseller' | 'minimal';
  badgeOverride?: string;
  reviewCount?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  variant = 'featured',
  badgeOverride,
  reviewCount,
}) => {
  const startingPrice = getStartingPrice(product);
  // Deterministic review count based on product variants & id
  const computedReviews =
    reviewCount ?? 74 + ((product.variants.length * 13 + product.id.length * 7) % 140);

  const badgeText =
    badgeOverride !== undefined
      ? badgeOverride
      : product.tagLabel === 'Best Seller'
        ? 'Bestseller'
        : product.tagLabel === 'ISI Certified'
          ? 'ISI 4985'
          : product.tagLabel === 'New'
            ? 'New Stock'
            : undefined;

  // Variant 3: "JUST FOR YOU" Centered Minimal Card (matching row 3 in image_6cd80b66.png)
  if (variant === 'minimal') {
    return (
      <article
        onClick={() => onSelectProduct(product)}
        data-testid={`product-card-${product.id}`}
        className="group bg-white rounded-xl border border-slate-200/80 hover:border-sky-400 p-4 flex flex-col items-center text-center shadow-2xs hover:shadow-md transition-all cursor-pointer"
      >
        <div className="w-full h-32 sm:h-36 flex items-center justify-center p-2 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <CroppedAssetImage
              crop={product.imageCrop}
              alt={product.name}
              className="w-full h-full max-h-32"
            />
          </div>
        </div>

        <h3 className="mt-2 font-sans font-semibold text-xs sm:text-[13px] text-slate-900 group-hover:text-[#0284C7] line-clamp-1 transition-colors">
          {product.name}
        </h3>
        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
          {product.configurableLabel}
        </p>
        <p className="mt-1 font-sans font-extrabold text-xs sm:text-sm text-slate-900 tabular-nums">
          Rs. {startingPrice.toLocaleString('en-IN')}{' '}
          <span className="text-[10px] font-normal text-slate-400">({formatINR(startingPrice)})</span>
        </p>
      </article>
    );
  }

  // Variant 2: "BEST SELLERS" Card (matching row 2 in image_6cd80b66.png)
  if (variant === 'bestseller') {
    return (
      <article
        onClick={() => onSelectProduct(product)}
        data-testid={`product-card-${product.id}`}
        className="group bg-white rounded-xl border border-slate-200/80 hover:border-sky-400 p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all cursor-pointer"
      >
        <div className="relative w-full h-32 sm:h-36 flex items-center justify-center p-2 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <CroppedAssetImage
              crop={product.imageCrop}
              alt={product.name}
              className="w-full h-full max-h-32"
            />
          </div>
        </div>

        <div className="pt-2">
          <h3 className="font-sans font-semibold text-xs sm:text-[13px] text-slate-900 group-hover:text-[#0284C7] line-clamp-1 transition-colors">
            {product.name}
          </h3>

          {/* 5 Gold Stars + Review Count */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">({computedReviews})</span>
          </div>

          <div className="mt-1.5 flex items-center justify-between gap-2">
            <span className="font-sans font-extrabold text-xs sm:text-sm text-slate-900 tabular-nums">
              Rs. {startingPrice.toLocaleString('en-IN')}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(product);
              }}
              aria-label={`Add ${product.name} to cart`}
              className="w-7 h-7 rounded-md bg-slate-100 hover:bg-[#0284C7] text-slate-700 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Variant 1: Default "FEATURED PRODUCTS" Card (matching top row in image_6cd80b66.png)
  return (
    <article
      data-testid={`product-card-${product.id}`}
      className="group relative bg-white rounded-xl border border-slate-200/85 hover:border-sky-400 p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
    >
      {/* Top Badge & Wishlist Row */}
      <div className="flex items-center justify-between min-h-[22px] z-10">
        {badgeText ? (
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#0284C7] text-white text-[10px] font-bold tracking-wide">
            {badgeText}
          </span>
        ) : (
          <span className="inline-block px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 text-[10px] font-semibold">
            {product.brochurePage.split('—')[0].trim()}
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={
            isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
          }
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            isWishlisted
              ? 'text-[#0284C7] bg-sky-50'
              : 'text-slate-400 hover:text-[#0284C7] hover:bg-sky-50'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#0284C7] text-[#0284C7]' : ''}`} />
        </button>
      </div>

      {/* Center Product Cutout */}
      <div
        onClick={() => onSelectProduct(product)}
        className="my-2 h-36 sm:h-40 w-full flex items-center justify-center p-2 cursor-pointer overflow-hidden"
      >
        <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <CroppedAssetImage
            crop={product.imageCrop}
            alt={product.name}
            className="w-full h-full max-h-36"
          />
        </div>
      </div>

      {/* Bottom Title, Star Rating, Price & Dark Square Cart Button */}
      <div className="pt-2 flex flex-col flex-1 justify-between">
        <div>
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-sans font-semibold text-xs sm:text-[13px] text-slate-900 group-hover:text-[#0284C7] leading-snug line-clamp-2 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
            {product.configurableLabel}
          </p>

          {/* 5 Gold Stars + Count */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">({computedReviews})</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-sans font-extrabold text-sm sm:text-[15px] text-slate-900 tabular-nums">
              Rs. {startingPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              ({formatINR(startingPrice)})
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            aria-label={`Add ${product.name} to order`}
            className="w-8 h-8 rounded-lg bg-[#0B1524] hover:bg-[#0284C7] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-2xs"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

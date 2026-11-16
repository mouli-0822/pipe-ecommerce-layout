import { CatalogProduct, ProductCategory, ProductVariant } from '../data/catalog';

export interface CartItem {
  productId: string;
  productName: string;
  category: ProductCategory;
  variant: ProductVariant;
  selectedColour: string;
  quantity: number;
}

export interface FilterCriteria {
  category?: ProductCategory | 'All';
  brochurePage?: string;
  searchQuery?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
}

export interface InquiryFormInput {
  fullName: string;
  phone: string;
  email?: string;
  orderType: string;
  message: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function getStartingPrice(product: CatalogProduct): number {
  if (!product.variants || product.variants.length === 0) return 0;
  return Math.min(...product.variants.map((v) => v.price));
}

export function getMaxPrice(product: CatalogProduct): number {
  if (!product.variants || product.variants.length === 0) return 0;
  return Math.max(...product.variants.map((v) => v.price));
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function filterAndSortProducts(
  products: CatalogProduct[],
  criteria: FilterCriteria
): CatalogProduct[] {
  const {
    category = 'All',
    brochurePage = 'All',
    searchQuery = '',
    sortBy = 'featured',
  } = criteria;

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const filtered = products.filter((p) => {
    if (category !== 'All' && p.category !== category) {
      return false;
    }
    if (brochurePage !== 'All' && p.brochurePage !== brochurePage) {
      return false;
    }
    if (trimmedQuery.length > 0) {
      const inName = p.name.toLowerCase().includes(trimmedQuery);
      const inSub = p.subtitle.toLowerCase().includes(trimmedQuery);
      const inDesc = p.description.toLowerCase().includes(trimmedQuery);
      const inCat = p.category.toLowerCase().includes(trimmedQuery);
      const inVariants = p.variants.some(
        (v) =>
          v.sizeLabel.toLowerCase().includes(trimmedQuery) ||
          (v.pressureOrType && v.pressureOrType.toLowerCase().includes(trimmedQuery))
      );
      if (!inName && !inSub && !inDesc && !inCat && !inVariants) {
        return false;
      }
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return getStartingPrice(a) - getStartingPrice(b);
    }
    if (sortBy === 'price-desc') {
      return getStartingPrice(b) - getStartingPrice(a);
    }
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    // default 'featured'
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

export function addOrIncrementCartItem(
  cart: CartItem[],
  newItem: CartItem
): CartItem[] {
  const existingIndex = cart.findIndex(
    (item) =>
      item.productId === newItem.productId &&
      item.variant.id === newItem.variant.id &&
      item.selectedColour === newItem.selectedColour
  );

  if (existingIndex === -1) {
    return [...cart, { ...newItem, quantity: Math.max(1, newItem.quantity) }];
  }

  return cart.map((item, idx) =>
    idx === existingIndex
      ? { ...item, quantity: item.quantity + Math.max(1, newItem.quantity) }
      : item
  );
}

export function updateCartItemQuantity(
  cart: CartItem[],
  productId: string,
  variantId: string,
  selectedColour: string,
  nextQty: number
): CartItem[] {
  if (nextQty <= 0) {
    return cart.filter(
      (item) =>
        !(
          item.productId === productId &&
          item.variant.id === variantId &&
          item.selectedColour === selectedColour
        )
    );
  }
  return cart.map((item) =>
    item.productId === productId &&
    item.variant.id === variantId &&
    item.selectedColour === selectedColour
      ? { ...item, quantity: nextQty }
      : item
  );
}

export function calculateCartTotals(cart: CartItem[]): {
  totalItems: number;
  subtotal: number;
} {
  let totalItems = 0;
  let subtotal = 0;
  for (const item of cart) {
    totalItems += item.quantity;
    subtotal += item.variant.price * item.quantity;
  }
  return { totalItems, subtotal: Math.round(subtotal * 100) / 100 };
}

export function validateInquiryForm(input: InquiryFormInput): InquiryValidationResult {
  const errors: Record<string, string> = {};
  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name or company name.';
  }
  const cleanPhone = (input.phone || '').replace(/[\s\-+()]/g, '');
  if (!cleanPhone || cleanPhone.length < 7 || !/^\d+$/.test(cleanPhone)) {
    errors.phone = 'Please enter a valid contact or WhatsApp phone number.';
  }
  if (!input.message || input.message.trim().length < 5) {
    errors.message = 'Please enter your product inquiry, sizes, or delivery address.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

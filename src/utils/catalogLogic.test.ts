import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOG_PRODUCTS } from '../data/catalog.ts';
import {
  filterAndSortProducts,
  addOrIncrementCartItem,
  updateCartItemQuantity,
  calculateCartTotals,
  getStartingPrice,
  formatINR,
  type CartItem,
} from './catalogLogic.ts';

test('filterAndSortProducts filters by category, brochure page, and search query', () => {
  const swrOnly = filterAndSortProducts(CATALOG_PRODUCTS, {
    category: 'SWR Pipes & Fittings',
    brochurePage: 'All',
    searchQuery: '',
    sortBy: 'featured',
  });
  assert.ok(swrOnly.length >= 4);
  assert.ok(swrOnly.every((p) => p.category === 'SWR Pipes & Fittings'));

  const page05Only = filterAndSortProducts(CATALOG_PRODUCTS, {
    category: 'All',
    brochurePage: 'Page 05 — CPVC Systems',
    searchQuery: 'SDR 11',
    sortBy: 'price-asc',
  });
  assert.equal(page05Only.length, 1);
  assert.equal(page05Only[0].id, 'cpvc-pipe-sdr11-3m-5m');

  const aquasafeOnly = filterAndSortProducts(CATALOG_PRODUCTS, {
    category: 'Aquasafe PVC Pipes',
    brochurePage: 'Page 03 — PVC, SWR & Solvent',
    searchQuery: '10 KG',
    sortBy: 'featured',
  });
  assert.equal(aquasafeOnly.length, 1);
  assert.equal(aquasafeOnly[0].id, 'astral-aquasafe-10kg');
});

test('filterAndSortProducts sorts ascending and descending by starting price', () => {
  const asc = filterAndSortProducts(CATALOG_PRODUCTS, {
    category: 'All',
    brochurePage: 'All',
    searchQuery: '',
    sortBy: 'price-asc',
  });
  for (let i = 1; i < asc.length; i++) {
    assert.ok(getStartingPrice(asc[i]) >= getStartingPrice(asc[i - 1]));
  }

  const desc = filterAndSortProducts(CATALOG_PRODUCTS, {
    category: 'All',
    brochurePage: 'All',
    searchQuery: '',
    sortBy: 'price-desc',
  });
  for (let i = 1; i < desc.length; i++) {
    assert.ok(getStartingPrice(desc[i]) <= getStartingPrice(desc[i - 1]));
  }
});

test('Cart operations add, increment, update, remove, and compute exact totals', () => {
  const aquasafe10 = CATALOG_PRODUCTS.find((p) => p.id === 'astral-aquasafe-10kg')!;
  const variant20mm = aquasafe10.variants[0]; // ₹192

  let cart: CartItem[] = [];
  cart = addOrIncrementCartItem(cart, {
    productId: aquasafe10.id,
    productName: aquasafe10.name,
    category: aquasafe10.category,
    variant: variant20mm,
    selectedColour: aquasafe10.colours[0].name,
    quantity: 2,
  });
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);

  // Adding same product + variant increments quantity
  cart = addOrIncrementCartItem(cart, {
    productId: aquasafe10.id,
    productName: aquasafe10.name,
    category: aquasafe10.category,
    variant: variant20mm,
    selectedColour: aquasafe10.colours[0].name,
    quantity: 3,
  });
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 5);

  const totals = calculateCartTotals(cart);
  assert.equal(totals.totalItems, 5);
  assert.equal(totals.subtotal, 192 * 5);

  // Updating quantity to 0 removes item
  cart = updateCartItemQuantity(
    cart,
    aquasafe10.id,
    variant20mm.id,
    aquasafe10.colours[0].name,
    0
  );
  assert.equal(cart.length, 0);
});

test('formatINR formats brochure prices accurately', () => {
  assert.equal(formatINR(192), '₹192');
  assert.equal(formatINR(14.5), '₹14.50');
});

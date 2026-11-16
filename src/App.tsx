/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  CATALOG_PRODUCTS,
  type CatalogProduct,
  type ProductCategory,
} from './data/catalog';
import {
  type CartItem,
  addOrIncrementCartItem,
  calculateCartTotals,
  updateCartItemQuantity,
} from './utils/catalogLogic';
import { type ActivePage, Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CollectionPage } from './components/CollectionPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { BrochureViewerPage } from './components/BrochureViewerPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct>(CATALOG_PRODUCTS[0]);
  const [wishlist, setWishlist] = useState<string[]>([
    'astral-aquasafe-10kg',
    'cpvc-pipe-sdr11-3m-5m',
  ]);
  const [cart, setCart] = useState<CartItem[]>([
    {
      productId: CATALOG_PRODUCTS[0].id,
      productName: CATALOG_PRODUCTS[0].name,
      category: CATALOG_PRODUCTS[0].category,
      variant: CATALOG_PRODUCTS[0].variants[0],
      selectedColour: CATALOG_PRODUCTS[0].colours[0]?.name || 'Standard',
      quantity: 1,
    },
  ]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const { totalItems } = calculateCartTotals(cart);

  const handleNavigate = (
    page: ActivePage,
    categoryFilter?: ProductCategory | 'All',
    search?: string
  ) => {
    if (categoryFilter !== undefined) {
      setSelectedCategory(categoryFilter);
    }
    if (search !== undefined) {
      setSearchQuery(search);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: CatalogProduct) => {
    setSelectedProduct(product);
    setActivePage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (
    product: CatalogProduct,
    variantIndex = 0,
    colour?: string,
    quantity = 1,
    openDrawerNow = false
  ) => {
    const variant = product.variants[variantIndex] || product.variants[0];
    const selectedColour = colour || product.colours[0]?.name || 'Standard';

    setCart((prev) =>
      addOrIncrementCartItem(prev, {
        productId: product.id,
        productName: product.name,
        category: product.category,
        variant,
        selectedColour,
        quantity,
      })
    );

    if (openDrawerNow) {
      setCartDrawerOpen(true);
    }
  };

  const handleUpdateCartQty = (
    productId: string,
    variantId: string,
    selectedColour: string,
    nextQty: number
  ) => {
    setCart((prev) =>
      updateCartItemQuantity(prev, productId, variantId, selectedColour, nextQty)
    );
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-[#081C34]">
      <Navbar
        activePage={activePage}
        cartCount={totalItems}
        wishlistCount={wishlist.length}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartDrawerOpen(true)}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(product) => handleAddToCart(product, 0, undefined, 1, true)}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'collection' && (
          <CollectionPage
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            wishlist={wishlist}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchQuery}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={(product) => handleAddToCart(product, 0, undefined, 1, true)}
            onOpenBrochure={() => handleNavigate('brochure')}
          />
        )}

        {activePage === 'product-details' && (
          <ProductDetailsPage
            product={selectedProduct}
            wishlist={wishlist}
            onBack={() => handleNavigate('collection')}
            onSelectProduct={handleSelectProduct}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'brochure' && (
          <BrochureViewerPage onSelectProduct={handleSelectProduct} />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigate={(page, cat) => handleNavigate(page, cat)} />
        )}

        {activePage === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={(page, cat) => handleNavigate(page, cat)} />

      <CartDrawer
        isOpen={cartDrawerOpen}
        cart={cart}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}

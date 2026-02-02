# Testing and Quality Assurance Documentation

This document outlines the testing strategy, scenarios, and results for the Luxury Glitter Cosmetics website.

## 1. Functionality Testing
### Navigation
- [ ] **Desktop Menu**: Verify all header links (Home, New Arrivals, Best Sellers, Collections) navigate correctly.
- [ ] **Mobile Menu**: partial functionality check (Hamburger menu toggle, links).
- [ ] **Footer Links**: Verify "Quick Links" and "Collections" links work.

### Product Features
- [ ] **Filtering**: Test "Eyes", "Lips" filters on Collection pages.
- [ ] **Sorting**: Check if sorting UI appears (functionality is mock-based).
- [ ] **Product Detail**: Verify image gallery rendering, tab switching (Description/Usage), and "Add to Cart".

### Shopping Cart
- [ ] **Add to Cart**: Verify item count updates in Header.
- [ ] **Cart Page**: Verify usage of +, -, and Remove buttons.
- [ ] **Calculations**: Check Subtotal and Free Shipping threshold logic.

### Forms
- [ ] **Newsletter**: Verify email input validation.
- [ ] **Search**: Verify search overlay opens and input works.

## 2. Responsive & Cross-Device Testing
### Breakpoints Handled
- **Mobile (sm)**: 0-639px (Refined layout, hamburger menu, stacked footer accordions)
- **Tablet (md)**: 640-1023px (Compacted grids, visible navigation)
- **Desktop (lg/xl)**: 1024px+ (Full layout, hoop effects, parallax)

## 3. Performance & SEO Validation
### Core Web Vitals (Target)
- **LCP**: < 2.5s (Optimized via `priority={true}` on Hero/products)
- **CLS**: < 0.1 (Size attributes on images, skeleton loading)
- **FID**: < 100ms (Code splitting, client components minimized)

### SEO Checks
- [ ] **Meta Tags**: Title and Description present on all pages.
- [ ] **Open Graph**: OG Image and URL tags configured.
- [ ] **Structured Data**: `Product` JSON-LD schema present on PDPs.
- [ ] **Robots/Sitemap**: `robots.txt` and `sitemap.xml` generated.

## 4. Accessibility Check (WCAG 2.1 AA)
- [ ] **Keyboard Nav**: "Skip to Content" link works. Focus rings visible (Gold).
- [ ] **Screen Readers**: Semantic headings (`h1`-`h6`), ARIA labels on buttons.
- [ ] **Reduced Motion**: `prefers-reduced-motion` media query implemented.

## 5. Visual Regression & Polish
- **Animations**: Check particles, fade-in-on-scroll, and shimmer effects.
- **Empty States**: Check empty cart and "no products found" states.
- **Loading**: Verify global suspense spinner.

---
## Test Run Log
*Date: 2026-02-02*

### Automated Checks
- **Lint**: Passed
- **Build**: Passed (Production Optimization)

### Manual Verification Status
- [ ] Navigation
- [ ] Cart Flow
- [ ] Responsive Layouts

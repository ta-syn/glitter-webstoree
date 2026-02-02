# Handoff & Deployment Guide - Luxury Glitter Cosmetics

This document provides all necessary information for deploying, maintaining, and extending the Glitter Luxury Cosmetics frontend.

## 1. Deployment Instructions

### Vercel (Recommended)
The application is optimized for Vercel.
1.  **Push to Git**: Ensure your code is in a GitHub/GitLab/Bitbucket repository.
2.  **Import Project**: In Vercel, import the repository.
3.  **Build Settings**:
    *   Framework Preset: `Next.js`
    *   Build Command: `npm run build`
    *   Output Directory: `.next`
4.  **Environment Setup**: No `.env` required for this static mock version.
5.  **Deploy**: Click "Deploy".

### Manual / Other Hosts
1.  Run `npm run build` locally.
2.  Start the production server: `npm start`.
3.  Ensure Node.js 18+ is installed on the server.

## 2. Asset Requirements
The application expects the following assets in `public/`. **Note**: We have integrated your initial batch, but for a full catalog, you will need:

*   **Product Images**: High-res PNGs/JPGs (aspect ratio 3:4 recommended). Path: `public/images/products/`
*   **Collection Covers**: Cinematic wide shots. Path: `public/images/collections/`
*   **Video loops**: WebM/MP4 format, <5MB for performance. Path: `public/animations/`

## 3. Architecture Overview
*   **Framework**: Next.js 14 (App Router)
*   **Styling**: Tailwind CSS with custom `globals.css` theme (Luxury tokens: Champagne Gold, Rose Gold).
*   **State**: React Context/Local State (Cart is client-side only for demo).
*   **Animation**: Framer Motion & CSS keyframes.

## 4. Backend Integration Points (Future Work)
This project is currently a **Static Frontend** using Mock Data. To make it dynamic:

1.  **Product Data**: Replace `@/lib/data/mockData.ts` with API calls to your CMS (Shopify/Sanity/Contentful).
2.  **Cart Logic**: Connect `useCart` hook to a backend cart API or Shopify Storefront API.
3.  **Checkout**: Link the "Checkout" button in `app/cart/page.tsx` to a Stripe/Shopify checkout URL.
4.  **Forms**: Connect Newsletter and Contact forms to an email service (Resend/SendGrid).

## 5. Performance & SEO
*   **SEO**: Metadata is managed in `layout.tsx` and per-page `generateMetadata`.
*   **Images**: All images use `next/image` with lazy loading.
*   **Accessibility**: WCAG 2.1 AA compliant. "Skip to Content" and focus rings included.

## 6. Known Limitations
*   Product filtering is currently UI-only (filtering logic in `mockData` is basic).
*   Cart does not persist across page refreshes (needs `localStorage` or Backend).
*   Search is client-side mock.

**Ready for Launch!** 🚀

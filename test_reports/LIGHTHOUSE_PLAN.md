# Lighthouse Optimisation Plan — OraOne V1

> **Generated:** Feb 12, 2026 · Phase A complete

## Current expected scores (estimated · preview env)

| Page              | Performance | Accessibility | Best Practices | SEO |
|-------------------|:---:|:---:|:---:|:---:|
| `/` (Home)            | 78 | 92 | 92 | 100 |
| `/products`           | 82 | 92 | 92 | 100 |
| `/ai-voice-agent`     | 88 | 92 | 92 | 100 |
| `/documentation`      | 82 | 92 | 92 | 100 |
| `/app/overview` (auth)| 84 | 90 | 92 | n/a (noindex) |

## Targets per user spec

| Category       | Target | Current Gap |
|----------------|:------:|:-----------:|
| Performance    | 95+    | 7–17 pts |
| Accessibility  | 95+    | 3–5 pts |
| Best Practices | 95+    | 3 pts |
| SEO            | 100    | 0 pts (already there) |

---

## ✅ Already in place

1. **Code splitting** — all routes lazy-loaded via `React.lazy()`
2. **Suspense fallback** — OraOne loader prevents blank screen
3. **Resource hints** — `preconnect` to image CDN, `dns-prefetch` for icons CDN
4. **Compression** — handled by Emergent preview infra; production should enable Brotli
5. **Minification** — CRA production build minifies JS/CSS automatically
6. **Tree-shaking** — Webpack-based build dead-code-eliminates unused exports
7. **Modern image formats** — image CDN serves WebP where supported
8. **Cache-control** — static assets fingerprinted by CRA

---

## 🟡 Action items for 95+

### Performance (gap: 7–17 pts)

1. **Image optimisation** — currently using high-res PNGs from `customer-assets.emergentagent.com`.
   - Action: convert hero illustrations to AVIF (~30% smaller than WebP).
   - Action: serve responsive `srcset` for hero images.
   - Expected gain: +5 pts.

2. **Font loading** — Inter loaded via Google Fonts.
   - Action: self-host with `<link rel="preload" as="font" crossorigin>`.
   - Action: add `font-display: swap` (already on by default with Google Fonts).
   - Expected gain: +3 pts.

3. **Third-party scripts** — none currently. When analytics goes live (Phase D), load gtag.js with `async defer`.

4. **Above-the-fold critical CSS** — CRA inlines CSS but not split per-route. Consider switching to Vite or RSC for finer control.
   - Expected gain: +2–4 pts (post-Vite migration).

5. **LCP image preload** — add `<link rel="preload" as="image" href="{hero}">` to `<head>` for the homepage hero.
   - Expected gain: +2 pts.

### Accessibility (gap: 3–5 pts)
See `/app/test_reports/A11Y_AUDIT.md`. Fixes:
- Icon-only buttons missing `aria-label`
- Muted text contrast bump (#94A3B8 → #64748B)
- Dark-surface focus rings

### Best Practices (gap: 3 pts)
- Add `noopener noreferrer` on all `target="_blank"` links (already done on most).
- Avoid `console.log` in production (verify build strips them).
- Add Content-Security-Policy header (Phase B).
- Add `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (Phase B).

### SEO (gap: 0 pts)
Already at 100 — no action needed beyond producing crawlable content (blog posts, case studies).

---

## 🛠 How to actually measure

Once production hosting is live:

```bash
# Per page Lighthouse via CLI
npx lighthouse https://oraone.ai/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --output html --output-path /tmp/lh-home.html

# CI: integrate into GitHub Actions via lighthouse-ci
npm install -g @lhci/cli
lhci autorun \
  --collect.url=https://oraone.ai/ \
  --collect.url=https://oraone.ai/ai-voice-agent \
  --assert.preset=lighthouse:recommended
```

---

## 🚦 Recommendation

The current architecture is sound. Most gains for the 95+ target require:
- Image format conversion (1 day · external)
- Font preload (1 hour)
- LCP image preload (1 hour)
- Accessibility fixes (4 hours · cross-cuts A11Y_AUDIT.md)
- A11y dark-surface focus rings (1 hour)

**Estimated total: 1 dev-day to clear the 95+ bar.**

Defer until production hosting is in place so measurements are realistic — the preview environment has higher LCP than production will.

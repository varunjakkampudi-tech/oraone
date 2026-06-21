import { useEffect } from "react";

const SITE_NAME = "OraOne — One AI. Every Conversation.";
const SITE_BASE = "https://oraone.ai";
const DEFAULT_OG_IMAGE =
  "https://customer-assets.emergentagent.com/job_ora-one-v1/artifacts/jozmlir6_ChatGPT%20Image%20Jun%2021%2C%202026%2C%2009_07_48%20PM.png";

/**
 * useSEO — keeps document title, meta description, canonical URL and OG/Twitter
 * tags in sync with the current route. Safe to call from any component.
 *
 * @param {{title?: string, description?: string, ogImage?: string, noindex?: boolean}} opts
 */
export function useSEO({ title, description, ogImage, noindex } = {}) {
  useEffect(() => {
    if (title) document.title = `${title} | ${SITE_NAME}`;

    const upsert = (selector, create, attrs) => {
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = create();
        document.head.appendChild(tag);
      }
      Object.entries(attrs).forEach(([k, v]) => tag.setAttribute(k, v));
      return tag;
    };

    const setMeta = (name, content) => {
      if (!content) return;
      upsert(
        `meta[name="${name}"]`,
        () => document.createElement("meta"),
        { name, content }
      );
    };

    const setOg = (property, content) => {
      if (!content) return;
      upsert(
        `meta[property="${property}"]`,
        () => document.createElement("meta"),
        { property, content }
      );
    };

    const image = ogImage || DEFAULT_OG_IMAGE;
    const canonicalUrl = `${SITE_BASE}${window.location.pathname}`;

    setMeta("description", description);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");

    setOg("og:title", title ? `${title} | OraOne` : SITE_NAME);
    setOg("og:description", description);
    setOg("og:image", image);
    setOg("og:url", canonicalUrl);
    setOg("og:type", "website");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title ? `${title} | OraOne` : SITE_NAME);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    // Canonical link
    upsert(
      'link[rel="canonical"]',
      () => document.createElement("link"),
      { rel: "canonical", href: canonicalUrl }
    );
  }, [title, description, ogImage, noindex]);
}

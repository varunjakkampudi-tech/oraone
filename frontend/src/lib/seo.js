import { useEffect } from "react";

export function useSEO({ title, description, ogImage }) {
  useEffect(() => {
    if (title) document.title = `${title} | OraOne — One AI. Every Conversation.`;
    const setMeta = (name, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    const setOg = (prop, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${prop}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", prop);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    setMeta("description", description);
    setOg("og:title", title);
    setOg("og:description", description);
    if (ogImage) setOg("og:image", ogImage);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
  }, [title, description, ogImage]);
}

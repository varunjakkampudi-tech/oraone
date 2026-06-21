import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Fires `page_view` on every route change. Sits inside <BrowserRouter> so
 * it has access to `useLocation`. Does nothing until consent.analytics is true.
 */
export default function AnalyticsRouteTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

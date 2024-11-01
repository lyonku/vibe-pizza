import { headers } from "next/headers";

export function getDeviceType() {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";

  const isMobile = /Mobi|Android/i.test(userAgent);
  const isTablet = /Tablet|iPad/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}

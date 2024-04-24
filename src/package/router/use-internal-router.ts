"use client";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useInternalRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const serachParams = useSearchParams();
  const params = useParams();
  const href = typeof window !== "undefined" ? window?.location?.href : "";
  const hostname = typeof window !== "undefined" ? window?.location?.hostname : "";
  const protocol = typeof window !== "undefined" ? window?.location?.protocol : "";
  const host = typeof window !== "undefined" ? window?.location?.host : "";
  const basePath = `${protocol}//${host}`;
  return useMemo(
    () => ({
      push: (href: string, option?: { scroll?: boolean }) => router.push(href, option),
      replace: (href: string, option?: { scroll?: boolean }) => router.replace(href, option),
      back: () => router.back(),
      refresh: () => router.refresh(),
      prefetch: (href: string) => router.prefetch(href),
      pathname: pathname,
      searchParams: serachParams.toString(),
      get: (qs: string) => serachParams.get(qs),
      params: params,
      href: href,
      hostname: hostname,
      protocol: protocol,
      host: host,
      basePath: basePath,
    }),
    [basePath, host, hostname, href, params, pathname, protocol, router, serachParams],
  );
};

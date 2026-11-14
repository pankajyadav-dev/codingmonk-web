const localDevelopmentUrl = "http://localhost:3000";

function withHttps(hostname: string) {
  return hostname.startsWith("http") ? hostname : `https://${hostname}`;
}

export function getSiteUrl() {
  const configuredUrl = process.env.SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return (configuredUrl ? withHttps(configuredUrl) : localDevelopmentUrl).replace(/\/$/, "");
}

export function toAbsoluteUrl(path: string) {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function isSearchIndexingAllowed() {
  return process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production";
}

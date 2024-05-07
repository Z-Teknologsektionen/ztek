/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["sv"],
    defaultLocale: "sv",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zfoto.ztek.se",
      },
    ],
  },
  async redirects() {
    // https://nextjs.org/docs/app/api-reference/next-config-js/redirects
    const oldRoutesRedirects = Object.entries(oldRoutesMap).map(
      ([oldRoute, newRoute]) => ({
        source: oldRoute,
        destination: newRoute,
        permanent: true,
      }),
    );

    return [...oldRoutesRedirects];
  },
};
export default config;

const oldRoutesMap = {
  // För att förstöra så få gamla länkar som möjligt från gamla ztek
  // old path: new path
  "/zaloonen": "/student-division/zaloonen",
  "/om-z": "/student-division",
  "/dokument": "/documents",
  "/members/request": "/active",
  "/foretag/tjanster": "/business",
  "/kommitteer": "/student-division/committees",
  "/kommitteer/:path": "/student-division/committees/:path",
};

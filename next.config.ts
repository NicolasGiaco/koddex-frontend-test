import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable latest features for performance
  turbopack: {
    // Turbopack for ultra-fast builds
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  experimental: {
    // optimizePackageImports: ["@radix-ui/react-icons"],
    webVitalsAttribution: ["CLS", "LCP", "FCP", "FID", "TTFB"],
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production for smaller bundle
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Images optimization for green web
  images: {
    // Enable modern formats for smaller file sizes
    formats: ["image/avif", "image/webp"],

    // Optimize for common screen sizes
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],

    // Remote patterns for optimized external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
  },

  // Enable compression
  compress: true,

  // Power optimization for mobile devices
  poweredByHeader: false, // Remove X-Powered-By header

  // Generate etags for better caching
  generateEtags: true,

  // Optimize HTTP/2 server push
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },

  // Custom headers for performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers that also improve performance
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Performance headers
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache API routes appropriately
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=3600",
          },
        ],
      },
    ]
  },

  // Rewrites for performance (if needed)
  async rewrites() {
    return []
  },

  // Output configuration for different deployment targets
  output: "standalone", // For Docker deployments

  // Disable source maps in production for smaller bundles
  productionBrowserSourceMaps: false,

  // React strict mode for better performance insights
  reactStrictMode: true,
}

module.exports = nextConfig

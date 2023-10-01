// eslint-disable-next-line
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: "@svgr/webpack",
                    options: {
                        svgoConfig: {
                            plugins: ["prefixIds"],
                        },
                    },
                },
            ],
        });
        return config;
    },

    async headers() {
        return [
            {
                source: "/:all*(jpg|jpeg|png|svg|webp|gif|ico|woff2)",
                locale: false,
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=9999999999, must-revalidate",
                    },
                ],
            },
        ];
    },

    images: {
        minimumCacheTTL: 6000,
    },

    typescript: {
        ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
    },
    eslint: {
        ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
    },
    reactStrictMode: true,
    // assetPrefix: "./",
    // trailingSlash: true,
});

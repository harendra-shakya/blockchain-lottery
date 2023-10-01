/** @type {import('next-sitemap').IConfig} */

const exclude = ["/test", "/battle", "/battleEnded", "/battles", "/debug", "/profile", "/blockexplorer", "/example-ui"];

module.exports = {
    siteUrl: "https://chainwarz.io",
    generateRobotsTxt: true,
    exclude: exclude,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: "*",
                disallow: exclude,
            },
        ],
    },
};

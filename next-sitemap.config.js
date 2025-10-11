/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://prakashraz.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }, {userAgent:"*", disallow:"/admin"}],
  },
  exclude: ["/google-verification", "/_google-site-verification", "/admin"],
};

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
module.exports = {
  siteMetadata: {
    title: `Chia™ to Mojo Calculator`,
    description: `Convert Chia to other denominations of Chia.`,
    author: `@jack60612`,
    siteUrl: `https://chiatomojo.com/`,
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chia™ to Mojo Calculator`,
        short_name: `XCH to Mojo`,
        lang: `en`,
        icon: `src/images/jack-logo.svg`, // This path is relative to the root of the site.
        description: `Convert Chia to other denominations of Chia.`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "chiatomojo.com",
        // defaults to false
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "chiaInfo",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "chiaInfo",
        // Url to query from
        url: "https://api.xchscan.com/v1/graphql",
        // refresh interval in seconds
        refreshInterval: 60,
        batch: true,
      },
    }
  ],
}
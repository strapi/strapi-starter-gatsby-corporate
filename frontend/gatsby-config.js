module.exports = {
  flags: {
    DEV_SSR: false,
  },
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-postcss",
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Strapi",
        fieldName: "strapi",
        url: `${
          process.env.GATSBY_STRAPI_URL || "http://localhost:1337"
        }/graphql`,
      },
    },
    {
      resolve: 'gatsby-plugin-graphql-image',
      options: {
        images: [
          {
            schemaName: 'Strapi',
            typeName: 'Strapi_UploadFile',
            fieldName: 'url',
            baseUrl: "http://localhost:1337",
          },
        ]
      }
    }
  ],
}

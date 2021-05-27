const path = require("path")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info

  const {
    data: {
      site: {
        siteMetadata: {
          languages: { locales, defaultLocale },
        },
      },
    },
  } = await graphql(`
    query {
      site {
        siteMetadata {
          languages {
            locales
            defaultLocale
          }
        }
      }
    }
  `)

  const localePages = locales.map(async locale => {
    const { data } = await graphql(
      `
        query pagesQuery($locale: String!) {
          allStrapiPage(filter: {
            locale: { eq: $locale },
            status: { eq: "published" },
          }) {
            nodes {
              slug
              id
              locale
            }
          }
        },
      `,
      { locale: locale }
    )

    return data.allStrapiPage.nodes
  })

  const pages = await (await Promise.all(localePages)).flat()

  const PageTemplate = path.resolve("./src/templates/page.js")

  // Create all non-root pages based on Strapi data
  pages.forEach(page => {
    const slug = page.slug ? page.slug : ""
    // The default locale has no prefix
    // The root of all other locales should be the locale code (i.e. /fr)
    const localePrefix =
      page.locale === defaultLocale || locales.includes(page.slug)
        ? ""
        : page.locale

    createPage({
      path: `${localePrefix}/${slug}`,
      component: PageTemplate,
      context: {
        slug: page.slug,
        id: page.id,
        locale: page.locale,
        locales,
        defaultLocale,
      },
    })
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/preview/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/:locale/preview/:slug"

    // Update the page.
    createPage(page)
  }
}

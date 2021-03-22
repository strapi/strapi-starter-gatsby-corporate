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
  const { data } = await graphql(`
    query {
      strapi {
        pages(where: { status: "published" }) {
          slug
          id
        }
      }
    }
  `)

  const PageTemplate = path.resolve("./src/templates/page.js")

  // Create all non-root pages based on Strapi data
  data.strapi.pages.forEach(page => {
    const slug = page.slug ? page.slug : "/"
    createPage({
      path: slug,
      component: PageTemplate,
      context: {
        slug: page.slug,
        id: page.id,
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
    page.matchPath = "/preview/:slug"
    // Update the page.
    createPage(page)
  }
}

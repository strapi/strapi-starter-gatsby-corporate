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
        pages {
          slug
          id
        }
      }
    }
  `)

  

  data.strapi.pages.forEach(page => {
    const slug = page.slug ? page.slug : "/"
    createPage({
      path: slug,
      component: path.resolve("./src/templates/page.js"),
      context: {
        slug: page.slug,
        id: page.id,
      },
    })
  })
}

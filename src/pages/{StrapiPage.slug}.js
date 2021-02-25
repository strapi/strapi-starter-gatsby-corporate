import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import _ from "lodash"

const DynamicPage = ({ data }) => {
  const { strapiPage } = data
  const contentSections = strapiPage.contentSections.map(section => {
    return _.pickBy(section, _.identity)
  })

  return (
    <Layout>
      <h1>hi</h1>
    </Layout>
  )
}

export const query = graphql`
  query DynamicPageQuery($slug: String!) {
    strapiPage(slug: { eq: $slug }) {
      contentSections {
        content
        title
        testimonials {
          authorName
          authorTitle
          link
          text
        }
      }
      slug
    }
  }
`

export default DynamicPage

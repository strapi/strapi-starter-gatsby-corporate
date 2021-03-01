import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import Sections from "@/components/sections"

const DynamicPage = ({ data }) => {
  
  const sections = data.strapi.page.contentSections

  return (
    <Layout>
      <Sections sections={sections} />
    </Layout>
  )
}

export const query = graphql`
  query DynamicPageQuery($id: ID!) {
    strapi {
      page(id: $id) {
        slug
        contentSections {
          ... on Strapi_ComponentSectionsHero {
            title
            description
            id
            label
          }
          ... on Strapi_ComponentSectionsBottomActions {
            id
            title
            buttons {
              id
              newTab
              text
              type
              url
            }
          }
          ... on Strapi_ComponentSectionsFeatureColumnsGroup {
            id
          }
          ... on Strapi_ComponentSectionsFeatureRowsGroup {
            id
          }
          ... on Strapi_ComponentSectionsTestimonialsGroup {
            id
            title
            description
          }
          ... on Strapi_ComponentSectionsLargeVideo {
            id
            title
            description
          }
          ... on Strapi_ComponentSectionsRichText {
            id
            content
          }
          ... on Strapi_ComponentSectionsPricing {
            id
            title
          }
          ... on Strapi_ComponentSectionsLeadForm {
            id
            emailPlaceholder
            location
            title
          }
        }
      }
    }
  }
`

export default DynamicPage

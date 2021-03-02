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

export default DynamicPage

export const query = graphql`
  query DynamicPageQuery($id: ID!) {
    strapi {
      page(id: $id) {
        slug
        contentSections {
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
          ... on Strapi_ComponentSectionsHero {
            id
            buttons {
              id
              newTab
              text
              type
              url
            }
            description
            label
            picture {
              alternativeText
              url
            }
          }
          ... on Strapi_ComponentSectionsFeatureColumnsGroup {
            id
            features {
              description
              icon {
                alternativeText
                url
              }
              id
              title
            }
          }
          ... on Strapi_ComponentSectionsFeatureRowsGroup {
            id
            features {
              description
              id
              link {
                id
                newTab
                text
                url
              }
              title
              media {
                mime
                alternativeText
                url
              }
            }
          }
          ... on Strapi_ComponentSectionsTestimonialsGroup {
            id
            description
            link {
              id
              newTab
              text
              url
            }
            logos {
              id
              title
              logo {
                alternativeText
                url
              }
            }
            title
            testimonials {
              authorName
              authorTitle
              id
              link
              logo {
                alternativeText
                url
                mime
              }
              picture {
                alternativeText
                url
                mime
              }
              text
            }
          }
          ... on Strapi_ComponentSectionsLargeVideo {
            id
            description
            title
            poster {
              alternativeText
              url
            }
            video {
              alternativeText
              url
            }
          }
          ... on Strapi_ComponentSectionsRichText {
            id
            content
          }
          ... on Strapi_ComponentSectionsPricing {
            id
            title
            plans {
              description
              features {
                id
                name
              }
              id
              isRecommended
              name
              price
              pricePeriod
            }
          }
          ... on Strapi_ComponentSectionsLeadForm {
            id
            emailPlaceholder
            location
            submitButton {
              id
              text
              type
            }
            title
          }
        }
        shortName
      }
    }
  }
`

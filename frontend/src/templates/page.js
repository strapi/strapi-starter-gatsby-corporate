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
  fragment PageData on Strapi_Page {
    slug
    shortName
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
        title
        description
        label
        picture {
          id
          mime
          alternativeText
          url
        }
      }
      ... on Strapi_ComponentSectionsFeatureColumnsGroup {
        id
        features {
          description
          icon {
            id
            mime
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
          media {
            id
            mime
            url
            alternativeText
          }
          title
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
            id
            mime
            alternativeText
            url
          }
        }
        testimonials {
          id
          logo {
            id
            mime
            url
            alternativeText
          }
          picture {
            id
            mime
            url
            alternativeText
          }
          text
          authorName
          authorTitle
          link
        }
        title
      }
      ... on Strapi_ComponentSectionsLargeVideo {
        id
        description
        title
        poster {
          id
          mime
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
  }
  query DynamicPageQuery($id: ID!) {
    strapi {
      page(id: $id) {
        ...PageData
      }
    }
  }
`

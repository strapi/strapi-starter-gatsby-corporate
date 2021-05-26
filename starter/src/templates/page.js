import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import Sections from "@/components/sections"
import SEO from "@/components/seo"

const DynamicPage = ({ data, pageContext }) => {
  const { contentSections, metadata, localizations } = data.strapi.page
  const { global } = data.strapi

  return (
    <>
      <SEO seo={metadata} global={global} />
      <Layout global={global} pageContext={{ ...pageContext, localizations }}>
        <Sections sections={contentSections} />
      </Layout>
    </>
  )
}

export default DynamicPage

export const query = graphql`
  query DynamicPageQuery($id: ID!, $locale: String!) {
    strapi {
      global(locale: $locale) {
        favicon {
          url
        }
        footer {
          id
          columns {
            id
            links {
              id
              newTab
              text
              url
            }
            title
          }
          id
          logo {
            id
            mime
            alternativeText
            url
            id
            mime
            urlSharp {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
          smallText
        }
        id
        metaTitleSuffix
        metadata {
          id
          metaDescription
          metaTitle
          twitterCardType
          twitterUsername
        }
        navbar {
          button {
            id
            newTab
            text
            type
            url
          }
          id
          links {
            url
            text
            newTab
            id
          }
          logo {
            id
            mime
            alternativeText
            url
            id
            mime
            urlSharp {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
        notificationBanner {
          id
          text
          type
        }
      }
      page(id: $id) {
        slug
        shortName
        metadata {
          metaTitle
          metaDescription
          shareImage {
            id
            mime
            url
          }
        }
        localizations {
          id
          locale
        }
        contentSections {
          ... on Strapi_ComponentSectionsBottomActions {
            __typename
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
            __typename
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
            __typename
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
            __typename
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
            __typename
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
                urlSharp {
                  childImageSharp {
                    gatsbyImageData(
                      placeholder: NONE
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
              }
            }
            testimonials {
              id
              logo {
                id
                mime
                url
                urlSharp {
                  childImageSharp {
                    gatsbyImageData(
                      placeholder: NONE
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
                alternativeText
              }
              picture {
                id
                mime
                url
                urlSharp {
                  childImageSharp {
                    gatsbyImageData(
                      layout: FULL_WIDTH
                      transformOptions: { fit: CONTAIN }
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
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
            __typename
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
            __typename
            id
            content
          }
          ... on Strapi_ComponentSectionsPricing {
            __typename
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
            __typename
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
    }
  }
`

import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const NotFoundPage = ({ data }) => {
  const {
    strapi: { global },
    site: {
      siteMetadata: {
        languages: { locales, defaultLocale },
      },
    },
  } = data

  return (
    <Layout
      pageContext={{
        locale: defaultLocale,
        locales,
        defaultLocale,
        slug: "404",
      }}
      global={global}
    >
      <SEO title="404: Not found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const query = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        languages {
          locales
          defaultLocale
        }
      }
    }
    strapi {
      global {
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
    }
  }
`

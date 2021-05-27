import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import Sections from "@/components/sections"
import SEO from "@/components/seo"

const DynamicPage = ({ data, pageContext }) => {
  const { contentSections, metadata, localizations } = data.strapiPage
  const global = data.strapiGlobal

  return (
    <>
      <SEO seo={metadata} />
      <Layout global={global} pageContext={{ ...pageContext, localizations }}>
        <Sections sections={contentSections} />
      </Layout>
    </>
  )
}

export default DynamicPage

export const query = graphql`
  query DynamicPageQuery($id: String!, $locale: String!) {
    strapiGlobal(locale: { eq: $locale }) {
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
          localFile {
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
          localFile {
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
    strapiPage(id: { eq: $id }) {
      slug
      shortName
      metadata {
        metaTitle
        metaDescription
        shareImage {
          localFile {
            publicURL
          }
        }
      }
      localizations {
        id
        locale
      }
      contentSections
    }
  }
`

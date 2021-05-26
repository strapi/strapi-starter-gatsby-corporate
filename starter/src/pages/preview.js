/**
 * You can preview pages with URLs like this:
 * http://localhost:8000/preview/<slug>?secret=<preview-secret>
 * where <preview-secret> is the GATSBY_PREVIEW_SECRET variable defined in your .env config
 * and <slug> is the slug you entered in Strapi for your page
 */

import React, { useState, useEffect } from "react"

import { fetchAPI } from "@/utils/api"

import Sections from "@/components/sections"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

import { useLocation } from "@reach/router"
import { useCookies } from "react-cookie"
import { graphql } from "gatsby"

const PreviewPage = ({ locale, slug, data }) => {
  const [secretPage, setSecretPage] = useState(null)
  const [global, setGlobal] = useState(null)
  const [pageContext, setPageContext] = useState(null)
  const [cookies, setCookie] = useCookies()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const secret = params.get("secret")
  const {
    site: {
      siteMetadata: {
        languages: { locales, defaultLocale },
      },
    },
  } = data
  
  const metaData = secretPage && {
    ...secretPage.metadata,
    metaTitle: `Preview ${secretPage.metadata.metaTitle}`,
  }

  // The user is correctly trying to access the preview page
  if (
    cookies.strapiPreview !== process.env.GATSBY_PREVIEW_SECRET &&
    secret === process.env.GATSBY_PREVIEW_SECRET
  ) {
    setCookie("strapiPreview", process.env.GATSBY_PREVIEW_SECRET, {
      path: '/',
      secure: process.env.NODE_ENV,
      sameSite: "Strict",
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const [data] = await fetchAPI(`/pages?_locale=${locale}&slug=${slug}`)
      setSecretPage(data)

      const context = {
        slug: data.slug,
        id: data.id,
        locale: data.locale,
        localizations: data.localizations,
        locales,
        defaultLocale,
        isPreview: true
      }
      setPageContext(context)

      const globalData = await fetchAPI(`/global?_locale=${locale}`)
      setGlobal(globalData)
    }

    fetchData()
  }, [slug, locales, defaultLocale, locale])

  if (!pageContext || !global) {
    return <div>loading preview...</div>
  }

  if (!cookies.strapiPreview) {
    return (
      <Layout pageContext={pageContext} global={global}>
        <div className="mt-4 text-center">
          You need to turn preview mode on to view this page
        </div>
      </Layout>
    )
  }

  return (
    <>
      <SEO seo={metaData} global={global} />
      <Layout pageContext={pageContext} global={global}>
        {secretPage && (
          <div>
            <Sections sections={secretPage.contentSections} />
          </div>
        )}
      </Layout>
    </>
  )
}

export default PreviewPage

export const query = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        languages {
          locales
          defaultLocale
        }
      }
    }
  }
`

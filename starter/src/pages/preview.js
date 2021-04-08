/**
 * You can preview pages with URLs like this:
 * http://localhost:8000/preview/<slug>?secret=<preview-secret>
 * where <preview-secret> is the PREVIEW_SECRET variable defined in your .env config
 * and <slug> is the slug you entered in Strapi for your page
 */

import React, { useState, useEffect } from "react"

import { fetchAPI } from "@/utils/api"

import Sections from "@/components/sections"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

import { useLocation } from "@reach/router"
import { useCookies } from "react-cookie"

const PreviewPage = ({ slug }) => {
  const [secretPage, setSecretPage] = useState(null)
  const [cookies, setCookie] = useCookies()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const secret = params.get("secret")

  const metaData = secretPage && {
    ...secretPage.metadata,
    metaTitle: `Preview ${secretPage.metadata.metaTitle}`,
  }

  // The user is correctly trying to access the preview page
  if (
    cookies.strapiPreview !== process.env.PREVIEW_SECRET &&
    secret === process.env.PREVIEW_SECRET
  ) {
    setCookie("strapiPreview", process.env.PREVIEW_SECRET, {
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "Strict",
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const [data] = await fetchAPI(`/pages?slug=${slug}`)
      setSecretPage(data)
    }

    fetchData()
  }, [slug])


  if (!cookies.strapiPreview) {
    return (
      <Layout>
        <div className="mt-4 text-center">
          You need to turn preview mode on to view this page
        </div>
      </Layout>
    )
  }

  return (
    <>
      <SEO seo={metaData} />
      <Layout>
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

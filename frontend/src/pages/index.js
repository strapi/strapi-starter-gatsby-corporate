import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "@/components/layout"
import Sections from "@/components/sections"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexPage {
      strapi {
        pages(where: {slug: ""}) {
          ...PageData
        }
      }
    }
  `)

  const sections = data.strapi.pages?.[0].contentSections

  return (
    <Layout>
      <Sections sections={sections} />
    </Layout>
  )
}

export default IndexPage

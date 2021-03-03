import React from "react"

import { getStrapiMedia } from "@/utils/media"
import PropTypes from "prop-types"
import { mediaPropTypes } from "@/utils/types"

import Img from "gatsby-image"

const Image = ({ media, className, fixed, fluid, imgStyle }) => {
  const { url, alternativeText } = media
  const fullUrl = getStrapiMedia(url)

  if (fixed) {
    return (
      <Img fixed={media.urlSharp.childImageSharp.fixed} imgStyle={imgStyle} />
    )
  }

  if (fluid) {
    return (
      <Img
        style={{ height: "100%" }}
        fluid={media.urlSharp.childImageSharp.fluid}
        imgStyle={imgStyle}
      />
    )
  }

  return <img src={fullUrl} alt={alternativeText || ""} className={className} />
}

Image.propTypes = {
  media: mediaPropTypes.isRequired,
  className: PropTypes.string,
}

export default Image

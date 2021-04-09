import React from "react"

import PropTypes from "prop-types"
import { mediaPropTypes } from "@/utils/types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getStrapiMedia } from "../utils/media"

const Image = ({ media, className, style, placeholder }) => {
  const { alternativeText, url } = media

  const image = getImage(media.urlSharp)

  const alt = alternativeText ? alternativeText : "An image uploaded to Strapi"

  // fallback for svg
  if (!image) {
    const imageUrl = getStrapiMedia(url)
    return <img src={imageUrl} alt={alt} className={className} />
  }

  return (
    <GatsbyImage
      className={className}
      placeholder="none"
      style={style}
      image={image}
      alt={alt}
    />
  )
}

Image.propTypes = {
  media: mediaPropTypes.isRequired,
  className: PropTypes.string,
}

export default Image

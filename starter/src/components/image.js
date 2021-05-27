import React from "react"
import PropTypes from "prop-types"
import { mediaPropTypes } from "@/utils/types"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { getStrapiMedia } from "../utils/media"

const Image = ({ media, className, style }) => {
  const isDynamicImage = Boolean(media.localFile)
  const alt = media.alternativeText || "An image uploaded to Strapi"

  if (isDynamicImage) {
    return (
      <GatsbyImage
        className={className}
        placeholder="none"
        style={style}
        image={getImage(media.localFile)}
        alt={alt}
      />
    )
  }

  return (
    <img
      src={getStrapiMedia(media.url)}
      alt={alt}
      style={style}
      className={className}
    />
  )
}

Image.propTypes = {
  media: mediaPropTypes.isRequired,
  className: PropTypes.string,
}

export default Image

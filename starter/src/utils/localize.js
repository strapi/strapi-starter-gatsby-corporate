function localizePath(page) {
  const { locale, defaultLocale, slug, isPreview } = page
  if (isPreview && slug) {
    // The preview requires a prefix
    return `/${locale}/preview/${slug}`
  }

  if (locale === defaultLocale) {
    // The default locale is not prefixed
    return `/${slug}`
  }

  // The slug should have a localePrefix
  return `/${locale}/${slug}`
}

function getLocalizedPaths(page) {
  const paths = page.locales.map(locale => {
    return {
      locale: locale,
      href: localizePath({ ...page, locale }),
    }
  })

  return paths
}

// Use module.exports to acccess these functions in gatsby-node.js
module.exports = {
  localizePath,
  getLocalizedPaths,
}

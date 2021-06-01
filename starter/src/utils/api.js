export function getStrapiURL(path) {
  return `${
    process.env.GATSBY_STRAPI_URL || 'http://localhost:1337'
  }${path}`
}

// Helper to make GET requests to Strapi

export async function fetchAPI(path, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl, mergedOptions)

  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}

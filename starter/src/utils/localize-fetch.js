import { fetchAPI } from "./api"

export async function getLocalizedPage(targetLocale, pageContext) {
  const localization = pageContext.localizations.find(
    localization => localization.locale === targetLocale
  )
  const localePage = await fetchAPI(`/pages/${localization.id}`)
  return localePage
}

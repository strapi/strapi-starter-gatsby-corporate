import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby-link"
import { Link } from "gatsby"
import { getLocalizedPage } from "@/utils/localize-fetch"
import { localizePath } from "@/utils/localize"
import WorldIcon from "@/components/icons/world"
import { MdExpandMore } from "react-icons/md"
import { useCookies } from "react-cookie"

import { useOnClickOutside } from "@/utils/hooks"

const LocaleSwitch = ({ pageContext }) => {
  const isMounted = useRef(false)
  const select = useRef()
  const [cookies, setCookie] = useCookies()
  const [locale, setLocale] = useState(
    cookies.GATSBY_LOCALE || pageContext.locale
  )
  const [showing, setShowing] = useState(false)

  const handleLocaleChange = async selectedLocale => {
    setCookie("GATSBY_LOCALE", selectedLocale, {
      path: "/",
      secure: process.env.NODE_ENV,
      sameSite: "Strict",
    })
    setLocale(selectedLocale)
  }
  const handleLocaleChangeRef = useRef(handleLocaleChange)

  useOnClickOutside(select, () => setShowing(false))

  useEffect(() => {
    // Set the requested locale when no cookie locale is found
    if (!cookies.GATSBY_LOCALE) {
      handleLocaleChangeRef.current(pageContext.defaultLocale)
    }

    const changeLocale = async () => {
      setShowing(false)
      if (
        !isMounted.current &&
        cookies.GATSBY_LOCALE &&
        cookies.GATSBY_LOCALE !== pageContext.locale
      ) {
        // Redirect to locale page if locale mismatch
        const localePage = await getLocalizedPage(
          cookies.GATSBY_LOCALE,
          pageContext
        )
        navigate(localizePath({ ...pageContext, ...localePage }))
      }
    }

    changeLocale()

    return () => {
      isMounted.current = true
    }
  }, [locale, pageContext, cookies.GATSBY_LOCALE])

  return (
    <div ref={select} className="relative ml-4">
      <button
        className="hover:bg-primary-50 hover:text-primary-600 focus:bg-primary-50 focus:text-primary-600 focus:outline-none flex items-center justify-between px-2 py-2 cursor-pointer rounded-md w-20"
        onClick={() => setShowing(!showing)}
      >
        <WorldIcon />
        <span className="capitalize">{locale}</span>
        <MdExpandMore className="ml-1 text-primary-600" />
      </button>
      <div
        className={`w-full bg-white p-1 mt-1 shadow-lg rounded-md ${
          showing ? "absolute" : "hidden"
        }`}
      >
        {pageContext.localizedPaths?.map(({ href, locale }) => {
          return (
            <Link
              to={href}
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              role="option"
            >
              <p className="capitalize hover:bg-primary-50 hover:text-primary-600 h-full cursor-pointer p-2 rounded-md text-center">
                {locale}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default LocaleSwitch

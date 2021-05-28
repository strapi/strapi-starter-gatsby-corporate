import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby-link"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import {
  listLocalizedPaths,
  localizePath,
  getLocalizedPage,
} from "@/utils/localize"
import WorldIcon from "@/components/icons/world"
import { MdExpandMore } from "react-icons/md"
import { useCookies } from "react-cookie"

import { useOnClickOutside } from "@/utils/hooks"

const LocaleSwitch = ({ pageContext }) => {
  const isMounted = useRef(false)
  const select = useRef()
  const location = useLocation()
  const [cookies, setCookie] = useCookies()
  const [locale, setLocale] = useState(
    cookies.GATSBY_LOCALE || pageContext.locale
  )
  const [showing, setShowing] = useState(false)
  const [localizedPaths, setLocalizedPaths] = useState(null)

  const handleLocaleChange = async selectedLocale => {
    setShowing(false)
    setCookie("GATSBY_LOCALE", selectedLocale, {
      path: "/",
      secure: process.env.NODE_ENV,
      sameSite: "Strict",
    })
    setLocale(selectedLocale)
  }

  useOnClickOutside(select, () => setShowing(false))

  useEffect(() => {
    const changeLocale = async () => {
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

    const updateLocalizedPaths = async () => {
      const slugs = await listLocalizedPaths(pageContext)
      setLocalizedPaths(slugs)
    }

    if (!isMounted.current) {
      updateLocalizedPaths()
    }
    changeLocale()

    return () => {
      isMounted.current = true
    }
  }, [location, pageContext, cookies.GATSBY_LOCALE])

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
        {localizedPaths?.map(({ href, locale }) => {
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

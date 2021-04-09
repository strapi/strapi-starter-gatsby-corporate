import React, { useEffect } from "react"
import Hero from "@/components/sections/hero"
import LargeVideo from "@/components/sections/large-video"
import FeatureColumnsGroup from "@/components/sections/feature-columns-group"
import FeatureRowsGroup from "@/components/sections/feature-rows-group"
import BottomActions from "@/components/sections/bottom-actions"
import TestimonialsGroup from "@/components/sections/testimonials-group"
import RichText from "./sections/rich-text"
import Pricing from "./sections/pricing"
import LeadForm from "./sections/lead-form"
import { useCookies } from "react-cookie"
import { navigate } from "gatsby-link"
import { useLocation } from "@reach/router"

// Map Strapi sections to section components
const sectionComponents = {
  Strapi_ComponentSectionsHero: Hero,
  Strapi_ComponentSectionsLargeVideo: LargeVideo,
  Strapi_ComponentSectionsFeatureColumnsGroup: FeatureColumnsGroup,
  Strapi_ComponentSectionsFeatureRowsGroup: FeatureRowsGroup,
  Strapi_ComponentSectionsBottomActions: BottomActions,
  Strapi_ComponentSectionsTestimonialsGroup: TestimonialsGroup,
  Strapi_ComponentSectionsRichText: RichText,
  Strapi_ComponentSectionsPricing: Pricing,
  Strapi_ComponentSectionsLeadForm: LeadForm,
}

const previewComponents = {
  "sections.hero": Hero,
  "sections.large-video": LargeVideo,
  "sections.feature-columns-group": FeatureColumnsGroup,
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.bottom-actions": BottomActions,
  "sections.testimonials-group": TestimonialsGroup,
  "sections.rich-text": RichText,
  "sections.pricing": Pricing,
  "sections.lead-form": LeadForm,
}

const PreviewModeBanner = ({ location }) => {
  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <button
          className="underline"
          onClick={() => {
            // The cookie will be deleted by a useEffect in the Section component
            navigate("/", { state: { prevPath: location.pathname } })
          }}
        >
          Turn off
        </button>
      </div>
    </div>
  )
}

// Display a section individually
const Section = ({ sectionData }) => {
  // Prepare the component
  let SectionComponent
  if (sectionData.__component) {
    SectionComponent = previewComponents[sectionData.__component]
  } else {
    SectionComponent = sectionComponents[sectionData.__typename]
  }

  if (!SectionComponent) {
    return null
  }

  // Display the section
  return <SectionComponent data={sectionData} />
}

// Display the list of sections
const Sections = ({ sections,  }) => {
  const location = useLocation()
  // Ignore unused destructured variable
  // eslint-disable-next-line
  const [cookies, _, removeCookie] = useCookies(["strapiPreview"])

  useEffect(() => {
    // The preview cookie is deleted when state.prevPath exists on location
    if (location.state && location.state.prevPath) {
      removeCookie("strapiPreview", {
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
    }
  }, [location, removeCookie])
  console.log(process.env.GATSBY_PREVIEW_SECRET, cookies.strapiPreview)
  return (
    <div className="flex flex-col">
      {process.env.GATSBY_PREVIEW_SECRET &&
        cookies.strapiPreview === process.env.GATSBY_PREVIEW_SECRET && (
          <PreviewModeBanner location={location} />
        )}
      {sections.map((section, i) => (
        <Section
          sectionData={section}
          key={`${section.__component}${(section.id, i)}`}
        />
      ))}
    </div>
  )
}

export default Sections

import React from "react"
import Hero from "@/components/sections/hero";
import LargeVideo from "@/components/sections/large-video";
import FeatureColumnsGroup from "@/components/sections/feature-columns-group";
import FeatureRowsGroup from "@/components/sections/feature-rows-group";
import BottomActions from "@/components/sections/bottom-actions";
import TestimonialsGroup from "@/components/sections/testimonials-group";
import RichText from "./sections/rich-text";
import Pricing from "./sections/pricing";
import LeadForm from "./sections/lead-form";

// Map Strapi sections to section components
const sectionComponents = {
  "Strapi_ComponentSectionsHero": Hero,
  "Strapi_ComponentSectionsLargeVideo": LargeVideo,
  "Strapi_ComponentSectionsFeatureColumnsGroup": FeatureColumnsGroup,
  "Strapi_ComponentSectionsFeatureRowsGroup": FeatureRowsGroup,
  "Strapi_ComponentSectionsBottomActions": BottomActions,
  "Strapi_ComponentSectionsTestimonialsGroup": TestimonialsGroup,
  "Strapi_ComponentSectionsRichText": RichText,
  "Strapi_ComponentSectionsPricing": Pricing,
  "Strapi_ComponentSectionsLeadForm": LeadForm,
};

// Display a section individually
const Section = ({ sectionData }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__typename];

  if (!SectionComponent) {
    return null;
  }

  // Display the section
  return <SectionComponent data={sectionData} />;
};

// Display the list of sections
const Sections = ({ sections }) => {
  return (
    <div className="flex flex-col">
      {sections.map((section, i) => (
        <Section
          sectionData={section}
          key={`${section.__component}${section.id, i}`}
        />
      ))}
    </div>
  );
};

export default Sections;
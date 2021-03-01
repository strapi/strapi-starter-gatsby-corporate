import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Navbar from "./elements/navbar";
import Footer from "./elements/footer";
import NotificationBanner from "./elements/notification-banner";
import { useState } from "react";

const Layout = ({ children }) => {
  const data = useStaticQuery(globalQuery)
  const { navbar, footer, notificationBanner } = data.strapi.global;

  const [bannerIsShown, setBannerIsShown] = useState(true);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* Aligned to the top */}
      <div className="flex-1">
        {notificationBanner && bannerIsShown && (
          <NotificationBanner
            data={notificationBanner}
            closeSelf={() => setBannerIsShown(false)}
          />
        )}
        <Navbar navbar={navbar} />
        <div>{children}</div>
      </div>
      {/* Aligned to the bottom */}
      <Footer footer={footer} />
    </div>
  );
};

export default Layout;

const globalQuery = graphql`
  query GlobalQuery {
    strapi {
      global {
        footer {
          columns {
            id
            links {
              id
              newTab
              text
              url
            }
            title
          }
          id
          logo {
            alternativeText
            url
          }
          smallText
        }
        id
        metaTitleSuffix
        metadata {
          id
          metaDescription
          metaTitle
          twitterCardType
          twitterUsername
        }
        navbar {
          button {
            id
            newTab
            text
            type
            url
          }
          id
          links {
            url
            text
            newTab
            id
          }
          logo {
            alternativeText
            url
          }
        }
        notificationBanner {
          id
          text
          type
        }
      }
    }
  }
`

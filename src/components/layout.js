/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main>{children}</main>
      {/* footer */}
      <footer className="bg-light text-center " style={{marginTop: `2rem`}}>
        {/* Grid Container */}
        <div className="container p-4">

          {/* Section: Social media */}
          <section className="mb-4">
            {/* Twitter */}
            <a className="btn btn-primary btn-floating m-1" aria-label="Twitter Button" style={{backgroundColor: `#55acee`}} href="https://twitter.com/aJackNelson" role="button"><i className="bi bi-twitter"></i></a>

            {/* Github */}
            <a className="btn btn-primary btn-floating m-1" aria-label="Github Button" style={{backgroundColor: `#333333`}} href="https://github.com/jack60612/mojo-web-calculator.git" role="button"><i className="bi bi-github"></i></a>
          </section>
          {/* Section: Social media */}

          {/* Section: Text */}
          <section className="mb-4">
            <p>
              <a href="https://xchscan.com/graphql-api">Powered by XCHscan.com APIs<br/></a>
              Chia is a registered trademark of Chia Network Inc, who have not endorsed and are not responsible for chiatomojo.com or its content.
            </p>
          </section>
          {/* Section: Text */}

        </div>
        {/* Grid container */}

        {/* Copyright */}
        <div className="text-center p-3" style={{backgroundColor: `rgba(0, 0, 0, 0.2)`}}>
          © {new Date().getFullYear()}
          {` `}
          <a href="https://github.com/jack60612">Jack Nelson <br/> </a>
          <a href="https://www.gatsbyjs.com">Built with Gatsby </a>
        </div>
        {/* Copyright */}

      </footer>
      {/* Footer */}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

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
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          <a href="https://github.com/jack60612">Built by Jack Nelson <br/> </a>
          © {new Date().getFullYear()} Jack Nelson, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby <br/> </a>
          <a href="https://xchscan.com/graphql-api">Powered by XCHscan.com APIs<br/></a>
          <a>Chia is a registered trademark of Chia Network Inc, who have not endorsed and is not responsible for chiatomojo.com or its content.</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

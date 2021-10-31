import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle, siteLogo }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.15rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.1rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <StaticImage
          src="../images/jack-logo.svg"
          width={64}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt="Leaf logo"
        />
        <Link
          to="/"
          style={{
            marginLeft: '0.35rem',
            color: `white`,
            textDecoration: `none`,
            fontSize: `1.25rem`
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

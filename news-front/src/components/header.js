import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, small}) => (

  <>
    <header>

        {!small && (
          <span className="site-title">
            <h1><a href="/news">Uutiset .</a></h1>

          <div className="site-description">Uutisia, hitaammin</div>
        </span>
        )}
        {small && (
          <span className="site-title-small">
            <h1>Uutiset .</h1>
        </span>
        )}    

  </header>
</>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

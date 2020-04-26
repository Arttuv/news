import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, small}) => (

  <div style={{ margin: `0 auto`, maxWidth: `60rem`, padding: `0rem 0rem 0rem` }}>
    <header style={{ width: '100%', display: 'inline-flex', justifyContent: 'center', flexDirection: 'row' }}>
      <span style={{display: 'block'}}></span>

        {!small && (
          <span className="site-title">
            <h1><a href="/">Uutiset .</a></h1>

          <div className="site-description">Uutisia, hitaammin</div>
        </span>
        )}
        {small && (
          <span className="site-title-small">
            <h1>Uutiset .</h1>
        </span>
        )}    

  </header>
</div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

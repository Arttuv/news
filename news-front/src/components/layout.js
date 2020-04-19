/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "./layout.css"

const Layout = ({ children, small }) => {

  return (
    <>
      <Header siteTitle="Uutiset" small={small}/>
      <div className = "page-container">
        <main>{children}</main>
        <footer style={{
          borderTopStyle: `solid`,
          borderTopWidth: `1px`,
          marginTop: '1.5rem',
          minHeight: `100%`,
          paddingTop: `1.5rem`
        }}>
          © {new Date().getFullYear()} Tiimi 
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

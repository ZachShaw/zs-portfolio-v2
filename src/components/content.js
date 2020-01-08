import React from 'react'
import PropTypes from 'prop-types'

import '../styles/content.css'

const Content = ({ children }) => (
  <div id="contentcontainer">
    {children}
  </div>
)

Content.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Content

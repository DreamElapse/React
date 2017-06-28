/**
 * 全局核心公共组件
*/

import React from 'react'
// import './CoreLayout.less'
import '../../styles/core.less'
export const CoreLayout = ({ children }) => (
  <div>
    {children}
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout

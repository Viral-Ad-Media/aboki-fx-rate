import PropTypes from 'prop-types'
import React from 'react'
import DesktopContainer from './DesktopContainer'
import MobileContainer from './MobileContainer'
import {Responsive} from 'semantic-ui-react'


const ResponsiveContainer = ({ children, heading }) => (
    <div>
        <DesktopContainer heading={heading}>{children}</DesktopContainer>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth} >
            <MobileContainer heading={heading}>{children}</MobileContainer>
        </Responsive>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

export default ResponsiveContainer

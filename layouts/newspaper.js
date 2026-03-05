import React from 'react'
import { Segment } from 'semantic-ui-react'
import ResponsiveContainer from './ResponsiveContainer'
import Meta from '../components/meta'
import Footer from '../components/Footer'
import WebNotification from '../components/WebNotification'

const Layout = ({ children, meta, heading }) => (
    <ResponsiveContainer heading={heading}>
        <Meta props={meta} />
        <Segment style={{padding: '8em 0em',backgroundColor: '#f2f3f2'}} vertical>
            <WebNotification />
            {children}
        </Segment>
        <Footer />
    </ResponsiveContainer>
)

export default Layout
import React from 'react'
import { Segment, Grid, Container, Rail, Sticky, Responsive } from 'semantic-ui-react'
import ResponsiveContainer from './ResponsiveContainer'
import Meta from '../components/meta'
import Footer from '../components/Footer'
import WebNotification from '../components/WebNotification'
import getWidth from './utility'
import PostWidget from '../components/PostWidget'
import {NEWS_URL} from '../config'

const Layout = ({ children, meta, heading }) => {   
    return (<ResponsiveContainer heading={heading}>
        <Meta props={meta} />
        <Segment color={'orange'} style={{ backgroundColor: '#1a1c1d', padding: '8em 0em' }} vertical>
            <WebNotification />
            <Container>
                <Grid centered columns={1} reversed>
                    <Grid.Column mobile='sixteen' computer='thirteen' floated='right'>
                        {children}
                        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                        <Rail position='left' attached>
                            <Sticky>
                                <Container>
                                    <PostWidget size={3} position={1} title page={NEWS_URL} />
                                </Container>
                            </Sticky>
                        </Rail>
                        </Responsive>
                    </Grid.Column>
                </Grid >
            </Container>
        </Segment>
        <Footer />
    </ResponsiveContainer>)
}


export default Layout
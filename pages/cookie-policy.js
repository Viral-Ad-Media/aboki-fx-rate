import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import Layout from '../layouts/default'

const meta = {
    title: 'AbokiFxRate - Cookie Policy',
    description: 'Cookie policy for AbokiFxRate.'
}

export default () => (
    <Layout meta={meta}>
        <Container style={{ paddingBottom: '50px' }}>
            <Header as='h1' content='Cookie Policy' inverted textAlign='center' />
            <p style={{ textAlign: 'center' }}>
                This page explains how cookies are used to improve your experience on AbokiFxRate.
            </p>
        </Container>
    </Layout>
)


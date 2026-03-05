import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import Layout from '../layouts/default'

const meta = {
    title: 'AbokiFxRate - Privacy Policy',
    description: 'Privacy policy for AbokiFxRate.'
}

const PrivacyPage = () => (
    <Layout meta={meta}>
        <Container style={{ paddingBottom: '50px' }}>
            <Header as='h1' content='Privacy Policy' inverted textAlign='center' />
            <p style={{ textAlign: 'center' }}>
                This page explains how AbokiFxRate handles and protects user information.
            </p>
        </Container>
    </Layout>
)

export default PrivacyPage

import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import Layout from '../layouts/default'

const meta = {
    title: 'AbokiFxRate - Legal',
    description: 'Legal information for AbokiFxRate.'
}

const LegalPage = () => (
    <Layout meta={meta}>
        <Container style={{ paddingBottom: '50px' }}>
            <Header as='h1' content='Legal' inverted textAlign='center' />
            <p style={{ textAlign: 'center' }}>
                This page provides legal notices and terms for using AbokiFxRate.
            </p>
        </Container>
    </Layout>
)

export default LegalPage

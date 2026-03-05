import React from 'react'
import Layout from '../../layouts/newspaper'
import { Link } from '../../routes'
import { docAPI } from '../../api'
import PostWidget from '../../components/PostWidget'


import {
    Container,
    Header,
    Button,
    Divider,
} from 'semantic-ui-react'

const meta = {
    title: 'AbokiFxRate - The World"s Trusted Currency Authority',
    description: 'Index description'
}


const HomePage = ({ post }) => {
    const safePost = post && post.data ? post : {
        uid: '',
        data: {
            og_image: { url: '' },
            title: [{ text: '' }]
        }
    }

    const RenderHeader = () => (
        <Container style={{
            backgroundImage: `url(${safePost.data.og_image && safePost.data.og_image.url ? safePost.data.og_image.url : ''})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            minHeight: 'inherit'
        }} fluid>
            <div style={{
                display: 'inlineBlock',
                textAlign: 'center',
                position: 'relative',
                top: '200px',
            }}>
                <Header as='h1'
                    subheader='Published by AbokiFx' content={safePost.data.title && safePost.data.title.length ? safePost.data.title[0].text : ''} inverted
                />
                {safePost.uid ? (
                    <Link route='news' params={{ 'slug': safePost.uid }}>
                        <Button style={{marginTop: '100px'}} color='orange' content='Read More' />
                    </Link>
                ) : (
                    <Button style={{marginTop: '100px'}} color='orange' content='Read More' disabled />
                )}
                <div style={{paddingTop: '100px'}}>
                    <Button color='orange' icon='angle double down' disabled/>
                </div>
            </div>
        </Container>
    )
    return (
        <Layout meta={meta} heading={<RenderHeader />}>
            <Container style={{ paddingBottom: '50px' }}>
                <Divider content='Nigerian Newspapers' horizontal style={{paddingBottom: '50px'}} />
                <PostWidget />
            </Container>
        </Layout>
    )
}

HomePage.getInitialProps = async () => {
    const response = await docAPI({ pageSize: 1 }, 'news')
    return {
        post: response.results && response.results[0] ? response.results[0] : null
    }
}

export default HomePage


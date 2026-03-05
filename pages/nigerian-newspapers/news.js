import React from 'react'
import { RichText } from 'prismic-reactjs'
import {
    Container,
    Header,
    Grid,
    Responsive,
    Sticky,
    Rail,
    Segment
} from 'semantic-ui-react'

import Layout from '../../layouts/newspaper'
import getWidth from '../../layouts/utility'
import SocialShareWidget from '../../components/SocialShareWidget'
import { newsPostAPI } from '../../api'
import { linkResolver } from '../../helpers'
import { DEFAULT_SEO, NEWS_URL } from '../../config'

class NewsPost extends React.Component {
    static async getInitialProps({ query }) {
        const { slug } = query
        const response = await newsPostAPI(slug)
        return {
            post: response
        }
    }

    addJSONLD(post, info, url) {
        const headline = post.og_title && post.og_title.length ? post.og_title[0].text : ''
        const description = post.og_description && post.og_description.length ? post.og_description[0].text : ''
        const imageUrl = post.og_image && post.og_image.url ? post.og_image.url : ''

        const schema = {
            '@context': 'http://schema.org',
            '@type': 'NewsPosting',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': url
            },
            headline,
            image: imageUrl ? [imageUrl] : [],
            datePublished: info.first_publication_date,
            dateModified: info.last_publication_date || info.first_publication_date,
            author: {
                '@type': 'Organization',
                name: 'AbokiFX Rate'
            },
            publisher: {
                '@type': 'Organization',
                name: 'AbokiFX Rate',
                logo: {
                    '@type': 'ImageObject',
                    url: `${DEFAULT_SEO.openGraph.url}/static/assets/android-chrome-512x512.png`
                }
            },
            description
        }

        return { __html: JSON.stringify(schema) }
    }

    renderHeader(post) {
        return (
            <Container style={{
                backgroundImage: `url(${post.og_image && post.og_image.url ? post.og_image.url : ''})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
                minHeight: 'inherit'
            }} fluid>
            </Container>
        )
    }

    render() {
        const info = this.props.post
        const post = info && info.data ? info.data : null

        if (!post) {
            return (
                <Layout meta={{ title: 'News Post', description: 'News post not found' }}>
                    <Container style={{ paddingBottom: '50px' }}>
                        <Header as='h1' textAlign='center' content='News post not found' />
                    </Container>
                </Layout>
            )
        }

        const title = post.title && post.title.length ? post.title[0].text : 'AbokiFX News'
        const description = post.og_description && post.og_description.length ? post.og_description[0].text : 'Nigerian news from AbokiFX'
        const url = `${DEFAULT_SEO.openGraph.url}/${NEWS_URL}/${info.uid}`
        const meta = {
            title,
            description
        }

        return (
            <Layout meta={meta} heading={this.renderHeader(post)}>
                <Container style={{ paddingBottom: '50px' }}>
                    <Grid centered columns={1} reversed>
                        <Grid.Column mobile='sixteen' computer='thirteen' floated='right'>
                            <Header content={title} as='h1' textAlign='center' />
                            <Segment padded>
                                <article>
                                    {RichText.render(post.body || [], linkResolver)}
                                </article>
                            </Segment>
                            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                                <Rail position='left' attached='bottom'>
                                    <Sticky>
                                        <Segment padded vertical size='massive'>
                                            <SocialShareWidget
                                                content={description}
                                                linkID={info.uid}
                                            />
                                        </Segment>
                                    </Sticky>
                                </Rail>
                            </Responsive>
                        </Grid.Column>
                    </Grid>
                </Container>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={this.addJSONLD(post, info, url)}
                />
            </Layout>
        )
    }
}

export default NewsPost

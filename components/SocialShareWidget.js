import React from 'react'
import { List, Container } from 'semantic-ui-react'
import { Twitter, Facebook, Linkedin, Whatsapp } from 'react-social-sharing'
import { NEWS_URL, DEFAULT_SEO } from '../config'

const getBaseUrl = () => {
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
        return window.location.origin
    }
    return DEFAULT_SEO.openGraph.url
}

const SocialShareWidget = ({ linkID = '', page, content, horizontal = false }) => {
    const pageRoute = page || NEWS_URL
    const pageArgs = linkID ? `/${pageRoute}/${linkID}` : `/${pageRoute}`
    const link = `${getBaseUrl()}${pageArgs}`
    return (
        <Container textAlign='center'>
            <List horizontal={horizontal}>
                <List.Item>
                    <List.Content>
                        <Facebook
                            small
                            link={link}
                            message={content}
                            simpleReverse={horizontal}
                        />
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <Whatsapp
                            small
                            link={link}
                            message={content}
                            simpleReverse={horizontal}
                        />
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <Twitter
                            small
                            link={link}
                            message={content}
                            simpleReverse={horizontal}
                        />
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <Linkedin
                            small
                            link={link}
                            message={content}
                            simpleReverse={horizontal}
                        />
                    </List.Content>
                </List.Item>
            </List>
        </Container>
    )
}


export default SocialShareWidget


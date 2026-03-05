import React from 'react'
import { Image, Card, Header, Divider } from 'semantic-ui-react'
import SocialShareWidget from './SocialShareWidget'
import { docAPI } from '../api'
import { Link } from '../routes'
import TextTruncate from 'react-text-truncate'


class NewsWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = { newsPosts: [] }
    }

    async componentDidMount() {
        const response = await docAPI({ pageSize: (this.props.size || 5), page: (this.props.position || 1) }, 'news')
        this.setState({ newsPosts: response.results || [] })
    }

    render() {
        return (
            <Card.Group centered stackable>
                {this.props.title ?
                    <Divider horizontal
                        content={this.state.newsPosts.length ? 'Latest Nigerian News' : ''} inverted
                    /> : ''}
                {this.state.newsPosts.map((news) => (

                    <Card
                        key={news.id}
                        link
                        image={
                        <Link route='news'
                            params={{ slug: news.uid }}>
                            <Image src={(news.data && news.data.og_image ? news.data.og_image.url : '/static/newspaper-placeholder.png')} height={200} /></Link>}
                        header={<Header as='h4' content={news.data && news.data.title && news.data.title.length ? news.data.title[0].text : ''} textAlign='center' style={{ color: '#fff' }} />}
                        meta={<span style={{ color: 'white' }}>
                            <TextTruncate
                                line={2}
                                truncateText=". . ."
                                text={news.data && news.data.og_description && news.data.og_description.length ? news.data.og_description[0].text : ''}
                            />
                        </span>}
                        style={{ backgroundColor: 'rgb(242, 113, 28)' }}
                        extra={
                            <SocialShareWidget
                                linkID={news.uid}
                                content={news.data && news.data.og_description && news.data.og_description.length ? news.data.og_description[0].text : ''}
                                horizontal
                                page={this.props.page}
                            />
                        }
                    />
                ))}
            </Card.Group>
        )
    }
}


export default NewsWidget


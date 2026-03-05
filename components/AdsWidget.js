import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { docAPI } from '../api'

export default class AdsWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = { adPosts: [] }
    }

    async componentDidMount() {
        const response = await docAPI({ pageSize: this.props.size || 2 }, 'ads')
        this.setState({ adPosts: response.results || [] })
    }

    render() {
        return (
            <Card.Group centered>
                {this.state.adPosts.map(ad => (
                    <Card
                        key={ad.id}
                        href={ad.data && ad.data.content_link ? ad.data.content_link.url : '#'}
                        link
                        color='orange'
                    >
                    {((ad.data && ad.data.slices && ad.data.slices[0] && ad.data.slices[0].items) || []).map((item, itemKey) => {
                        const imageSrc = item.embed_link && item.embed_link.embed_url
                            ? item.embed_link.embed_url
                            : (item.image ? item.image.url : '')
                        return (
                            <Image
                                key={`${ad.id}-${itemKey}`}
                                src={imageSrc}
                            />
                        )
                    })}
                    </Card>
                ))}
            </Card.Group>
        )
    }
}

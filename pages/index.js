import React from 'react'
import Layout from '../layouts/default'
import {
    Grid,
    Image,
    Container,
    Label,
    Responsive,
    Card,
} from 'semantic-ui-react'
import FxComparismWidget from '../components/FxComparismWidget'
import HomepageHeading from '../components/Heading'
import getWidth from '../layouts/utility'
import { docAPI } from '../api'
import AdsWidget from '../components/AdsWidget'
import CardCarousel from '../components/CardCarousel'
import "pure-react-carousel/dist/react-carousel.es.css"

const meta = {
    title: 'AbokiFxRate | Your daily Naira exchange rate',
    description: 'Aboki FX Live Daily Naira to Dollar Exchange Rates. AbokiFX Daily dollar rate,  Naira to Euro, Naira to Pounds, with live foreign exchange rate calculator on AbokiFX.'
}

const Home = (props) => {
    const data = (props.landing && props.landing.data) ? props.landing.data : { slices: [] }
    return (
        <Layout meta={meta} heading={<HomepageHeading />}>
            <Responsive as={Container} getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <FxComparismWidget />
            </Responsive>
            <Container color={'black'}>
                <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
                    <CardCarousel />
                </Responsive>
                <Grid stackable>
                    <Grid.Row columns={2}>
                        {data.slices.map((slice, key) => {
                            switch (slice.slice_type) {
                                case 'simple_card': {
                                    const headerText = slice.primary && slice.primary.simple_card_header && slice.primary.simple_card_header.length
                                        ? slice.primary.simple_card_header[0].text
                                        : ''
                                    const imageUrl = slice.primary && slice.primary.simple_card_image ? slice.primary.simple_card_image.url : ''
                                    return (
                                        <Grid.Column key={`${slice.slice_type}-${key}`}>
                                            <Card color='orange' fluid >
                                                <Image src={imageUrl} alt={headerText} />
                                                <Card.Content>
                                                    <Card.Header as={Label} color='orange' textAlign='center'>
                                                        {headerText}
                                                    </Card.Header>
                                                </Card.Content>
                                                <Card.Content textAlign='center'>
                                                    {slice.items.map((item, itemKey) => <Label style={{ margin: '5px' }} key={`${item.simple_card_meta}-${itemKey}`} color='black'>{item.simple_card_meta}</Label>)}
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    )
                                }
                                default:
                                    return null
                            }
                        })}
                    </Grid.Row>

                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <AdsWidget size={3} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Layout>
    )
}

Home.getInitialProps = async () => {
    const response = await docAPI({}, 'landing');
    const landing = response.results && response.results[0] ? response.results[0] : { data: { slices: [] } };
    return {
        landing
    }
}


export default Home

import React from 'react'
import Layout from '../layouts/default'
import {
    Grid,
    Container,
    Header,
    List,
    Icon
} from 'semantic-ui-react'

const meta = {
    title: 'AbokiFxRate - The World"s Trusted Currency Authority',
    description: 'Index description'
}

class AboutPage extends React.Component {
    render() {
        return (
            <Layout meta={meta}>
                <Container style={{paddingBottom:'50px'}}>
                    <Header content='About Us' subheader='AbokiFX. Powering you.' as='h1' inverted textAlign='center'/>
                    <p style={{textAlign: 'center'}}>
                        We give you the power of our most up to date, reputable currency information and offer you <br />
                        secure, reliable, easy to use products and services dedicated to making your life easier.
                    </p>
                </Container>
                <Container color={'black'} style={{paddingBottom:'50px'}}>
                    <Grid celled='internally' stackable>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <div style={{ textAlign: 'center' }}>
                                    <Icon name='globe' size='massive' color={'orange'} />
                                </div>

                                <Header as='h1' textAlign='center' color={'orange'} style={{ fontWeight: 'lighter' }} content='Proudly Serving Our Clients Since 1993' />
                                <Header as='h2' textAlign='center'>
                                    <List inverted>
                                        <List.Item style={{ color: '#fff' }}>World's Trusted Currency Authority</List.Item>
                                        <List.Item style={{ color: '#fff' }}>280 million visitors a year</List.Item>
                                        <List.Item style={{ color: '#fff' }}>65 million app downloads</List.Item>
                                    </List>
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ textAlign: 'center' }}>
                                    <Icon name='cloud' size='massive' color={'orange'} />
                                </div>

                                <Header as='h1' color={'orange'} textAlign='center' style={{ fontWeight: 'lighter' }} content='AbokiFxRate Currency Converter' />
                                <Header as='h2' textAlign='center'>
                                    <List>
                                        <List.Item style={{ color: '#fff' }}>Accurate rates for businesses</List.Item>
                                        <List.Item style={{ color: '#fff' }}>Flexible comparison</List.Item>
                                        <List.Item style={{ color: '#fff' }}>Simple interface</List.Item>
                                    </List>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                <Container>
                    <Header content='Our Culture' as='h1' textAlign='center' inverted/>
                    <p style={{textAlign: 'center'}}>
                    Our culture reflects our philosophy of respect, simplify, and solve. Success is a result of our 
                    talented and dedicated team who live and exemplify our philosophy. The AbokiFX team expects great 
                    things of each other, treat each other well, and are committed to creating the best foreign 
                    exchange solutions for the world. A 40-hour work week with flex time and health benefits, 
                    plus an on-site gym and games room, and catered lunches every Friday supports AbokiFX employees 
                    with a relaxed but fun and motivated atmosphere.
                    </p>
                </Container>
            </Layout>
        )
    }
}

export default AboutPage

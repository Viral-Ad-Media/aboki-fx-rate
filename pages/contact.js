import React from 'react'
import Layout from '../layouts/default'
import {
    Grid,
    Container,
    Tab,
    Header,
    List,
    Icon
} from 'semantic-ui-react'

const meta = {
    title: 'AbokiFxRate - The World"s Trusted Currency Authority',
    description: 'Index description'
}

class ContactPage extends React.Component {
    constructor(props) {
        super(props)
        this.renderGeneralInfo = this.renderGeneralInfo.bind(this)
    }

    renderGeneralInfo() {
        return (
            <List relaxed inverted>
                <List.Item>
                    <List.Icon name='envelope open outline' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>Phone: 1 (877) 588-3214</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='building' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>7001 Hwy 6 South</List.Header>
                        <List.Description as='a'> 240 Houston,Texas .77083</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon name='clock' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>9:00 am to 5:00 pm (09h00 - 17h00)</List.Header>
                        <List.Description as='a'>Eastern Time (New York Time)</List.Description>
                    </List.Content>
                </List.Item>
            </List>
        )
    }
    render() {
        return (
            <Layout meta={meta}>
                <Container style={{ paddingBottom: '50px' }}>
                    <Header content='Contact Us' subheader='AbokiFX. Powering you.' as='h1' inverted textAlign='center' />
                    <p style={{ textAlign: 'center' }}>
                        At AbokiFX, we have a strong commitment to providing quality support. Our multilingual staff can provide support in <br />
                        English, French, and Spanish. If you have any questions, concerns, or need help, email, phone, or mail us!
                    </p>
                </Container>
                <Container>
                    <Tab panes={
                        [
                            { menuItem: "General AbokiFX Information", render: this.renderGeneralInfo },
                            { menuItem: "AbokiFX Currency Data", render: this.renderGeneralInfo },
                        ]
                    } />
                </Container>
                <Container color={'black'} style={{ paddingBottom: '50px' }}>
                    <Grid celled='internally'>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <div style={{ textAlign: 'center' }}>
                                    <Icon name='globe' size='massive' color={'orange'} />
                                </div>

                                <Header as='h1' color={'orange'} style={{ fontWeight: 'lighter' }} content='Proudly Serving Our Clients Since 1993' />
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
                    <Header content='Our Culture' as='h1' textAlign='center' inverted />
                    <p style={{ textAlign: 'center' }}>
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

export default ContactPage

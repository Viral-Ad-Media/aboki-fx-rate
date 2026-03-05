import React from 'react'
import {
    Segment,
    Container,
    Grid,
    Header,
    List,
} from 'semantic-ui-react'

export default () => {
    return (<Segment inverted color={'orange'} vertical style={{ padding: '5em 0em' }}>
    <Container>
        <Grid divided inverted stackable>
            <Grid.Row>
                <Grid.Column width={6}>
                    <Header inverted as='h4' content='AbokiFX Rate' />
                    <List link inverted>
                        <List.Item as='a' href='/privacy'>Privacy</List.Item>
                        <List.Item as='a' href='/cookie-policy'>Cookie Policy</List.Item>
                        <List.Item as='a' href='/legal'>Legal</List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Header inverted as='h4' content='Services' />
                    <List link inverted>
                        <List.Item as='a'>Currency Conversion</List.Item>
                        <List.Item as='a'>Realtime FX Rate</List.Item>
                        <List.Item as='a'>BDC Rate</List.Item>
                        <List.Item as='a'>ATM Rate</List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Header as='h4' inverted>
                        About
                    </Header>
                    <p>
                        We give you the power of our most up to date, reputable currency information and offer you secure,
                        reliable, easy to use products and services dedicated to making your life easier.
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16} textAlign={'center'}>
                    <List horizontal relaxed size={'big'}>
                        <List.Item>AbokiFX Rate &copy; {new Date().getFullYear()}</List.Item>
                        <List.Item>
                            <a href='https://www.facebook.com/AbokiFx-Rate-305191360158341/?modal=admin_todo_tour' target='_blank' rel='noopener noreferrer'>
                                <List.Icon name='facebook f' circular color={'black'} />
                            </a>
                        </List.Item>
                        <List.Item>
                            <a href='https://twitter.com/AbokifxR' target='_blank' rel='noopener noreferrer'>
                                <List.Icon name='twitter' circular color={'black'} />
                            </a>
                        </List.Item>
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
</Segment>
)}

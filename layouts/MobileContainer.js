import React, { Component, createRef } from 'react'
import {
    Image,
    Icon,
    Menu,
    Ref,
    Segment,
    Sidebar,
} from 'semantic-ui-react'
import {Link} from '../routes'

import Navbar from '../components/navbar'

export default class MobileContainer extends Component {
    state = {}
    segmentRef = createRef()

    handleShowClick = () => this.setState({ visible: true })

    handleSidebarHide = () => this.setState({ visible: false })

    render() {
        const { visible } = this.state
        const { children } = this.props

        return (
            <span>
                <Menu inverted pointing secondary size='large' style={{ backgroundColor:'#000', margin: '0px', border: 'none'}}>
                    <Menu.Item onClick={this.handleShowClick}>
                        <Icon name='sidebar' size='big' color='white' inverted />
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Link href='/'>
                            <Image src='/static/assets/logo-old.png' alt='AbokiFX Rate logo' size='small' />
                        </Link>
                    </Menu.Item>
                </Menu>

                <Sidebar.Pushable as={'span'}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={this.handleSidebarHide}
                        vertical
                        target={this.segmentRef}
                        visible={visible}
                        width='thin'
                    >
                    <Navbar />
                    </Sidebar>
                    <Ref innerRef={this.segmentRef}>
                        <Segment style={{ backgroundColor: '#000', margin: '0', border: 'none', borderRadius: 'none' }}>
                        {this.props.heading}
                        </Segment>
                    </Ref>

                    {children}
                </Sidebar.Pushable>
            </span>
        )
    }
}

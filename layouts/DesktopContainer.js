import PropTypes from 'prop-types'
import React from 'react'
import {
    Container,
    Menu,
    Image,
    Responsive,
    Segment,
    Visibility,
} from 'semantic-ui-react'
import { Link } from '../routes'
import getWidth from './utility'
import Navbar from '../components/navbar'

class DesktopContainer extends React.Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children } = this.props
        const { fixed } = this.state

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        style={{
                            minHeight: this.props.heading ? 600 : 0,
                            padding: '0em 0em',
                            backgroundColor: '#000',
                            margin: '0' 
                        }}
                        textAlign='center'
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            pointing={!fixed}
                            inverted
                            borderless
                            style={{margin: '0 0'}}
                        >
                            <Container>
                                <Menu.Item>
                                    <Link href='/' prefetch passHref>
                                        <Image src='/static/assets/logo-old.png' alt='AbokiFX Rate logo' inline size='small' />
                                    </Link>
                                    <span style={{ color: 'grey', fontWeight: 'thin', textTransform: 'uppercase', fontFamily: '' }}>
                                        Your daily Naira to dollar exchange rate
                                    </span>
                                </Menu.Item>
                                <Navbar position='right' />
                            </Container>
                        </Menu>
                        {this.props.heading}
                    </Segment>
                </Visibility>

                {children}
                <Menu
                    fixed='bottom'
                    borderless
                    size='tiny'
                    compact
                    fluid
                    color='orange'
                    inverted
                >
                    <Menu.Item as='span' fitted style={{ pointerEvents: 'none' }}>
                        <iframe
                            title='Desktop exchange ticker'
                            src="//www.exchangerates.org.uk/widget/ER-LRTICKER.php?w=2990&s=1&mc=GBP&mbg=F2711C&bs=no&bc=000000&f=verdana&fs=10px&fc=FFFFFF&lc=FFFFFF&lhc=FFFFFF&vc=FFFFFF&vcu=FFFFFF&vcd=FFFFFF&"
                            width="2990" height="20" frameBorder="0" scrolling="no" marginWidth="0" marginHeight="0">
                        </iframe>
                    </Menu.Item>
                </Menu>
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

export default DesktopContainer

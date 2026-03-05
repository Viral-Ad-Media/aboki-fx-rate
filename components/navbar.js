import React from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { Link } from '../routes'

export default ({ position }) => (
    <React.Fragment>
        <Menu.Menu position={position}>
            <Menu.Item>
                <Link href="/" passHref prefetch>
                    <Header color='orange'>Home</Header>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/about" passHref prefetch>
                    <Header color='orange'>About</Header>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/arabic-rates" passHref prefetch>
                    <Header color='orange'>سعرالدولاراليم</Header>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href="/contact" passHref prefetch>
                    <Header color='orange'>Contact</Header>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link route="news-home" passHref prefetch>
                    <Header color='orange'>Nigerian News</Header>
                </Link>
            </Menu.Item>
        </Menu.Menu>
    </React.Fragment>
)


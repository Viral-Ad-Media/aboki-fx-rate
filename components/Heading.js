import PropTypes from 'prop-types'
import React from 'react'
import {
    Container,
    Header,
    Responsive, 
    Grid,
    Rail,
    Sticky
} from 'semantic-ui-react'
import ConversionForm from './conversions/ConversionForm'
import NewsWidget from '../components/PostWidget'
import {NEWS_URL} from '../config'
import getWidth from '../layouts/utility'


const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            content="AbokiFX Rate #1 Trusted Currency Authority"
            color={'orange'}
            subheader="Over 176 Currencies Supported"
            inverted
            style={{
                fontSize: getWidth() > Responsive.onlyMobile.maxWidth ? '2em' : '1em',
                fontWeight: 'normal',
                marginBottom: '2em',
                marginTop: mobile ? '1em' : '1.5em',
            }}
            textAlign='center'
        />
        <Responsive {...Responsive.onlyWidescreen}>
        <span style={{ pointerEvents: 'none' }}>
            <iframe
                title='Live exchange ticker'
                src="//www.exchangerates.org.uk/widget/ER-LRTICKER.php?w=490&s=1&mc=GBP&mbg=F2711C&bs=no&bc=000000&f=verdana&fs=10px&fc=FFFFFF&lc=FFFFFF&lhc=FFFFFF&vc=FFFFFF&vcu=FFFFFF&vcd=FFFFFF&"
                width="650" height="30" frameBorder="0" scrolling="no" marginWidth="0" marginHeight="0">
            </iframe>
        </span>
        </Responsive>
        <span
            style={{ borderRadius: '5px 5px 0px 0px ', minHeight: '260px', paddingTop: '0px', backgroundColor: 'rgba(0,0,0,.1)' }}
        >
        <Grid centered columns={1} reversed>
                    <Grid.Column mobile='sixteen' computer='fifteen' floated='left'>
                    <Header color={'orange'} content="AbokiFx Free Currency Converter" style={{textAlign:'center', fontWeight: 'bolder', marginBottom: '25px', fontSize: getWidth() > Responsive.onlyMobile.maxWidth ? '2em' : '1em' }} />
                    <ConversionForm />
                        <Responsive minWidth={Responsive.onlyComputer.minWidth}>
                        <Rail position='right' attached>
                            <Sticky>
                                <Container>
                                    <NewsWidget size={1} page={NEWS_URL} title />
                                </Container>
                            </Sticky>
                        </Rail>
                        </Responsive>
                    </Grid.Column>
                </Grid >
        {/* <NewsWidget /> */}
            
        </span>
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool
}

export default HomepageHeading

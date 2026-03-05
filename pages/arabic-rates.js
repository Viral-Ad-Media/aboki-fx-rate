import React from 'react'
import Layout from '../layouts/default'
import {
    Container,
    Header,
} from 'semantic-ui-react'

const meta = {
    title: 'AbokiFxRate - The World"s Trusted Currency Authority سعرالدولاراليم',
    description: 'سعرالدولاراليم :اضغط لسعر الدلار اليوم اسعر الدولار اليوم لشراء وبيع دولار اسعار الدولار دولار لايف سعر الدولار فى مصر سعر الدولار الان'
}

class ArabiRates extends React.Component {
    render() {
        return (
            <Layout meta={meta}>
                <Container style={{paddingBottom:'50px'}}>
                    <Header content='سعرالدولاراليم' subheader='سعرالدولاراليم :اضغط لسعر الدلار اليوم اسعر الدولار اليوم لشراء وبيع دولار اسعار الدولار دولار لايف سعر الدولار فى مصر سعر الدولار الان' as='h1' inverted textAlign='right'/>
                    <h3></h3>
                    <iframe id="iframe" title='Arabic rates widget' src="https://eldolar.live/ar/widget" width="100%" height="490" frameBorder="0"></iframe><br/>
                </Container>      
            </Layout>
        )
    }
}

export default ArabiRates

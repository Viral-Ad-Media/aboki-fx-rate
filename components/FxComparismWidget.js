import React from 'react'
import {
    Segment,
    Table,
    Header,
    Checkbox,
    Icon,
    Flag,
} from 'semantic-ui-react'
const fxpair = require('../fx.json')
const fxCurrencies = require('../supported-currencies.json')

class FxComparismWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "fxRate": Object.entries(fxpair.results),
            "defaultFX": ['EUR', 'USD', 'AED', 'AUD', 'CAD'],
        }
        this.renderFxDataListHeader = this.renderFxDataListHeader.bind(this)
        this.renderFxDataListbody = this.renderFxDataListbody.bind(this)
    }

    renderFxDataListHeader() {
        const currencySymbols = Object.entries(fxCurrencies.results).filter(currency => {
            return this.state.defaultFX.includes(currency[0].split('_')[0])
        }).map( currency=> currency[1])
        return currencySymbols.map(currency => {
            let currencyId = currency.id ? currency.id.slice(0, 2).toLowerCase() : ''
            return (
                <Table.HeaderCell key={currency.id} style={{borderBottom: 'none'}}>
                    <Icon children={<Flag name={currencyId} />} circular color='orange'/>
                    <br/>
                    <Header color={'orange'} content={`1 ${currency.id}`} as='h2' />
                </Table.HeaderCell>
            )
        })
    }

    renderFxDataListbody() {
        const fxRates = this.state.fxRate.filter(key => this.state.defaultFX.includes(key[0].split('_')[0]))
        return fxRates.map(fxPair => (<Table.Cell key={fxPair[0]}>
                <Header color='orange' as='h2' content={Number.parseFloat(fxPair[1].val).toFixed(2)} />
            </Table.Cell>)
        )
    }

    render() {
        return (<Segment color='orange' padded style={{marginBottom: '100px'}}>
            <Header color='orange' content='AbokiFx Live Exchange Rates' as='h1' />
            <Table padded definition size={'large'} style={{border: 'none'}}>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell style={{backgroundColor: 'transparent', boxShadow: 'none'}} />
                        {this.renderFxDataListHeader()}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row textAlign='center'>
                        <Table.Cell>
                           <Checkbox label='NGN' slider defaultChecked style={{color: 'orange'}} />
                        </Table.Cell>
                        {this.renderFxDataListbody()}
                    </Table.Row>
                </Table.Body>
            </Table>
        </Segment>)
    }
}

export default FxComparismWidget

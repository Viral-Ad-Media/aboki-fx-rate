import React from 'react'
import {
    Input,
    Label,
    Form,
    Header,
    Dropdown,
    Tab,
    Segment
} from 'semantic-ui-react'

const currenciesJson = require('../../supported-currencies.json')
const fxJson = require('../../fx.json')

const fxRates = fxJson.results || {}
const allowedCurrencyCodes = [...new Set(Object.keys(fxRates).map(key => key.split('_')[0]).concat('NGN'))]
const currencyOptions = Object.entries(currenciesJson.results || {})
    .filter(([code]) => allowedCurrencyCodes.includes(code))
    .map(([code, currency]) => ({
        key: code,
        text: currency.currencyName,
        value: code
    }))

const rateToNGN = currencyCode => {
    if (currencyCode === 'NGN') {
        return 1
    }

    const rate = fxRates[`${currencyCode}_NGN`]
    return rate ? Number.parseFloat(rate.val) : null
}

const getConversionRates = (fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) {
        return { fromTo: 1, toFrom: 1 }
    }

    const directPair = fxRates[`${fromCurrency}_${toCurrency}`]
    if (directPair && directPair.val) {
        const directValue = Number.parseFloat(directPair.val)
        return { fromTo: directValue, toFrom: 1 / directValue }
    }

    const fromToNGN = rateToNGN(fromCurrency)
    const toToNGN = rateToNGN(toCurrency)

    if (!fromToNGN || !toToNGN) {
        return { fromTo: 0, toFrom: 0 }
    }

    const derivedRate = fromToNGN / toToNGN
    return { fromTo: derivedRate, toFrom: 1 / derivedRate }
}

class ConversionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toCurrencyID: 'NGN',
            fromCurrencyID: 'USD',
            fromToConversionRate: 0,
            toFromConversionRate: 0,
            amount: '0'
        }
    }

    componentDidMount() {
        this.updateRates(this.state.fromCurrencyID, this.state.toCurrencyID)
    }

    updateRates = (fromCurrencyID, toCurrencyID) => {
        const rates = getConversionRates(fromCurrencyID, toCurrencyID)
        this.setState({
            fromCurrencyID,
            toCurrencyID,
            fromToConversionRate: rates.fromTo,
            toFromConversionRate: rates.toFrom
        })
    }

    handleChange = (event, data) => {
        const { name, value } = data
        if (name === 'amount') {
            this.setState({ amount: value })
            return
        }

        if (name === 'fromCurrencyID') {
            this.updateRates(value, this.state.toCurrencyID)
            return
        }

        if (name === 'toCurrencyID') {
            this.updateRates(this.state.fromCurrencyID, value)
        }
    }

    render() {
        const amountValue = Number.parseFloat(this.state.amount)
        const normalizedAmount = Number.isFinite(amountValue) ? amountValue : 0
        const convertedAmount = normalizedAmount * this.state.fromToConversionRate

        return (
            <Tab panes={[{ menuItem: 'Live Market Rates', render: () => (<Segment style={{ borderRadius: 0 }} inverted color={'black'}><Form size='big'>
              <Header color={'orange'} content="Choose The Currencies You Wish To Convert Below" style={{ textAlign: 'center', fontWeight: 'bolder', marginBottom: '25px' }} />
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Dropdown}
                        options={currencyOptions}
                        label={<Label htmlFor='from-currency' content={'From'} color={'orange'} pointing={'below'} />}
                        placeholder={this.state.fromCurrencyID}
                        search
                        selection
                        fluid
                        onChange={this.handleChange}
                        value={this.state.fromCurrencyID}
                        id='from-currency'
                        name='fromCurrencyID'
                    />
                    <Form.Field
                        control={Dropdown}
                        options={currencyOptions}
                        label={<Label htmlFor='to-currency' content={'To'} color={'orange'} pointing={'below'} />}
                        placeholder={this.state.toCurrencyID}
                        search
                        onChange={this.handleChange}
                        value={this.state.toCurrencyID}
                        selection
                        fluid
                        id='to-currency'
                        name='toCurrencyID'
                    />
                    <Form.Field
                        label={<Label htmlFor='amount' content={'Amount'} color={'orange'} pointing={'below'} />}
                        control={Input}
                        id='amount'
                        placeholder='0'
                        value={this.state.amount}
                        fluid
                        width='eight'
                        onChange={this.handleChange}
                        name='amount'
                    />
                </Form.Group>
                <Header as={Segment} color='grey' style={{ fontSize: 'small', fontWeight: 'lighter' }} content='All figures are live mid-market rates, which are not available to consumers and are for informational purposes only.' />
                <Header
                    style={{ fontWeight: 'bold' }}
                    color={'orange'}
                    as='h4'
                    content={`${normalizedAmount} ${this.state.fromCurrencyID} = `}
                />
                <h1 style={{ color: '#f2711c', fontWeight: 'bolder', fontSize: '3em' }}>
                    {convertedAmount.toFixed(4)} <small style={{ fontSize: 'large' }}>{this.state.toCurrencyID}</small>
                </h1>
                <Header
                    style={{ color: '#f2711c', fontWeight: 'bolder' }}
                    as='h3'
                    content={`1 ${this.state.toCurrencyID} = ${this.state.toFromConversionRate.toFixed(4)} ${this.state.fromCurrencyID}`}
                />
                <Header
                    style={{ color: '#f2711c', fontWeight: 'bold' }}
                    as='h3'
                    content={`1 ${this.state.fromCurrencyID} = ${this.state.fromToConversionRate.toFixed(4)} ${this.state.toCurrencyID}`}
                />
            </Form></Segment>) }]} />

        )
    }
}

export default ConversionForm

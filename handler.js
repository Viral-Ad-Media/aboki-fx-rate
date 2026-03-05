'use strict';

const axios = require('axios');
const fs = require('fs');

const apiUrl = 'https://free.currencyconverterapi.com/api/v6/';
const apiKey = process.env.CURRENCY_API_KEY || '2c07602b107024c25671';

const chunk = (items, size) => {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
};

const fx = async (firstCurrency, secondCurrency = 'NGN') => {
  const encodeFirstCurrency = encodeURIComponent(`${firstCurrency}_NGN`);
  const encodeSecondCurrency = encodeURIComponent(`${secondCurrency}_NGN`);
  const query = `${encodeFirstCurrency},${encodeSecondCurrency}`;
  const url = `${apiUrl}convert?q=${query}&apiKey=${apiKey}`;
  const response = await axios.get(url);
  return response.data && response.data.results ? response.data.results : {};
};

module.exports.getfx = async () => {
  try {
    const currenciesData = JSON.parse(fs.readFileSync('supported-currencies.json', 'utf8'));
    const currencies = Object.keys(currenciesData.results || {});
    const currencyPairs = chunk(currencies, 2);

    const conversionResults = await Promise.all(
      currencyPairs.slice(0, 100).map(async pair => {
        const [firstCurrency, secondCurrency = 'NGN'] = pair;
        return fx(firstCurrency, secondCurrency);
      })
    );

    const fxCollection = conversionResults.reduce((accumulator, currentValue) => {
      Object.entries(currentValue || {}).forEach(([key, value]) => {
        accumulator.results[key] = value;
      });
      return accumulator;
    }, { results: {} });

    fs.writeFileSync('fx.json', JSON.stringify(fxCollection, null, '\t'));

    return {
      statusCode: 200,
      body: JSON.stringify({
        updated: Object.keys(fxCollection.results).length
      })
    };
  } catch (error) {
    console.error('Unable to refresh fx rates', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Unable to refresh fx rates'
      })
    };
  }
};

module.exports.getcurrencies = async () => {
  try {
    const url = `${apiUrl}currencies?apiKey=${apiKey}&compact=ultra`;
    const response = await axios.get(url);
    const currencies = JSON.stringify(response.data, null, '\t');
    fs.writeFileSync('supported-currencies.json', currencies);

    return {
      statusCode: 200,
      body: JSON.stringify({
        updated: Object.keys((response.data && response.data.results) || {}).length
      })
    };
  } catch (error) {
    console.error('Unable to refresh currencies', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Unable to refresh currencies'
      })
    };
  }
};

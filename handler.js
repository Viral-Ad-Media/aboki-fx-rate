'use strict';

const axios = require('axios');
const fs = require('fs');
const { fetchLiveRates } = require('./lib/live-rates');

const apiUrl = 'https://free.currencyconverterapi.com/api/v6/';
const apiKey = process.env.CURRENCY_API_KEY;

const requireApiKey = () => {
  if (!apiKey) {
    throw new Error('CURRENCY_API_KEY is not set. Export your currencyconverterapi.com key before running getcurrencies.');
  }
};

/**
 * Refresh the committed fx.json snapshot from the same keyless feeds the site fetches live
 * (lib/live-rates.js). The snapshot is only the fallback for when no feed answers, so this
 * needs no API key.
 */
module.exports.getfx = async () => {
  try {
    const live = await fetchLiveRates();
    if (!live) {
      throw new Error('No rate feed answered');
    }
    const snapshot = { results: live.results, updatedAt: live.updatedAt, source: live.source };
    fs.writeFileSync('fx.json', JSON.stringify(snapshot, null, '\t'));

    return {
      statusCode: 200,
      body: JSON.stringify({
        updated: Object.keys(live.results).length,
        source: live.source
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
    requireApiKey();
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

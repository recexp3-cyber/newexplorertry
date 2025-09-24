const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { action, address } = event.queryStringParameters;
  const API_KEY = process.env.MULTICHAIN_API_KEY; // Securely access the API key

  if (!action || !address) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required parameters: action and address' }),
    };
  }

  const API_URL = `https://api-bsc.etherscan.io/api?module=account&action=${action}&address=${address}&page=1&offset=50&sort=desc&apikey=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow our website to access this
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from BscScan API' }),
    };
  }
};
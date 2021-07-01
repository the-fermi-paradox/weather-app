const process = require("process");
const fetch = require("node-fetch");

const handler = async function (event) {
  console.log(fetch);

  // get query parameters
  const { q } = event.queryStringParameters;

  console.log(`Query parameters: ${q}`);

  // Get env var values defined in our Netlify site UI
  // this is secret, our frontend won't see this
  const { API_URL, API_TOKEN } = process.env;

  // First we make a call to match city name to latitude and longitude
  const coordsURL = `${API_URL}/weather?q=${q}&appid=${API_TOKEN}`;

  const coordsRequest = await fetch(coordsURL, {
    method: "GET",
    mode: "cors",
  }).catch((error) => console.log(error));

  const { coords } = await coordsRequest
    .json()
    .catch((error) => console.log(error));

  console.log(`coords:`);
  console.log(coords);

  // Now we can make our real call to the API
  const URL = `${API_URL}/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${API_TOKEN}`;

  const request = await fetch(URL, {
    method: "GET",
    mode: "cors",
  }).catch((error) => console.log(error));

  const data = await request.json().catch((error) => console.log(error));

  console.log("Data:");
  console.log(data);

  return data;
};

module.exports = { handler };

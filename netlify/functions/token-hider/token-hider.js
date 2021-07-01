import { env } from "process";

const handler = async function (event) {
  // get query parameters
  const { q } = event.queryStringParameters;

  // Get env var values defined in our Netlify site UI
  // this is secret, our frontend won't see this
  const { API_URL, API_TOKEN } = env;

  // First we make a call to match city name to latitude and longitude
  const coordsURL = `${API_URL}/weather?q=${q}&appid=${API_TOKEN}`;

  const coordsRequest = await fetch(coordsURL, {
    method: "GET",
    mode: "cors",
  }).catch((error) => console.log(error));

  const { coords } = await coordsRequest
    .json()
    .catch((error) => console.log(error));

  // Now we can make our real call to the API
  const URL = `${API_URL}/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${API_TOKEN}`;

  const request = await fetch(URL, {
    method: "GET",
    mode: "cors",
  }).catch((error) => console.log(error));

  const data = await request.json().catch((error) => console.log(error));

  return data;
};

export default { handler };

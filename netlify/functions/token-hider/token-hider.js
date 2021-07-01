const fetch = require("node-fetch");

const handler = async function (event) {
  // get query parameters
  const q = event.queryStringParameters.q || "Lubbock,TX";

  console.log(`Query parameters: ${q}`);

  // Get env var values defined in our Netlify site UI
  // this is secret, our frontend won't see this
  const { API_TOKEN } = process.env;

  // First we make a call to match city name to latitude and longitude
  const coordsURL = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_TOKEN}`;

  const coordsRequest = await fetch(coordsURL, {
    method: "GET",
    mode: "cors",
  }).catch((error) => {
    throw error;
  });

  if (coordsRequest.cod === "404") {
    throw coordsRequest.message;
  } else if (coordsRequest.cod === "401") {
    throw coordsRequest.message;
  }

  console.log(coordsRequest);

  const newData = await coordsRequest.json().catch((error) => {
    console.log(error);
  });

  if (newData.cod === "404") {
    throw newData.message;
  } else if (newData.cod === "401") {
    throw newData.message;
  }

  console.log(`coords:`);
  console.log(newData);

  // Now we can make our real call to the API
  const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${newData.coord.lat}&lon=${newData.coord.lon}&appid=${API_TOKEN}`;

  const request = await fetch(URL, {
    method: "GET",
    mode: "cors",
  }).catch((error) => {
    console.log(error);
  });

  const data = await request.json().catch((error) => console.log(error));

  console.log("Data:");
  console.log(data);

  return data;
};

module.exports = { handler };

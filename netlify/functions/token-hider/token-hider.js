const fetch = require("node-fetch");

const handler = async function (event) {
  // get query parameters
  const q = event.queryStringParameters.q || "Lubbock";

  console.log(`Query parameters: ${q}`);

  // Get env var values defined in our Netlify site UI
  // this is secret, our frontend won't see this
  const { API_TOKEN } = process.env;

  // First we make a call with the user's city name input
  const coords = await (async () => {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_TOKEN}`;
    const response = await fetch(url).catch((error) => { throw error });

    if (!response.ok) {
      return {
          statusCode: response.cod,
          body: response.message,
      }
    }

    const data = await response.json().catch((error) => { throw error; }) ;

    if (data) {
      return {
        statusCode: 200,
        body: data
      };
    } else {
      return {
        statusCode: 204,
        body: "Error parsing response into JSON"
      }
    }
  })().catch((error) => { throw error; });

  if (coords.statusCode !== 200) {
    return { new Error(`ERROR ${coords.statusCode}: Data failed to be retrieved
    Message was: ${coords.body}`);
  }
  }

  // Now we can make our real call to the API
  // using the coordinates from the last call
  // to get the One Call data
  const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.body.coord.lat}&lon=${coords.body.coord.lon}&appid=${API_TOKEN}`;
  const response = await fetch(URL).catch((error) => { throw error });
  if (!response.ok) {
    return {
      statusCode: response.cod,
      body: response.message, 
    }
  }

  const data = await response.json().catch((error) => { throw error });

  if (data) {
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } else {
    return {
      statusCode: 204,
      body: "Error parsing response into JSON"
    }
  }
};

module.exports = { handler };

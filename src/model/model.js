const model = (() => {
  const parse = (str) => str
    .split(',')
    .map((item) => item.trim())
    .join(',');

  const get = async (input) => {
    const request = await fetch(
      `/.netlify/functions/token-hider/token-hider?q=${parse(input)}`,
    ).catch((error) => console.log(error));

    if (request.status && request.status !== 200) {
      return {
        statusCode: request.status,
        body: request.body,
      };
    }
    const data = await request.json().catch((error) => console.log(error));

    return {
      statusCode: 200,
      body: data,
    };
  };

  return { get };
})();

export default model;

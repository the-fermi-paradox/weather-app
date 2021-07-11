const model = (() => {
  const parse = (str) => str
    .split(',')
    .map((item) => item.trim())
    .join(',');

  const get = async (input) => {
    const request = await fetch(
      `/.netlify/functions/token-hider/token-hider?q=${parse(input)}`,
    ).catch((error) => console.log(error));

    console.log(request);

    if (!request || request.statusCode !== 200) {
      return {
        statusCode: request.statusCode,
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

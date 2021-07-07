const model = (() => {
  const parse = (str) => str
    .split(',')
    .map((item) => item.trim())
    .join(',');

  const get = async (input) => {
    const str = parse(input);
    const request = await fetch(
      `/.netlify/functions/token-hider/token-hider?q=${parse(str)}`,
    ).catch((error) => console.log(error));

    console.log(request);

    if (request.statusCode !== 200) {
      console.error(`${request.statusCode}: ${request.body}`);
    }

    const data = await request.json().catch((error) => console.log(error));

    return data;
  };

  return { get };
})();

export { model };

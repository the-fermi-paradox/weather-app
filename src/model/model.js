const model = (() => {
  const parse = (str) => {
    return str
      .split(",")
      .map((item) => item.trim())
      .join(",");
  };

  const get = async () => {
    const input = "Lubbock, TX";
    const request = await fetch(
      `/netlify/functions/token-hider/token-hider?q=${parse(input)}`
    ).catch((error) => console.log(error));
    const data = await request.json().catch((error) => console.log(error));

    return data;
  };

  return { get };
})();

export { model };

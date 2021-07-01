const model = (() => {
  const parse = (str) => {
    return str.split(",").map((item) => item.trim());
  };

  const get = async () => {
    const input = "Lubbock, TX";
    const request = await fetch(
      `/netlify/functions/token-hider?q=${parse(input)}`
    );
    const data = await request.json();

    return data;
  };

  return { get };
})();

export { model };

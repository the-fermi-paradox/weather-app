const parseData = (data, input) => {
  console.log(data);
  if (input === 'high' || input === 'low') {
    return data.daily[0].temp[input === 'high' ? 'max' : 'min'];
  }

  if (input === 'pop') {
    return data.daily[0][input];
  }

  return data.current[input];
};

export default parseData;

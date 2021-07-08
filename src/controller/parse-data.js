const parseData = (input, data) => {
  if (input === 'high' || input === 'low') {
    return data.daily.temp[input === 'high' ? 'max' : 'min'];
  }

  if (input === 'pop') {
    return data.daily[input];
  }

  return data.current[input];
};

export default parseData;

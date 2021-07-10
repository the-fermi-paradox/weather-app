const parseData = (data) => {
  const flatObject = {};
  // Our primary purpose here is to flatten
  // the object as much as we can, so that
  // our future data fetching isn't burdensome
  flatObject.temp = data.current.temp;
  flatObject.high = data.daily[0].temp.max;
  flatObject.low = data.daily[0].temp.min;
  flatObject.pop = data.daily[0].pop;
  flatObject.sunrise = data.current.sunrise;
  flatObject.sunset = data.current.sunset;
  flatObject.weather = data.current.weather[0].main;
  flatObject.windSpeed = data.current.wind_speed;
  flatObject.iconId = data.current.weather[0].id;
  // These arrays will need to be flattened
  // as they're being used ...
  flatObject.hourly = data.hourly;
  flatObject.daily = data.daily;
  return flatObject;
};

export default parseData;

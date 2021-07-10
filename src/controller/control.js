import dayOrNight from './day-or-night';
import parseData from '../model/parse-data';
import model from '../model/model';
import dataBlock from '../view/data-block';
import pickIcon from '../view/pick-icon';
import forecastBlock from '../view/forecast-block';

const parseHours = (date) => {
  const raw = date.getHours();
  if (raw === 0) return 12;
  return raw > 12 ? raw - 12 : raw;
};

const AMPM = (date) => (date.getHours() >= 12 ? 'PM' : 'AM');

const parseTime = (utc) => {
  // UTC stored in seconds, we want ms for JavaScript
  const date = new Date(utc);
  const hours = parseHours(date);
  const minutes = date.getMinutes();

  const signal = AMPM(date);
  return `${hours}:${minutes}${signal}`;
};

const kelvinToF = (K) => (
  (K - 273.15) * 1.8000 + 32.00
);

const kelvinToC = (K) => (
  K - 273.15
);

const parseTemp = (temp) => {
  const val = kelvinToF(temp).toFixed(0);
  return `${val}°F`;
};

const control = async () => {
  const unprocessedData = await model.get('Lubbock');
  console.log(unprocessedData);
  const data = parseData(unprocessedData);
  console.log(data);
  // Handle our main data section
  const section = document.getElementById('data-section');
  // Handle high and low
  const highBlock = dataBlock('High', parseTemp(data.high));
  const lowBlock = dataBlock('Low', parseTemp(data.low));
  section.append(highBlock, lowBlock);
  // Handle wind and rain
  const windBlock = dataBlock('Wind', `${data.windSpeed.toFixed(0)}mph`);
  const rainBlock = dataBlock('Rain', `${data.pop}%`);
  section.append(windBlock, rainBlock);
  // Handle sunrise and sunset
  const riseBlock = dataBlock('Sunrise', parseTime(data.sunrise));
  const setBlock = dataBlock('Sunset', parseTime(data.sunset));
  section.append(riseBlock, setBlock);

  // Handle our header display
  const summary = document.getElementById('summary');
  // First we make the main temperature display
  const tempBlock = document.createElement('div');
  tempBlock.classList.add('summary__temp');

  const tempText = document.createElement('span');
  tempText.classList.add('temp');
  tempText.textContent = parseTemp(data.temp);

  const weather = document.createElement('span');
  weather.classList.add('temp__subtext');
  weather.textContent = data.weather;

  tempBlock.append(tempText, weather);
  // Our images are generated via class names
  // which actively reflect the results of the
  // Open Weather Map API
  const image = document.createElement('div');
  image.classList.add('summary__image');
  // Now let's generate an icon of our choice
  const icon = document.createElement('i');
  const timeOfDay = dayOrNight(data.sunset, data.sunrise);
  icon.classList.add('wi', pickIcon(timeOfDay, data.iconId));
  image.append(icon);

  summary.append(image, tempBlock);

  // Handle the forecast block
  const forecast = document.querySelector('.forecast');
  for (let i = 0; i < 12; i += 1) {
    const hourly = data.hourly[i];
    const time = new Date(hourly.dt);
    const hourlyTOD = dayOrNight(
      data.sunset,
      data.sunrise,
      time,
    );
    const temp = parseTemp(hourly.temp);
    const img = pickIcon(hourlyTOD, hourly.iconId);
    const hours = parseHours(time);
    const block = forecastBlock(
      `${hours}${AMPM(time)}`,
      img,
      temp,
    );
    forecast.append(block);
  }
};

export default control;

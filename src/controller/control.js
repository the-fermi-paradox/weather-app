import parseData from '../model/parse-data';
import model from '../model/model';
import dataBlock from '../view/data-block';
import pickIcon from '../view/pick-icon';

const parseTime = (utc) => {
  // UTC stored in seconds, we want ms for JavaScript
  const date = new Date(utc * 1000);
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = date.getMinutes();

  const signal = hours >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes}${signal}`;
};

const kelvinToF = (K) => (
  (K - 273.15) * 1.8000 + 32.00
);

const kelvinToC = (K) => (
  K - 273.15
);

const control = async () => {
  const unprocessedData = await model.get('Lubbock');
  const data = parseData(unprocessedData);
  console.log(data);
  // Handle our main data section
  const section = document.getElementById('data-section');
  // Handle high and low
  const highBlock = dataBlock('High', data.high);
  const lowBlock = dataBlock('Low', data.low);
  section.append(highBlock, lowBlock);
  // Handle wind and rain
  const windBlock = dataBlock('Wind', `${data.windSpeed}mph`);
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
  tempText.textContent = data.temp;

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
  icon.classList.add('wi', pickIcon(data));
  image.append(icon);

  summary.append(image, tempBlock);
};

export default control;

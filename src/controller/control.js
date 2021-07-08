import parseData from './parse-data';
import model from '../model/model';
import dataBlock from '../view/data-block';

const parseTime = (utc) => {
  // UTC stored in seconds, we want ms for JavaScript
  const date = new Date(utc * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes}`;
};

const control = async () => {
  const data = await model.get('San Diego');
  // Handle our main data section
  const section = document.getElementById('data-section');
  // Handle high and low
  const high = parseData(data, 'high');
  const low = parseData(data, 'low');

  const highBlock = dataBlock('High', high);
  const lowBlock = dataBlock('Low', low);
  section.append(highBlock, lowBlock);
  // Handle sunrise and sunset
  const sunrise = parseTime(parseData(data, 'sunrise'));
  const sunset = parseTime(parseData(data, 'sunset'));

  const riseBlock = dataBlock('Sunrise', sunrise);
  const setBlock = dataBlock('Sunset', sunset);
  section.append(riseBlock, setBlock);
  // Handle wind and rain
  const windSpeed = parseData(data, 'wind_speed');
  const probPrecip = parseData(data, 'pop');

  const windBlock = dataBlock('Wind Speed', windSpeed);
  const rainBlock = dataBlock('Rain Chance', probPrecip);
  section.append(windBlock, rainBlock);
};

export default control;

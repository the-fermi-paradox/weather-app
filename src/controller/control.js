import parseData from '../model/parse-data';
import model from '../model/model';
import dataBlock from '../view/data-block';

const parseTime = (utc) => {
  // UTC stored in seconds, we want ms for JavaScript
  const date = new Date(utc * 1000);
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = date.getMinutes();

  const signal = hours >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes}${signal}`;
};

const control = async () => {
  const unprocessedData = await model.get('San Diego');
  const data = parseData(unprocessedData);
  // Handle our main data section
  const section = document.getElementById('data-section');
  // Handle high and low
  const highBlock = dataBlock('High', data.high);
  const lowBlock = dataBlock('Low', data.low);
  section.append(highBlock, lowBlock);
  // Handle wind and rain
  const windBlock = dataBlock('Wind', `${data.windSpeed}mph`);
  const rainBlock = dataBlock('Rain', `${data.rain}%`);
  section.append(windBlock, rainBlock);
  // Handle sunrise and sunset
  const riseBlock = dataBlock('Sunrise', parseTime(data.sunrise));
  const setBlock = dataBlock('Sunset', parseTime(data.sunset));
  section.append(riseBlock, setBlock);

  // Handle our header display
  const summary = document.getElementById('summary');
};

export default control;

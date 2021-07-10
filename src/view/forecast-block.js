const forecastBlock = (timeData, iconData, tempData) => {
  const block = document.createElement('div');
  block.classList.add('forecast__block');

  const time = document.createElement('span');
  time.classList.add('forecast__time');
  time.textContent = timeData;

  const iconBlock = document.createElement('span');
  iconBlock.classList.add('forecast__icon');

  const icon = document.createElement('i');
  icon.classList.add('wi', iconData);

  iconBlock.append(icon);

  const temp = document.createElement('span');
  temp.classList.add('forecast__temp');
  temp.textContent = tempData;

  block.append(time, iconBlock, temp);

  return block;
};

export default forecastBlock;

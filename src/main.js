import control from './controller/control';
import reset from './controller/reset';
import model from './model/model';
import parseData from './model/parse-data';

model.get('Lubbock')
  .then((response) => {
    const data = parseData(response.body);
    control(data);
  })
  .catch((error) => console.error(error));

const printDate = () => {
  const now = new Date();
  const element = document.getElementById('date');

  element.textContent = now.toDateString();
};

printDate();

const input = document.querySelector('.header__city');

input.addEventListener('change', async () => {
  const val = input.value;
  const unprocessedData = await model.get(val);
  if (unprocessedData.statusCode !== 200) {
    console.error(`${unprocessedData.statusCode} ${unprocessedData.body}`);
    return;
  }

  const data = parseData(unprocessedData.body);
  reset();
  control(data);
});

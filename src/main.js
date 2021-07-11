import control from './controller/control';
import reset from './controller/reset';
import model from './model/model';
import parseData from './model/parse-data';
import hideLoader from './view/hide-loader';

model.get('Lubbock')
  .then((response) => {
    if (response.statusCode !== 200) {
      return;
    }
    hideLoader();
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
  input.classList.remove('red');
  const val = input.value;
  const unprocessedData = await model.get(val);
  if (unprocessedData.statusCode !== 200) {
    input.classList.add('red');
    console.error(`${unprocessedData.statusCode}`);
    return;
  }

  const data = parseData(unprocessedData.body);
  reset();
  control(data);
});

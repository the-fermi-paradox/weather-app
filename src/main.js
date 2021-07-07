import { model } from './model/model';

const log = async () => {
  const output = await model.get('San Diego').catch((error) => console.log(error));
  console.log(output);
};

log();

const printDate = () => {
  const now = new Date();
  const element = document.getElementById('date');

  element.textContent = now.toDateString();
};

printDate();

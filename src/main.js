import control from './controller/control';
import reset from './controller/reset';

control();

const printDate = () => {
  const now = new Date();
  const element = document.getElementById('date');

  element.textContent = now.toDateString();
};

printDate();

const input = document.querySelector('.header__city');

input.addEventListener('change', () => {
  reset();
  control(input.value);
});

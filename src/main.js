import control from './controller/control';

control();

const printDate = () => {
  const now = new Date();
  const element = document.getElementById('date');

  element.textContent = now.toDateString();
};

printDate();

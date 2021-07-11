const hideLoader = () => {
  const loader = document.querySelector('.loader');
  const main = document.querySelector('.main');
  loader.classList.add('hidden');
  main.classList.remove('hidden');
};

export default hideLoader;

const hideLoader = () => {
  const loader = document.querySelector('.loader');
  const main = document.querySelector('.main');
  loader.classList.add('loading');
  main.classList.remove('loading');
};

export default hideLoader;

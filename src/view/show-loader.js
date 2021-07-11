const loading = (() => {
  const loader = document.querySelector('.small-loader');
  const text = document.getElementById('text');

  const showSmallLoader = () => {
    loader.classList.remove('hidden');
  };

  const hideSmallLoader = () => {
    loader.classList.add('hidden');
  };

  const printError = () => {
    text.textContent = 'Try again';
  };

  const resetText = () => {
    text.textContent = ' Loading...';
  };
  const icon = document.getElementById('icon');
  const hideIcon = () => {
    icon.classList.add('hidden');
  };
  const showIcon = () => {
    icon.classList.remove('hidden');
  };

  return {
    showSmallLoader,
    hideSmallLoader,
    printError,
    resetText,
    hideIcon,
    showIcon,
  };
})();

export default loading;

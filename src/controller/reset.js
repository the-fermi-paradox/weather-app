const reset = () => {
  const clearParent = (parent) => [...parent.childNodes].forEach((el) => el.remove());
  const clearNodes = (...parents) => parents.forEach((parent) => clearParent(parent));

  const summary = document.getElementById('summary');
  const forecast = document.querySelector('.forecast');
  const data = document.getElementById('data-section');

  clearNodes(summary, forecast, data);
};

export default reset;

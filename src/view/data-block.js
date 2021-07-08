/*
 *
 *        <div class="data__block">
 *         <span class="data__value">6:00 AM</span>
 *         <span class="data__label">Sunrise</span>
 *       </div>
 */

const block = (name, val) => {
  const chunk = document.createElement('div');
  chunk.classList.add('data__block');

  const value = document.createElement('span');
  value.classList.add('data__value');
  value.textContent = val;

  const label = document.createElement('label');
  label.classList.add('data__label');
  label.textContent = name;

  chunk.append(value, label);

  return chunk;
};

export default block;

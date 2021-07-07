/*
 *
 *        <div class="data__block">
 *         <span class="data__value">6:00 AM</span>
 *         <span class="data__label">Sunrise</span>
 *       </div>
 */

const block = () => {
  const chunk = document.createElement('div');
  chunk.classList.add('data__block');

  const value = document.createElement('span');
  value.classList.add('data__value');

  const label = document.createElement('label');
  label.classList.add('data__label');

  chunk.append(value, label);

  return chunk;
};

export default block;

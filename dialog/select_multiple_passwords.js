/**
 * @copyright Tobia De Koninck
 * @copyright Robin Jadoul
 *
 * This file is part of Keywi.
 * Keywi is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Keywi is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with Keywi.  If not, see <http://www.gnu.org/licenses/>.
 */

const generateButtonRow = function (index, name, login) {
  return `
    <div class="password-container">
            <button data-index="${index}" class="password-choose-btn">${login} (${name})</button>
         </div>
    </div>
`;
};

window.addEventListener('DOMContentLoaded', function () {
  browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'select_mul_pass_data') {
      const length = request.data.possibleCredentials.length;
      let html = '';

      for (let i = 0; i < length; i++) {
        html += generateButtonRow(i, request.data.possibleCredentials[i].Name, request.data.possibleCredentials[i].Login);
      }

      document.getElementById('passwords').innerText = html;
      const els = document.getElementsByClassName('password-choose-btn');

      for (const el of els) {
        el.addEventListener('click', function () {
          browser.runtime.sendMessage({
            'type': 'select_mul_pass_user_input',
            'data': {'selected': this.dataset.index}
          });
        }, false);
      }
    }
  });
});

document.getElementById('cancel').onclick = function () {
  browser.runtime.sendMessage({
    'type': 'select_mul_pass_cancel',
    'data': {}
  });
};

'use strict';
const main = document.querySelector('.content');
const form = document.getElementById('form');
const inputField = document.getElementById('input-field');
const submit = document.getElementById('submit-btn');
const list = document.getElementById('list');
const deleteAllButton = document.getElementById('delete--all-button');
let editingItem = '';
let indexZ = 1;

const buttonsFix = function () {
  const editButton = document.querySelectorAll('.edit-button');
  editButton.forEach((button) =>
    button.addEventListener('click', function () {
      editingItem = button.closest('div').previousElementSibling;
      inputField.focus();
    })
  );

  const deleteButton = document.querySelectorAll('.delete-button');
  deleteButton.forEach((button) =>
    button.addEventListener('click', () => {
      displayMessage('Item deleted');
      button.closest('.item').remove();
    })
  );
};

const createItem = function (item) {
  return `<li class="item flex justify-between items-center">
  <p class="item-name text-lg">${item}</p>
  <div class="flex items-center">
    <a class="edit-button text-green-600" href="#">
      <svg class="fill-current w-6 h-6" viewBox="0 0 20 20">
        <path
          d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"
        ></path>
      </svg>
    </a>

    <a class="delete-button text-gray-800" href="#">
      <svg class="fill-current w-5 h-5" viewBox="0 0 20 20">
        <path
          d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"
        ></path>
      </svg>
    </a>
  </div>
</li>`;
};

const displayMessage = function (
  message = 'Something went wrong',
  type = 'error'
) {
  const element = `<p class="${type} alert">${message}</p>`;
  main.insertAdjacentHTML('afterbegin', element);
  const removeElement = main.firstChild;
  removeElement.style.zIndex = indexZ;
  indexZ++;
  setTimeout(() => {
    removeElement.remove();
  }, 2000);
};

const addItem = function (item) {
  displayMessage('Added item to the list', 'success');
  list.insertAdjacentHTML('afterend', createItem(item));
  buttonsFix();
};

const formSubmit = function (e) {
  e.preventDefault();
  const item = inputField.value;
  if (item === 0 || item == '') displayMessage('Please enter value');
  else if (editingItem != '') editItem(item);
  else addItem(item);
  inputField.value = '';
};

const deleteAll = function () {
  displayMessage('All items deleted');
  const allItems = document.querySelectorAll('.item');
  allItems.forEach((item) => item.remove());
};

const editItem = function (item) {
  displayMessage('Item edited', 'success');
  editingItem.innerHTML = item;
  editingItem = '';
};

buttonsFix();
form.addEventListener('submit', formSubmit);
deleteAllButton.addEventListener('click', deleteAll);

localStorage.setItem('itemList', JSON.stringify(list));
console.log(localStorage);

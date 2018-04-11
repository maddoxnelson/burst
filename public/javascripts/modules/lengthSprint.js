import { submitForm, validate } from './sprintHelpers';

console.log(validate)

function checkWordCount(el) {
  return el.value.split(' ').length - 1;
}

function runSprint() {
  if (validate()) {
    console.log('running!')
    const contentInput = document.querySelector('#burst-content');
    const wordLimit = parseInt(this.dataset.value);
    const numberWords = contentInput.addEventListener('keyup', (e) => {

      if (checkWordCount(e.target) > wordLimit) {
        submitForm();
      }
    });
  }
}

function init() {
  const lengthBtns = [...document.querySelectorAll('.length-sprint')];
  lengthBtns.forEach(btn => btn.addEventListener('click', runSprint));
}

function lengthSprint() {
  init();
}

export default lengthSprint;

const promisify = require('es6-promisify');

function countdown(duration = 5) {
  const ms = duration * 1000;
  let ticker = duration - 1;

  const clock = setInterval(() => {
    console.log(ticker--);
  }, 1000);

  return new Promise(resolve => {

    setTimeout(() => {
      clearInterval(clock);
      resolve('resolved');
    }, ms);
  });
}

async function startSprint(duration) {
  await countdown({ length: duration, unit: 'seconds' });
  console.log('Sprint completed!')
  console.log('give users 15 seconds to wrap up their thoughts')
  console.log('Submit a form that contains the burst to autosave it.')
}

async function runSprint() {
  const time = parseInt(this.dataset.value) * 60;
  console.log('Sprint starting in 5 seconds...')
  await countdown(5);
  console.log(`${this.dataset.value} ${this.dataset.unit} sprint starting!!`)
  await countdown(time);
  console.log('SPRINT COMPLETE! Take 15 seconds to finish your current sentence.')
  await countdown(15);
  console.log('Save word sprint by submitting form.')
  console.log('Display stats on the next page')
}

function init() {
  const timedBtns = [...document.querySelectorAll('.timed-sprint')];

  timedBtns.forEach(btn => btn.addEventListener('click', runSprint));
}

function timedSprint() {
  init();
}

export default timedSprint;

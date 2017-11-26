const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;


const randTime = (min, max) => {
  return Math.round((Math.random() * (max - min)) + min);
}

const randHole = (holes) => {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (lastHole === hole) {
    return randHole(holes);
  }
  lastHole = hole;
  return hole;
}

const peep  = () => {
  const time = randTime(200, 1000);
  const hole = randHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) {
      peep();      
    }
  }, time)
};

const startGame = () => {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setInterval(() => {
    timeUp = true
  }, 15000)
}

const whack = ev => {
  if (!ev.isTrusted) return;
  ev.target.classList.remove('up');
  score++;
  scoreBoard.textContent = score;
  
}

moles.forEach(mole => mole.addEventListener('click', whack));
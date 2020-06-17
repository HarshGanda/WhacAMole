// idea taken from -  https://github.com/romeojeremiah/whack-a-mole

const startbtn = document.getElementById('start');
const menu = document.getElementById('menu');
const timer = document.getElementById('timer');
const game = document.getElementById('game');
const result = document.getElementById('result');
const okbtn = document.getElementById('ok');
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('score');
const moles = document.querySelectorAll('.mole');

let level;
let lastHole;
let timeUp = false;
let score = 0;

/* Changes to take place on clicking the "Start !" Button */
startbtn.addEventListener('click', () => {
	menu.style.display = 'none';
	timer.style.display = 'block';
	var e = document.getElementById("levels");
  	level = e.options[e.selectedIndex].value;
  	for(let i = Number(level)+1; i<16; i++) {
  		var holeid = document.querySelector(`.hole${i}`);
  		holeid.style.display = 'none';
  	}
	setTimeout(() => {
		timer.removeAttribute("style");
		game.style.display = 'flex';
		startGame();
	}, 3000);
});

/* Function to generate random time interval for peeping */
function randomTimeInterval(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/* Select a random hole for peeping (but not the same as previous one) */
function randomHole(holes){
    const index  = Math.floor(Math.random() * level);
    const hole = holes[index];
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

/* Random mole peeps for a random time interval*/
function peep() {
    const time = randomTimeInterval(350, 1100);
    const hole = randomHole(holes); 
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up'); 
        if(!timeUp) {
            peep();
        }
    }, time);
}

/* To increase score and change mole image on successful hit */
function wack(e){
    if(!e.isTrusted) return;
    score++;
    this.style.backgroundImage = "url('svg/mole-hit.svg')";
    this.parentNode.classList.remove('up');
    setTimeout(() => {
    	this.removeAttribute("style");
    }, 500);
}

/* Start the game */
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => {
    	timeUp = true;
    }, 20000);
    setTimeout(() => {
    	result.style.display = 'block';
    	scoreBoard.textContent = score;
    }, 21000);
}

/* On a successful hit */
moles.forEach(mole => mole.addEventListener('click', wack))


/* Reset to intial state on clicking Ok Button */
okbtn.addEventListener('click', () => {
	console.log('ok clicked!');
	game.removeAttribute("style");
	menu.removeAttribute("style");
	result.removeAttribute("style");
	for(let i = 1; i<16; i++) {
  		var holeid = document.querySelector(`.hole${i}`);
  		holeid.removeAttribute("style");
  	}
});
// alert("working!");

var startbtn = document.getElementById('start');
var menu = document.getElementById('menu');
var timer = document.getElementById('timer');
var time = document.getElementById('no');
var game = document.getElementById('game');
var result = document.getElementById('result');
var okbtn = document.getElementById('ok');

startbtn.addEventListener('click', () => {
	console.log('start clicked!');
	menu.style.display = 'none';
	timer.style.display = 'block';
});

timer.addEventListener('click',() => {
	timer.style.display = 'none';
	game.style.display = 'flex';
})

okbtn.addEventListener('click', () => {
	console.log('ok clicked!');
	game.style.display = 'none';
	menu.style.display = 'block';
});

var streams = [];
var fontSize = 25;
Symbol.COLOR = "rgb(0, 255, 10)";

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	textSize(fontSize);
	initSymbolStreams();
}

function initSymbolStreams() {
	streams = [];
	var x = 0;

	for(var i = 0; i < width / fontSize; i++) {
		var stream = new SymbolsStream(x);
		streams.push(stream);
		x += fontSize;
	}
}

function draw() {
	background(0, 0,0,130);

	for(var i = 0; i < streams.length; i++) {
		streams[i].render();
	}
}

function Symbol(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.updateInterval = round(random(2, 25));

	this.value;
	this.setRandomValue = function() {
		this.value = String.fromCharCode(0x30A0 + round(random(0, 96))); // katakana alphabet
	}

	this.setRandomValue();

	this.render = function() {
		fill(Symbol.COLOR);
		text(this.value, this.x, this.y);
	}

	this.update = function() {
		this.y = (this.y > height) ? 0 : this.y + this.speed;
		if(frameCount % this.updateInterval == 0) {
			this.setRandomValue();
		}
	}
}

function SymbolsStream(x) {
	var symbols = [];
	var symbolsCount = round(random(8, 35));
	var streamSpeed = round(random(5, 15));
	var streamY = round(random(-1000, 0));

	for(var i = 0; i < symbolsCount; i++) {
		var symbol = new Symbol(x, streamY, streamSpeed);
		symbols.push(symbol);
		streamY -= fontSize;
	}

	this.render = function() {
		for(var i = 0; i < symbolsCount; i++) {
			symbols[i].render();
			symbols[i].update();
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	initSymbolStreams();
}
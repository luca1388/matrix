let streams = [];

const setup = () => {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	textSize(Symbol.FONT_SIZE);
	initSymbolStreams();
}

const initSymbolStreams = () => {
	streams = [];
	let x = 0;

	for(let i = 0; i < width / Symbol.FONT_SIZE; i++) {
		let stream = new SymbolsStream(x);
		streams.push(stream);
		x += Symbol.FONT_SIZE;
	}
}

const draw = () => {
	background(0, 0,0,130);

	for(let str in streams) {
		streams[str].render();
	}
}

class Symbol {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.updateInterval = round(random(2, 25));
		this.value = this.setRandomValue();
	}

	setRandomValue() {
		return String.fromCharCode(0x30A0 + round(random(0, 96))); // katakana alphabet
	}

	render() {
		fill(Symbol.COLOR);
		text(this.value, this.x, this.y);
	}

	update() {
		this.y = (this.y > height) ? 0 : this.y + this.speed;
		if(frameCount % this.updateInterval == 0) {
			this.value = this.setRandomValue();
		}
	}
};

Symbol.COLOR = "rgb(0, 255, 10)";
Symbol.FONT_SIZE = 25;

class SymbolsStream {
	constructor(x) {
		this.symbols = [];
		this.symbolsCount = round(random(8, 35));
		this.streamSpeed = round(random(5, 15));
		this.streamY = round(random(-1000, 0));

		for(let i = 0; i < this.symbolsCount; i++) {
			this.symbols.push(new Symbol(x, this.streamY, this.streamSpeed));
			this.streamY -= Symbol.FONT_SIZE;
		}
	}

	render() {
		for(let sym in this.symbols) {
			this.symbols[sym].render();
			this.symbols[sym].update();
		}
	}
};

const windowResized = () => {
	resizeCanvas(windowWidth, windowHeight);
	initSymbolStreams();
}
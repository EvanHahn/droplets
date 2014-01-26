var COLORS = [
	[12, 0, 1],
	[16, 16, 16]
];

var colorChoice = 0;

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

function makeCanvasFillPage() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
$(window).on('resize', makeCanvasFillPage);
makeCanvasFillPage();

var mouse = { clicking: false };
var stopped;
$(canvas).on('mousemove', function(event) {
	clearTimeout(stopped);
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	mouse.previous = mouse.previous || { x: mouse.x, y: mouse.y };
	mouse.x$ = mouse.x - mouse.previous.x;
	mouse.y$ = mouse.y - mouse.previous.y;
	stopped = setTimeout(function() {
		mouse.previous.x = mouse.x;
		mouse.previous.y = mouse.y;
		mouse.x$ = 0;
		mouse.y$ = 0;
	}, 10);
});

$(canvas).on('mousedown', function() {
	mouse.clicking = true;
	colorChoice = (colorChoice + 1) % COLORS.length;
});
$(canvas).on('mouseup', function() { mouse.clicking = false; });

function hexFrom(arr) {
	var r = Math.floor(arr[0] * arr[3]).toString(16);
	var g = Math.floor(arr[1] * arr[3]).toString(16);
	var b = Math.floor(arr[2] * arr[3]).toString(16);
	return ['#', r, r, g, g, b, b].join('');
}

function Droplet() {

	this.x = mouse.x;
	this.y = mouse.y;
	this.x$ = mouse.x$ / 80;
	this.y$ = 0;
	this.x$$ = 0;
	this.y$$ = .01;

	this.sizeBonus = Math.random() * 3;

	this.started = new Date;
	this.color = COLORS[colorChoice];

}

Droplet.prototype.draw = function(ctx) {

	var multiplier = Math.min(Math.abs((new Date) - this.started) / 500, 1);
	ctx.fillStyle = hexFrom([this.color[0], this.color[1], this.color[2], 1 - multiplier]);

	ctx.beginPath();
	ctx.arc(
		this.x, this.y,
		Math.abs(this.x$ + this.y$ + this.sizeBonus) * 3,
		0, 2 * Math.PI
	);
	ctx.fill();

}

Droplet.prototype.step = function(dt) {

	this.x$ += this.x$$ * Math.sqrt(dt); // TODO: wrong formula?
	this.y$ += this.y$$ * Math.sqrt(dt);
	this.x += this.x$ * dt;
	this.y += this.y$ * dt;

	if (this.y > window.innerHeight)
		this.pool.alive = false;

}

var pool = new Pool;

var start;

function tick(t) {

	requestAnimationFrame(tick);

	if (!start)
		start = t;

	var dt = t - start;
	start = t;

	pool.each(function(item) {
		item.step(dt, t);
		item.draw(context);
	});

	var droplet = pool.create(Droplet);
	droplet.draw(context);

}

tick(0);

// white noise
var audioContext = new (window.AudioContext || window.webkitAudioContext);
var bufferSize = 4096;
var brownNoise = (function() {
    var lastOut = 0.0;
    var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = function(e) {
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            var white = (Math.random() * .5 - .25);
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3 + Math.sin(Date.now() / 700);
        }
    }
    return node;
})();

brownNoise.connect(audioContext.destination);

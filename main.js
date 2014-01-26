var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

function makeCanvasFillPage() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
$(window).on('resize', makeCanvasFillPage);
makeCanvasFillPage();

var mouse = { clicking: false };
$(canvas).on('mousemove', function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	console.log(mouse.x, mouse.y);
});

$(canvas).on('mousedown', function() { mouse.clicking = true; });
$(canvas).on('mouseup', function() { mouse.clicking = false; });

function randomHex() {
	return Math.floor(Math.random() * 16).toString(16);
}

function Droplet() {

	this.x = mouse.x;
	this.y = mouse.y;
	this.x$ = 0;
	if (mouse.clicking)
		this.y$ = Math.random() * -1;
	else
		this.y$ = 0;
	this.x$$ = 0;
	this.y$$ = .01;

	this.sizeBonus = Math.random() * 2;

	this.color = '#';
	for (var i = 1; i <= 3; i ++) {
		var hex = randomHex();
		this.color += hex + hex;
	}

}

Droplet.prototype.draw = function(ctx) {

	ctx.fillStyle = this.color;

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

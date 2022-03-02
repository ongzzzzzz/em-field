// // actual physical values
// const e_c = 1.60217662e-19;
// const m_e = 9.10938291e-31;
// const k_e = 8.98755178e9;

// sandbox values
const e_c = 1;
const m_e = 9.10938291e-31;
const k_e = 10000;
let B = 10;

let started = false;
let clicked;
let dragged;

let particles = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	clicked = createVector(0, 0);
	dragged = createVector(0, 0);

	for (let i=0; i<5; i++) {
		// Particle(x, y, r, q, m)
		if (Math.random() > 0.5) {
			particles.push(new Particle(
				random(width), random(height), 10, e_c, 500, createVector(3, 0)
			))
		}
		else {
			particles.push(new Particle(
				random(width), random(height), 10, -e_c, 500, createVector(3, 0)
			))
		}
	}
	background(0);
}

let step = 75;
let dstep = 10;
function draw() {
	background(0);
	stroke(255);
	
	for (let i=0; i<width; i+=step) {
		for (let j=0; j<height; j+=step) {
			line(i+dstep, j+dstep, i+step-dstep, j+step-dstep);
			line(i+dstep, j+step-dstep, i+step-dstep, j+dstep);
		}
	}

	particles.forEach(p => {
		p.updatePos();
		p.updateForce();
		p.show();
	})

	if (clicked.x || clicked.y) 
		drawArrow(
			clicked, 
			dragged,
			"pink"
		)

	drawInfoBox();
}


function mousePressed() {
	if (!mouseInCanvas()) return
	if (!started) {
		started = true;
		return
	}

	clicked.x = mouseX;
	clicked.y = mouseY;
}

function mouseDragged() {
	dragged.x = clicked.x - mouseX;
	dragged.y = clicked.y - mouseY;
}

function mouseReleased() {
	// ignore input if mouse not in canvas
	if (!mouseInCanvas() && !clicked) return

	// x y r q m
	particles.push(
		new Particle(
			clicked.x, clicked.y,
			10,
			particles.length%2 ? e_c : -e_c,
			500,
			dragged.copy().div(50)
		)
	)

	clicked.x = 0; clicked.y = 0;
	dragged.x = 0; dragged.y = 0;
}

function mouseInCanvas() {
	return !(mouseX < 0 || mouseX > width || mouseY > height || mouseY < 0)
}


function drawInfoBox() {
	if (!started) {
		stroke("white");
		fill("white");
		rectMode(RADIUS);
		rect(width/2, height/2, width/4, height/3, 10);
		let marg = 10;
		fill("black");
		text(
			"Hey!\nThis is a simulation for charged particles under the influences of magnetic and electric fields!\n\nThe red particles denote Positive Charges (eg. protons) and the blue ones Negative Charges (eg. electrons). The magnetic field points into the screen.\n\nClick and drag to shoot charged particles like angry birds, have fun! :3\n(they alternate between red and blue charges for every click)\n\nmade with 💖 by ongzzzzzz on github",
			width/4 + marg, height/6 + marg, width/2 - marg, height*2/3 - marg
		)
	}
}
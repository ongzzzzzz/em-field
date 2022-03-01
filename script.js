// const e_c = 1.60217662e-19;
// const m_e = 9.10938291e-31;
// const k_e = 8.98755178e9;

const e_c = 1;
const m_e = 9.10938291e-31;
const k_e = 10000;

let B = 10;

let particles = [];
function setup() {
	createCanvas(windowWidth, windowHeight);

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

	if (clicked) 
		line(
			clickedX, clickedY,
			clickedX + (clickedX - mouseX),
			clickedY + (clickedY - mouseY)
		)
}



let clicked = false;
let [clickedX, clickedY] = [0, 0];
let releasedX = 0, releasedY = 0;

function mousePressed() {
	if (!mouseInCanvas()) return

	clicked = true;
	clickedX = mouseX, clickedY = mouseY;
}

function mouseDragged() {
	
}

function mouseReleased() {
	// ignore input if mouse not in canvas
	if (!mouseInCanvas() && !clicked) return

	// x y r q m
	particles.push(
		new Particle(
			clickedX, clickedY,
			10,
			Math.random() > 0.5 ? e_c : -e_c,
			500,
			createVector(clickedX - mouseX, 
						 clickedY - mouseY).div(50)
		)
	)


	clicked = false;
	[clickedX, clickedY] = [0, 0]
}

function mouseInCanvas() {
	return !(mouseX < 0 || mouseX > width || mouseY > height || mouseY < 0)
}
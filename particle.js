class Particle {
	constructor(x, y, r, q, m, v) {
		this.r = r;
		this.q = q;
		this.m = m;
		this.v = v;
		this.a = createVector(0, 0, 0);
		
		this.inix = x; this.iniy = y;
		this.iniv = v;
		this.pos = createVector(x, y, 0);
	}
	
	updatePos() {
		// if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
		// 	this.pos = createVector(this.inix, this.iniy);
		// 	this.v = createVector(3, 0, 0);
		// 	this.a = createVector(0, 0, 0);
		// }
		this.v.add(this.a);
		this.pos.add(this.v);
	}
	
	updateForce() {
		// E = F/q = sum of all KQ/r2
		let electricField = createVector(0, 0);
		particles.forEach(p => {
			if (p !== this) {
				let r = p5.Vector.sub(p.pos, this.pos);
				r.setMag(k_e * p.q / r.magSq());
				electricField.add(r);
			}
		})
		// drawArrow(this.pos, electricField, "pink")
		
		// F = ma = qE + qv x B
		let lorentz = 
			createVector(0, 0, B)
				.cross(this.v)
				.add(electricField)
				.mult(this.q);
		lorentz.mult(-1);
		drawArrow(this.pos, lorentz, "white");
		
		this.a = lorentz.div(this.m);
	}
	
	show() {
		if (this.q > 0) fill("red");
		else fill("blue");
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
	}
}





function drawArrow(base, vec, myColor) {
	push();
	stroke(myColor);
	strokeWeight(3);
	fill(myColor);
	translate(base.x, base.y);
	line(0, 0, vec.x, vec.y);
	rotate(vec.heading());
	let arrowSize = 7;
	translate(vec.mag() - arrowSize, 0);
	triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	pop();
}

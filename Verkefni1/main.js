// Canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// B� til random t�lu
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// Constructor fyrir l�gun
class Shape {
    constructor (x, y, velX, velY, color, size, time) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.time = time;
    }
    // Hvernig hreyfa
    update () {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }
    
        if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
        }
    
        if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
        }
    
        if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
        }
    
        this.x += this.velX;
        this.y += this.velY;
        this.time -= 1;
    }
    // Hva� gerist ef hitti
    collisionDetect () {
        for (let j = 0; j < triangles.length; j++) {
            if (!(this === triangles[j])) {
                const dx = this.x - triangles[j].x;
                const dy = this.y - triangles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                // �r�hyrningar st�kka
                if (distance < this.size + triangles[j].size) {
                triangles[j].size = this.size + 0.25;
                }
            }
        }
    }
    collisionDetect2 () {
        for (let j = 0; j < circles.length; j++) {
            if (!(this === circles[j])) {
                const dx = this.x - circles[j].x;
                const dy = this.y - circles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                // Hringir breyta litum
                if (distance < this.size + circles[j].size) {
                circles[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                }
            }
        }
    }
    // D�inn er true ef t�min er minna en 0
    isDead () {
        if (this.time < 0) {
            return true;
        } else {
            return false;
        }
    };
}

// Triangle erf�a Shape
class Triangle extends Shape {
    // Teiknar �r�hyrninga
    draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 1.5 * this.size / 2, this.y + 1.5 * this.size);
        ctx.lineTo(this.x - 1.5 * this.size / 2, this.y + 1.5 * this.size);
        ctx.closePath();
        ctx.fill();
    }
}

// Circle erf�a Shape
class Circle extends Shape {
    // Teiknar hringi
    draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// Square erf�a Shape
class Square extends Shape {
    // Teiknar ferhyrninga
    draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, 2 * this.size, 2 * this.size);
        ctx.fill();
    }
}

// B� til array a� geyma 
let circles = [];
let triangles = [];
let squares = [];

while (circles.length < 20 & squares.length < 15 & triangles.length < 10) {
    let size = random(10,20);

    let triangle = new Triangle(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-5,5),
    random(-5,5),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    random(20, 200)
    );

    let circle = new Circle(
    // circle position always drawn at least one circle width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-3,3),
    random(-3,3),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    random(20, 200)
    );

    let square = new Square(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    random(500, 1000)
    );

    triangles.push(triangle);
    circles.push(circle);
    squares.push(square);
}

// Heldur �fram a� teikna
function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);
  
    for(let i = 0; i < triangles.length; i++) {
        triangles[i].draw();
        triangles[i].update();
        triangles[i].collisionDetect();
    }
    for(let i = 0; i < circles.length; i++) {
        circles[i].draw();
        circles[i].update();
        circles[i].collisionDetect2();
    }
    for(let i = 0; i < squares.length; i++) {
        squares[i].draw();
        squares[i].update();
        // Ey�ir ferhyrninga ef d�inn
        if (squares[i].isDead()) {
            squares.splice(i, 1);
        }
    }
  
    requestAnimationFrame(loop);
}
  
loop();


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight - 1;

const BUBBLES = 25;

class Bubble {
    constructor (x, y, dir_x, dir_y, color, border, radius, ticks) {
        this.x = x;
        this.y = y;
        this.dir_x = dir_x;
        this.dir_y = dir_y;
        this.color = color;
        this.border = border;
        this.radius = radius;
        this.ticks = ticks;
    }

    draw (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius,0,Math.PI * 2,false);

        context.fillStyle = this.color;
        context.strokeStyle = this.border;
        context.strokeWidth = "40";
        context.stroke();

        context.fill();
        context.closePath();
    }

    update () {
        this.x += this.dir_x - 0.05;
        this.y += this.dir_y - 0.05;

        if (this.x > (WIDTH - this.radius)) {
            this.dir_x = -this.dir_x;
        }
        if (this.y > (HEIGHT - this.radius) ) {
            this.dir_y = -this.dir_y;
        }

        if (this.y < 50 + this.radius) {
            while (this.dir_y <= 0.05) {
                this.newDirection();
            }
        }
        if (this.y < 50 + this.radius) {
            while (this.dir_x <= 0.05) {
                this.newDirection();
            }
        }

        this.ticks--;
        if (this.ticks < 1) {
            this.newDirection();
        }
    }

    newDirection () {
        this.ticks = Math.floor(Math.random() * 800);

        this.dir_x = Math.random() / 8;
        this.dir_y = Math.random() / 8;
    }
}

function animate (context, bubbles) {
    context.clearRect(0, 0, WIDTH, HEIGHT);

    bubbles.forEach(bubble => {
        bubble.draw(context);
        bubble.update();
    });
}

function init () {
    const canvas = document.querySelector('#bubbles');

    canvas.width = WIDTH;
    canvas.height = HEIGHT

    let context = canvas.getContext("2d");

    let bubbles = [];

    let colors = [
        ["deeppink", "red"],
        ["tomato", "red"],
        ["aquamarine", "lightblue"],
        ["Khaki", "yellow"],
        ["LavenderBlush", "white"]
    ];

    for (let i = 0; i < BUBBLES; i++) {
        let radius = Math.floor(Math.random() * 40) + 20;

        let x = Math.random() * (WIDTH - radius * 2) + radius;
        let y = Math.random() * (HEIGHT - radius * 2) + radius;

        let dir_x = Math.random() / 8;
        let dir_y = Math.random() / 8;

        let ticks = Math.floor((Math.random() * 4000) + 4);
        let color_idx = Math.floor(Math.random() * colors.length );

        bubbles.push(new Bubble(x, y, dir_x, dir_y, colors[color_idx][0], colors[color_idx][1], radius, ticks));
    }

    setInterval(function () {
        animate(context, bubbles);
    }, 10);
}

init();
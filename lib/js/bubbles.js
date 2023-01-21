
const WIDTH = window.innerWidth;
const HEIGHT = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
) - 80;

const BUBBLES = parseInt(HEIGHT / 34);


class Bubble {
    constructor (x, y, color, border, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.border = border;
        this.radius = radius;

        this.generateDirection();
    }

    // Draw the bubble on the canvas
    draw (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius,0,Math.PI * 2,false);

        context.fillStyle = this.color;
        context.strokeStyle = this.border;
        context.strokeWidth = "40";
        context.stroke();

        context.fill();
        context.closePath();

        return this;
    }

    // Update the positions.
    update () {
        // Add the direction to the position.
        this.x += this.dir_x - 0.05;
        this.y += this.dir_y - 0.05;

        // When hitting borders, reverse the directions.
        if (this.x > (WIDTH - this.radius)) {
            this.dir_x = -this.dir_x;
        }
        if (this.y > (HEIGHT - this.radius) ) {
            this.dir_y = -this.dir_y;
        }

        // Attempt to move away by changing directions.
        if (this.y < 50 + this.radius) {
            while (this.dir_y <= 0.05) {
                this.generateDirection();
            }
        }
        if (this.x < 50 + this.radius) {
            while (this.dir_x <= 0.05) {
                this.generateDirection();
            }
        }

        // Update the ticks. When ticks are done, change direction.
        this.ticks--;
        if (this.ticks < 1) {
            this.generateDirection();
        }
    }

    // Generate an amount of ticks to move, and a direction.
    generateDirection () {
        this.ticks = Math.floor(Math.random() * 800);

        this.dir_x = Math.random() / 8;
        this.dir_y = Math.random() / 8;
    }
}

// On page load, this happens.
function init () {
    // Query the canvas and set the width and height.
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

    // Create [BUBBLES] bubbles
    for (let i = 0; i < BUBBLES; i++) {
        // Generate a color, size and starting position for the bubbles.
        let radius = Math.floor(Math.random() * 40) + 20;

        let x = Math.random() * (WIDTH - radius * 2) + radius;
        let y = Math.random() * (HEIGHT - radius * 2) + radius;

        let color_idx = Math.floor(Math.random() * colors.length );

        let bubble = new Bubble(x, y, colors[color_idx][0], colors[color_idx][1], radius);
        bubbles.push(bubble);
    }

    // On interval, draw and update each bubble.
    setInterval(function () {
        context.clearRect(0, 0, WIDTH, HEIGHT);

        bubbles.forEach(bubble => {
            bubble.draw(context).update();
        });
    }, 10);
}

init();
'use strict';

function wrap(x, a, b) {
    let range = b - a;
    let result = x % range;
    if (result < a) result += range;
    if (result > b) result -= range;
    return result;
}
function distance(u, v) {
    return Math.sqrt((u.x - v.x) ** 2 +(u.y - v.y) ** 2);
}

const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let MAX_DISTANCE = 150;
let nodes = [];

class BgNode {
    constructor(i) {
        this.id = i;
        this.x = (Math.random() * 1.5 - 0.25) * canvas.width;
        this.y = (Math.random() * 1.5 - 0.25) * canvas.height;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.adj = [];
    }
    connect() {
        // this.adj = this.adj
        this.adj = this.adj.filter(n => distance(this, n) <= MAX_DISTANCE);
        let nodesToConnect = nodes.filter(() => Math.random() < 0.5);
        nodesToConnect.forEach(n => {
            if (distance(this, n) <= MAX_DISTANCE) {
                this.adj.push(n);
            }
        });
        this.adj = this.adj.filter(
            (obj, index) => this.adj.findIndex(x => x.id === obj.id) === index
          );
    }
    update() {
        this.x = wrap(this.x + this.vx,
            -0.25 * canvas.width,
            1.25 * canvas.width);
        this.y = wrap(this.y + this.vy,
            -0.25 * canvas.width,
            1.25 * canvas.height);
    }
}

function generateNodes() {
    nodes = [];
    for (let i = 0; i < canvas.width / 3; i++) {
        nodes.push(new BgNode(i));
    }
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    generateNodes();
}
resize();

function background() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = ctx.fillStyle = '#303030';
    nodes.forEach(n => {
        n.update();
        n.adj.forEach(m => {
            let d = distance(n, m)
            if (d > MAX_DISTANCE) return;
            ctx.lineWidth = 1.1 * (1 - d / MAX_DISTANCE);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
        });
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, 2 * Math.PI, false);
        ctx.fill();
    });
}

generateNodes();

function backgroundConnect() {
    nodes.forEach(n => n.connect());
}
backgroundConnect();

window.addEventListener('resize', resize);

setInterval(backgroundConnect, 300);
setInterval(background, 1000 / 30);

let idleTime = 0;
let idleThresold = 4000;
window.addEventListener("mousemove", () => {
    idleTime = Date.now()
});
function idleHide() {
    let elements = document.getElementsByClassName("idle-hide");
    for (let item of elements) {
        if (Date.now() - idleTime > idleThresold) {
            item.style.opacity = 0;
        } else {
            item.style.opacity = 1;
        }
    }
    requestAnimationFrame(idleHide);
}
requestAnimationFrame(idleHide);
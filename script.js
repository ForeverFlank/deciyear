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

function decimalYear() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let yearSec = new Date(year, 0, 1).valueOf();
    let dateSec = Date.now();

    let isLeap = new Date(year, 1, 29).getDate() == 29;
    let sec = isLeap ? 31622400000 : 31536000000;

    let decimalYear = year + (dateSec - yearSec) / sec;
    let fraction = decimalYear % 1;
    document.getElementById('decimal-year').innerHTML = decimalYear.toFixed(12);
    document.getElementById('bar-year').style.width = `${fraction * 100}%`;

    document.getElementById('bar-bottom-year').style.width = `${fraction * 100}%`;
    
    let thisMonth = new Date(year, month, 1);
    let nextMonth = new Date(year, month + 1, 1);
    let monthFraction = (dateSec - thisMonth) / (nextMonth - thisMonth);
    document.getElementById('bar-bottom-month').style.width = `${monthFraction * 100}%`;
    
    let dayOfWeek = now.getDay();
    let thisWeek = new Date(year, month, now.getDate() - dayOfWeek);
    let nextWeek = new Date(year, month, now.getDate() + 7 - dayOfWeek);
    let weekFraction = (dateSec - thisWeek) / (nextWeek - thisWeek);
    document.getElementById('bar-bottom-week').style.width = `${weekFraction * 100}%`;
    
    let thisDay = new Date(year, month, now.getDate());
    let nextDay = new Date(year, month, now.getDate() + 1);
    let dayFraction = (dateSec - thisDay) / (nextDay - thisDay);
    document.getElementById('bar-bottom-day').style.width = `${dayFraction * 100}%`;
    
    let thisHour = new Date(year, month, now.getDate(), now.getHours());
    let hourFraction = (dateSec - thisHour) / (60 * 60 * 1000);
    document.getElementById('bar-bottom-hour').style.width = `${hourFraction * 100}%`;

    let thisMinute = new Date(year, month, now.getDate(), now.getHours(), now.getMinutes());
    let minuteFraction = (dateSec - thisMinute) / (60 * 1000);
    document.getElementById('bar-bottom-minute').style.width = `${minuteFraction * 100}%`;

    let thisSecond = new Date(year, month, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    let secondFraction = (dateSec - thisSecond) / (1000);
    document.getElementById('bar-bottom-second').style.width = `${secondFraction * 100}%`;
}

const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let MAX_DISTANCE = 100;
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
    for (let i = 0; i < 200 * canvas.width / 400; i++) {
        nodes.push(new BgNode(i));
    }
}

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight * 0.95;
    generateNodes();
}
resize();

function background() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = ctx.fillStyle = '#242424';
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

setInterval(decimalYear, 1000 / 60);
setInterval(backgroundConnect, 300);
setInterval(background, 1000 / 30);
'use strict';

let digits = 3;

function truncateFloor(num, d) {
    let mult = 1;
    for (let i = 0; i < d; ++i) {
        mult *= 10;
    }
    num *= mult;
    num = Math.floor(num);
    num /= mult;
    return num.toFixed(d);
}

function decimalTime() {
    let tr = (num) => truncateFloor(num, digits);

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let yearSec = new Date(year, 0, 1).valueOf();
    let dateSec = Date.now();

    let isLeap = new Date(year, 1, 29).getDate() == 29;
    let sec = isLeap ? 31622400000 : 31536000000;

    let decimalYear = year + (dateSec - yearSec) / sec;
    let fraction = decimalYear % 1;

    document.getElementById('bar-bottom-year').style.width = `${fraction * 100}%`;
    document.getElementById('p-year').innerText = tr(decimalYear);
    
    let thisMonth = new Date(year, month, 1);
    let nextMonth = new Date(year, month + 1, 1);
    let monthFraction = (dateSec - thisMonth) / (nextMonth - thisMonth);
    document.getElementById('bar-bottom-month').style.width = `${monthFraction * 100}%`;
    document.getElementById('p-month').innerText = tr(month + monthFraction);
    
    let thisDay = new Date(year, month, day);
    let nextDay = new Date(year, month, day + 1);
    let dayFraction = (dateSec - thisDay) / (nextDay - thisDay);
    document.getElementById('bar-bottom-day').style.width = `${dayFraction * 100}%`;
    document.getElementById('p-day').innerText = tr(day + dayFraction);
    
    let thisHours = new Date(year, month, day, hours);
    let hoursFraction = (dateSec - thisHours) / (60 * 60 * 1000);
    document.getElementById('bar-bottom-hours').style.width = `${hoursFraction * 100}%`;
    document.getElementById('p-hours').innerText = tr(hours + hoursFraction);

    let thisMinutes = new Date(year, month, day, hours, minutes);
    let minutesFraction = (dateSec - thisMinutes) / (60 * 1000);
    document.getElementById('bar-bottom-minutes').style.width = `${minutesFraction * 100}%`;
    document.getElementById('p-minutes').innerText = tr(minutes + minutesFraction);

    let thisSeconds = new Date(year, month, day, hours, minutes, seconds);
    let secondsFraction = (dateSec - thisSeconds) / (1000);
    document.getElementById('bar-bottom-seconds').style.width = `${secondsFraction * 100}%`;
    document.getElementById('p-seconds').innerText = tr(seconds + secondsFraction);
}

function decimalTimeLoop() {
    decimalTime();
    requestAnimationFrame(decimalTimeLoop);
}
requestAnimationFrame(decimalTimeLoop);

// setInterval(decimalTime, 1000 / 60);
'use strict';

function decimalYear() {
    let now = new Date();
    let year = now.getFullYear();
    let yearSec = new Date(year, 0, 1).valueOf();
    let dateSec = Date.now();

    let isLeap = new Date(year, 1, 29).getDate() == 29;
    let sec = isLeap ? 31622400000 : 31536000000;

    let decimalYear = year + (dateSec - yearSec) / sec;
    let fraction = decimalYear % 1;
    document.getElementById('decimal-year').innerHTML = decimalYear.toFixed(12);
    document.getElementById('bar-year').style.width = `${fraction * 100}%`;
}

function decimalYearLoop() {
    decimalYear();
    requestAnimationFrame(decimalYearLoop);
}
requestAnimationFrame(decimalYearLoop);

// setInterval(decimalTime, 1000 / 60);
'use strict';

let digits = 3;

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
    
    let thisDay = new Date(year, month, now.getDate());
    let nextDay = new Date(year, month, now.getDate() + 1);
    let dayFraction = (dateSec - thisDay) / (nextDay - thisDay);
    document.getElementById('bar-bottom-day').style.width = `${dayFraction * 100}%`;
    
    let thisHours = new Date(year, month, now.getDate(), now.getHours());
    let hourFraction = (dateSec - thisHours) / (60 * 60 * 1000);
    document.getElementById('bar-bottom-hour').style.width = `${hourFraction * 100}%`;

    let thisMinutes = new Date(year, month, now.getDate(), now.getHours(), now.getMinutes());
    let minuteFraction = (dateSec - thisMinutes) / (60 * 1000);
    document.getElementById('bar-bottom-minute').style.width = `${minuteFraction * 100}%`;

    let thisSeconds = new Date(year, month, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    let secondFraction = (dateSec - thisSeconds) / (1000);
    document.getElementById('bar-bottom-second').style.width = `${secondFraction * 100}%`;
}

function decimalTime() {
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
    document.getElementById('p-year').innerText = `${decimalYear.toFixed(digits)}`;
    
    let thisMonth = new Date(year, month, 1);
    let nextMonth = new Date(year, month + 1, 1);
    let monthFraction = (dateSec - thisMonth) / (nextMonth - thisMonth);
    document.getElementById('bar-bottom-month').style.width = `${monthFraction * 100}%`;
    document.getElementById('p-month').innerText =
        `${(month + monthFraction).toFixed(digits)}`;
    
    let thisDay = new Date(year, month, day);
    let nextDay = new Date(year, month, day + 1);
    let dayFraction = (dateSec - thisDay) / (nextDay - thisDay);
    document.getElementById('bar-bottom-day').style.width = `${dayFraction * 100}%`;
    document.getElementById('p-day').innerText =
        `${(day + dayFraction).toFixed(digits)}`;
    
    let thisHours = new Date(year, month, day, hours);
    let hoursFraction = (dateSec - thisHours) / (60 * 60 * 1000);
    document.getElementById('bar-bottom-hours').style.width = `${hoursFraction * 100}%`;
    document.getElementById('p-hours').innerText =
        `${(hours + hoursFraction).toFixed(digits)}`;

    let thisMinutes = new Date(year, month, day, hours, minutes);
    let minutesFraction = (dateSec - thisMinutes) / (60 * 1000);
    document.getElementById('bar-bottom-minutes').style.width = `${minutesFraction * 100}%`;
    document.getElementById('p-minutes').innerText =
        `${(minutes + minutesFraction).toFixed(digits)}`;

    let thisSeconds = new Date(year, month, day, hours, minutes, seconds);
    let secondsFraction = (dateSec - thisSeconds) / (1000);
    document.getElementById('bar-bottom-seconds').style.width = `${secondsFraction * 100}%`;
    document.getElementById('p-seconds').innerText =
        `${(seconds + secondsFraction).toFixed(digits)}`;
}

function decimalTimeLoop() {
    decimalTime();
    requestAnimationFrame(decimalTimeLoop);
}
requestAnimationFrame(decimalTimeLoop);

// setInterval(decimalTime, 1000 / 60);
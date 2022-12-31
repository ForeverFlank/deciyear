function get_decimal_year()
{
    // year and secs info
    var year = new Date().getFullYear();            // get year
    var year_sec = new Date(year, 0, 1).valueOf();  // get secs at year-01-01
    var date_now = Date.now();                      // get current time

    // leap check
    var leap = new Date(year, 1, 29).getDate() === 29;
    var sec;
    if (leap)
    sec = 31622400000;
    else
    sec = 31536000000;
    
    var dec = year + (date_now - year_sec) / sec;   // decimal year
    document.getElementById("decimal_year").innerHTML = dec.toFixed(12);
    setTimeout('get_decimal_year()', 10);
}

get_decimal_year()
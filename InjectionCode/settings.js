($(document).ready(function () {
    $('#main').append("<p><input type='text' id='api_key' placeholder='API- key' /></p>");
    $('#main').append("<button id='start'>Запустить</button>");
    $('#main').append("<button id='stop' disabled='true' style='display: none;'>Остановить</button>");
    $('#main').append("<p class='countdownGroup' style='display: none;'><span class='countdownTimer'></span></p>");
    $('#main').append("<p class='error'></p >")
}));
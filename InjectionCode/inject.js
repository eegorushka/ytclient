(function () {
    if (!$('#main').length) {
        var div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.bottom = 0;
        div.style.right = 0;
        document.body.appendChild(div);
        div.setAttribute('id', "main");

        $('#main').append("<p><input type='text' id='api_key' placeholder='API- key' /></p>");
        $('#main').append("<button id='start'></button>");
        $('#main').append("<button id='stop'></button>");
        $('#main').append("<p class='countdownGroup' style='display: none;'><span class='countdownTimer'></span></p>");
        $('#main').append("<p class='error'></p >")
    }
})();

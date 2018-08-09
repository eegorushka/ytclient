(function () {
    if (!$('#main').length) {
        var div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.bottom = '10px';
        div.style.right = '10px';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.background = '#f7f7f7';
        document.body.appendChild(div);
        div.setAttribute('id', "main");


        $('#main').append("<p><input type='text' id='api_key' placeholder='API- key' /></p>");
        $('#main').append("<button id='start'></button>");
        $('#main').append("<button id='stop'></button>");
        $('#main').append("<p class='countdownGroup'><span class='countdownTimer'>&nbsp;</span></p>");
        $('#main').append("<p class='error'></p >")
    }
})();

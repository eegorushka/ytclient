($(document).ready(function () {
    $('#start').text('Запустить');
    $('#stop').text('Остановить');
    $('#stop').hide();
    var api_key = getCookie('api_key');
    $('#api_key').val(api_key);
}));
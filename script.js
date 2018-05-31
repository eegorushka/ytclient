var url = 'https://ytuber.ru/api/Task/getWork/1?api_key=';

var countdownInterval;

function countdown(time){
    $(".countdownGroup").show();

    countdownInterval = setInterval(function () {
        time = time-1000;
        seconds = time/1000;
        $(".countdownTimer").text(seconds);

    }, 1000);
}


function openVideo(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            if (!data["error"]) {
                var youtubeUrl = data["url"];
                var time = Number(data["extend"]["time"]) * 1000;

                // получение текущей вкладки
                chrome.tabs.query({ active: true }, function (tab) {

                    // обновление URL вкладки 
                    chrome.tabs.update(tab.id, {url: youtubeUrl}, function (tab) {

                        // обратный отсчет
                        countdown(time);

                        // смена видео по истечении времени (рекурсия)
                        setTimeout(function () {

                            // отключение обратного отсчета
                            clearInterval(countdownInterval);
                            $(".countdownGroup").hide();

                            openVideo(url);
                        }, time);

                    });
                });
            }
            else {
                $('p.error').html('Указан некорректный API-ключ');
                $('#start').attr("disabled", false);
                //console.log("Неверно введен ключ");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        dataType: "json"
    });
}
$(function () {

    api_key = getCookie(1)[1];
    $('#api_key').val(api_key);

    $('#start').on('click', function () {
        // очищаем строку ошибок
        $('p.error').html('');

        $('#start').attr("disabled", true);
        //$('#stop').attr("disabled", false);

        var api_key = $('#api_key').val();
        setCookie("api_key", api_key);
        openVideo(url+api_key);
    });
});
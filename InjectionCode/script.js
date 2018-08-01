var url = 'https://ytuber.ru/api/Task/getWork/1?api_key=';

var countdownInterval;

function countdown(time){
    $(".countdownGroup").show();

    countdownInterval = setInterval(function () {
        console.log(time);
        time = time-1000;
        seconds = time/1000;
        $(".countdownTimer").text(seconds);

    }, 1000);
}

function openVideo(fullUrl) {
    $.ajax({
        type: "GET",
        url: fullUrl,
        success: function (data) {
            if (!data["error"]) {
                var youtubeUrl = data["url"];
                var time = Number(data["extend"]["time"]) * 1000;

                location.replace(youtubeUrl);

                chrome.storage.sync.set({ 'time': time });
            }
            else {
                $('p.error').html('Указан некорректный API-ключ');
                $('#start').attr("disabled", false);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        dataType: "json"
    });
}

function injectedCodeWorks() {

    chrome.storage.sync.get(['time'], function (result) {
        var time = result.time;

        if (time) {
            continuation(time);
        }
        else {
            start();
        }
    });
}

function start() {
    $('#start').on('click', function () {
        $('p.error').html('');

        var api_key = $('#api_key').val();
        setCookie("api_key", api_key);

        var fullUrl = url + api_key;

        openVideo(fullUrl);

    });
}

function continuation(time) {
    $('#start').hide();
    $('#stop').show();

    var api_key = getCookie("api_key");

    var fullUrl = url + api_key;

    $('#api_key').attr("disabled", true);
    countdown(time);
    // смена видео по истечении времени
    setTimeout(function () {

        // отключение обратного отсчета
        clearInterval(countdownInterval);
        $(".countdownGroup").hide();

        openVideo(fullUrl);
    }, time);
}

function stop() {
    chrome.storage.sync.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}
$(function () {
    $('#stop').on('click', function () {
        stop();
        $('#start').show();
        $('#stop').hide();
        $('#api_key').attr("disabled", false);
    });
    injectedCodeWorks();
});
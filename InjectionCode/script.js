var url = 'https://ytuber.ru/api/Task/getWork/1?api_key=';

var countdownInterval;

function countdown(time) {
    clearInterval(countdownInterval);

    countdownInterval = setInterval(function () {
        console.log(time);
        time = time-1000;
        seconds = time/1000;
        $(".countdownTimer").text(seconds);

    }, 1000);
}


function stopTimer() {
    clearInterval(countdownInterval);
    $(".countdownTimer").text('');
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

                chrome.storage.sync.set({ 'time': time, 'youtubeUrl': youtubeUrl});
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

    chrome.storage.sync.get(['time', 'youtubeUrl'], function (result) {
        var time = result.time;
        var youtubeUrl = result.youtubeUrl;

        if (time && youtubeUrl) {
            var currentUrl = location.href;

            if (currentUrl == youtubeUrl) {
                continuation(time);
            }
            else {
                stop();
            }
        }
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

        openVideo(fullUrl);
    }, time);
}

function removeFromStorage() {
    chrome.storage.sync.remove(['time', 'youtubeUrl'], function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}

function stop() {
    removeFromStorage();
    stopTimer();
    $('#start').show();
    $('#stop').hide();
    $('#api_key').attr("disabled", false);
    $('#api_key').attr("disabled", false);
}

$(function () {
    $('#stop').on('click', function () {
        stop();
    });
    $('#start').on('click', function () {
        $('p.error').html('');

        var api_key = $('#api_key').val();
        setCookie("api_key", api_key);

        var fullUrl = url + api_key;

        openVideo(fullUrl);

    });
    $("video").on("pause", function (e) {
    });

    $("video").on("start", function (e) {
    });
    injectedCodeWorks();
});
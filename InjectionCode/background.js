chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var url = tabs[0].url;
        var youtubeHost = /www.youtube.com/;
        if (url.match(youtubeHost)) {
            loadFile(tabs[0].id);
        };
    });
});

function loadFile(tabId) {
    chrome.tabs.executeScript(tabId, { file: "jquery-3.1.1.js" }, function () {
        chrome.tabs.executeScript(tabId, { file: "inject.js" }, function () {
            chrome.tabs.executeScript(tabId, { file: "settings.js" }, function () {
                chrome.tabs.executeScript(tabId, { file: "cookieHelper.js" }, function () {
                    chrome.tabs.executeScript(tabId, { file: "script.js" });
                });
            });
        });
    });
};

function checkHost(currentHost) {
    var youtubeHost = "www.youtube.com";

    return youtubeHost == currentHost;
}


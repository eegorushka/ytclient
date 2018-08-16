chrome.tabs.onUpdated.addListener(function () {
    chrome.tabs.query({ 'url': 'https://*.youtube.com/*' }, function (tabs) {
        if (tabs.length == 1) {
            loadFile(tabs[0].id);
        }
    })
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


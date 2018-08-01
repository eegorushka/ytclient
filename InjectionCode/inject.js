// this is the code which will be injected into a given page...
(function () {
    if (!$('#main').length) {
        var div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.bottom = 0;
        div.style.right = 0;
        document.body.appendChild(div);
        div.setAttribute('id', "main");
    }
})();

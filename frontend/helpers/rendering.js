'use-strict'
//fetches an html template, interpolates it with data an adds it to the DOM
var templateRender = (function (pName,data) {
    function getPartial(pName,data) {
        var request = new XMLHttpRequest();
        request.open('get', '/partials/' + pName, true);
        request.onload = function (e) {
            var html = interpolate(request.response, data);
            var el = document.createElement('div');
            el.innerHTML = html;
            document.body.appendChild(el);
        };
        request.onerror = function (e) {
            console.error(e);
        };
        request.send();
    }
    function interpolate(str,data) {
        var changed = (/{{(\w*)}}/).exec(str);
        while (changed !== null) {
            str = str.replace(changed[0], data[changed[1]] || '');
            changed = (/{{(\w*)}}/).exec(str);
        }
        return str;
    }
    return getPartial;
})();


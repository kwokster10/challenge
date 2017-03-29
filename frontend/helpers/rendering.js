'use-strict'
//fetches an html template, interpolates it with data an adds it to the DOM
var templateRender = (function () {
    function getPartial(pName,parent,data, cb) {
        var request = new XMLHttpRequest();
        request.open('get', '/partials/' + pName, true);
        request.onload = function (e) {
            var html;
            if (data)
                html = interpolate(request.response, data);
            else
                html = request.response;
            var el = document.createElement('div');
            el.innerHTML = html;
            document.getElementById(parent).appendChild(el);
            if (cb) cb();
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


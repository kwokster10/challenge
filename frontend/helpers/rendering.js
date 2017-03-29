
//fetches an html template, interpolates it with data an adds it to the DOM
(function () {
    return function (modules) {
        function getPartial(pName, parent, data, cb) {
            var request = new XMLHttpRequest();
            request.open('get', '/partials/' + pName, true);
            request.onload = function (e) {
                var html;
                if (data)
                    html = interpolate(request.response, data);
                else
                    html = request.response;
                appendChild(html,parent,'div');
                if (cb) cb(html);
            };
            request.onerror = function (e) {
                console.error(e);
            };
            request.send();
        }
        function interpolate(str, data) {
            var changed = (/{{(\w*)}}/).exec(str);
            while (changed !== null) {
                str = str.replace(changed[0], data[changed[1]] || '');
                changed = (/{{(\w*)}}/).exec(str);
            }
            return str;
        }
        function appendChild(html, parent, type) {
            var el = document.createElement(type);
            el.innerHTML = html;
            if (parent)
                document.getElementById(parent).appendChild(el);
            return el;
        }
        modules.render = getPartial;
        modules.interpolate = interpolate;
        modules.appendChild = appendChild;
    }

})();


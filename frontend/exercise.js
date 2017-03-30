document.addEventListener('DOMContentLoaded', function () {

    //bootleg script loader
    function loadScripts(scripts, cb) {
        var counter = scripts.length - 1;
        var modules = {};
        while (counter >= 0) {
            var request = new XMLHttpRequest();
            request.open('get', '/' + scripts[counter], false);
            request.send();
            var content = request.response;
            eval(content)(modules);//register the function as 'module'
            counter--;
        }
        cb(modules);
    }
    loadScripts([
        'csUtils.js',
        'helpers/rendering.js',
        'behaviors/table.js'
    ], function (modules) {
        //external functions are now available as encapsulated 'modules', no globals!
        modules.render('main.html', 'app', null, function () {
            //register behaviors
            modules.tableBehavior(document.getElementById('contents'));
            
        });
    });
});
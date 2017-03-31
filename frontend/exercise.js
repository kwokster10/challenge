document.addEventListener('DOMContentLoaded', function () {

    //bootleg script loader
    //TODO: refactor to use async loading
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
        'helpers/filters.js',
        'helpers/loader.js',
        'behaviors/table.js',
        'behaviors/button.js'
    ], function (modules) {
        //external functions are now available as encapsulated 'modules', no globals!
        var thisDate = modules.converters.toLongDate(new Date(Date.now()));
        modules.render('main.html', 'app',{thisDate: thisDate} , function () {
            //register behaviors
            modules.tableBehavior(document.getElementById('contents'));
            modules.buttonBehavior(document.getElementById('filter-btn'));
            //We can scale by attaching additional behavior scripts to dom elements
            
        });
    });
});
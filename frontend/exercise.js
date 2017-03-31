document.addEventListener('DOMContentLoaded', function () {

    //bootleg script loader
    function loadScripts(scripts, cb) {
        var request = new XMLHttpRequest();
        var modules = {};
        makeRequest();
        request.onload = function(){
            var content = request.response;
            eval(content)(modules);//register the function as 'module'
            if (scripts.length)
                makeRequest();
            else
                cb(modules);
        }
        request.onerror = function(e){
            console.error(e);
        }
        function makeRequest(){
            var script = scripts.pop();
            request.open('get', '/' + script, true);
            request.send();
        }
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
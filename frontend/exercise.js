document.addEventListener('DOMContentLoaded', function () {

    //bootleg script loader
    function loadScripts(scripts, cb) {
        var counter = scripts.length - 1;
        var modules = {};
        while (counter >= 0) {
            var request = new XMLHttpRequest();
            request.open('get', '/' + scripts[counter],false);
            request.send();
            var content = request.response;
            eval(content)(modules);//register the function as 'module'
            counter--;
        }
        cb(modules);
    }
    loadScripts(['csUtils.js', 'helpers/rendering.js'], function (modules) {
        //external functions are now available as encapsulated 'modules', no globals!
        modules.render('main.html', 'app', null, function () {
            var table = document.getElementsByTagName('table')[0];
            var rows = null;
            var expandedRow = null;
            
            function rowClicked(){
                var clickedEl = this;
                var idx = Array.prototype.indexOf.call(rows,clickedEl);
                if (expandedRow){
                    table.deleteRow(expandedRow);
                }
                if (expandedRow !== idx + 1){
                    var html = 'Test'
                    expandedRow = idx + 1;
                    insertRow(expandedRow,html);
                }
            }
            function insertRow(index,rowHtml){
                var row = table.insertRow(index);
                var cell = row.insertCell(0);
                cell.innerText = rowHtml;
            }
            function refreshData(data){
                modules.render('row-partial.html', null, null, function(template){
                    var table = document.getElementsByTagName('table')[0];
                    for(var i in data){
                        var interpolated = modules.interpolate(template, data[i]);
                        var el = modules.appendChild(interpolated,'contents','tr');
                        el.addEventListener('click', rowClicked);
                    }
                })
            }
            //get the contents
            modules.api.getData(function(data){
                refreshData(data);
                rows = document.getElementsByTagName('tr');
            });
        });
    });
});
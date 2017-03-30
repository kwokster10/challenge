(function () {
    return function (modules) {
        modules.tableBehavior = function (table) {
            var rows = null;
            var expandedRow = null;
            var expandedTemplate;
            var cached;

            function rowClicked() {
                var clickedEl = this;
                var idx = Array.prototype.indexOf.call(rows, clickedEl);
                //console.log('idx:',idx,'expanded:', expandedRow);
                if (expandedRow === idx) { //check if row clicked is already expanded
                    deleteRow(expandedRow);
                    expandedRow = null;
                } else if (expandedRow === null)  {//if nothing's expanded
                    expandedRow = idx;
                    var html = modules.interpolate(expandedTemplate);
                    insertRow(expandedRow, html);
                } else if (expandedRow !== null && expandedRow !== idx){//if something other than the click target was expanded
                    deleteRow(expandedRow);
                    var html = modules.interpolate(expandedTemplate);
                    var mod = expandedRow < idx ? -1: 0;
                    expandedRow = !idx ? idx : idx + mod;
                    insertRow(expandedRow, html);
                }
            }
            function deleteRow(idx) {
                table.deleteRow(idx);
                captureRows();
            }
            function insertRow(index, rowHtml) {
                var row = table.insertRow(index);
                var cell = row.insertCell(0);
                cell.setAttribute('colspan','2');
                cell.innerHTML = rowHtml;
                captureRows();
            }
            function refreshData(data) {
                modules.render('row-partial.html', null, null, function (template) {
                    for (var i in data) {
                        var interpolated = modules.interpolate(template, data[i]);
                        var el = modules.appendChild(interpolated, 'contents', 'tr');
                        el.addEventListener('click', rowClicked);
                    }
                })
            }
            function captureRows(){
                rows = document.getElementsByTagName('tr');
            }
            //get the contents of the table
            modules.render('expanded-partial.html', null,null, function(template){
                expandedTemplate = template;
                modules.api.getData(function (data) {
                    cached = data.slice(0,30);
                    refreshData(cached);
                    captureRows();
                });
            });
            
        }
    }

})();
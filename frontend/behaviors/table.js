(function () {
    return function (modules) {
        modules.tableBehavior = function (table) {
            var rows = null;
            var expandedRow = null;
            var selectedRow = null;
            var expandedTemplate;
            var cached;

            function rowClicked() {
                var clickedEl = this;
                var idx = getElementIdx(clickedEl);
                if (expandedRow === idx) { //check if row clicked is already expanded
                    deleteRow(expandedRow);
                    expandedRow = null;
                } else if (expandedRow === null) {//if nothing's expanded
                    expandedRow = idx;
                    insertRow(expandedRow, clickedEl);
                } else if (expandedRow !== null && expandedRow !== idx) {//if something other than the click target was expanded
                    deleteRow(expandedRow);
                    var mod = expandedRow < idx ? -1 : 0;
                    expandedRow = !idx ? idx : idx + mod;
                    insertRow(expandedRow, clickedEl);
                }
            }
            function getElementIdx(el){
                return Array.prototype.indexOf.call(rows, el);
            }
            function toggleSelectedRow(el,idx){
                if (idx === selectedRow){
                    el.classList.remove('info');
                    selectedRow = null;
                }else{
                    if (selectedRow !== null)
                        rows[selectedRow].classList.remove('info');
                    el.classList.add('info');
                    selectedRow = idx;
                }
            }
            function deleteRow(idx) {
                table.deleteRow(idx);
                captureRows();
                rows[selectedRow].classList.remove('info');
            }
            function insertRow(index, el) {
                el.classList.add('info');
                selectedRow = index;
                var data = el.children[2].dataset; //grabbing the data from the hidden td
                var rowHtml = modules.interpolate(expandedTemplate, data);
                var row = table.insertRow(index);
                var cell = row.insertCell(0);
                cell.setAttribute('colspan', '2');
                cell.innerHTML = rowHtml;
                captureRows();
            }
            function refreshData(data) {
                modules.render('row-partial.html', null, null, function (template) {
                    for (var i in data) {
                        var interpolated = modules.interpolate(template, data[i]);
                        var el = modules.appendChild(interpolated, 'contents', 'tr');
                        if (data[i].isExpired)
                            el.setAttribute('class', 'expired');
                        el.addEventListener('click', rowClicked);
                    }
                })
            }
            function captureRows() {
                rows = document.getElementsByTagName('tr');
            }
            //get the contents of the table
            modules.render('expanded-partial.html', null, null, function (template) {
                expandedTemplate = template;
                var filters = modules.filters;
                var converters = modules.converters;
                ///getting the data from the api
                modules.api.getData(function (data) {
                    //transforming the data to specifications
                    cached = filters.limit(
                        filters.sort(
                            converters.toDate(data, 'expiration_date'), '_expiration_date'),
                        30);
                    //check to see which records are expired
                    var currentDate = Date.now();
                    cached = converters.addProp(cached, 'isExpired', function(item){
                        return item._expiration_date < currentDate;
                    });
                    refreshData(cached);
                    captureRows();
                });
            });
        }
    }

})();
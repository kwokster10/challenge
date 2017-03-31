(function(){
    return function(modules){
        var filters = {
            limit:function(arr,len){
                return arr.slice(0,len);
            },
            sort:function(arr, key){
                return arr.sort(function(a,b){
                    return a[key] - b[key];
                });
            },
            filter:function(arr, filterFn){
                return arr.filter(function(item){
                    return filterFn(item);
                });
            }
        };
        var converters = {
            toUtcDate:function(date){
                return new Date(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate());
            },
            toDate:function(arr,key){
                var self = this;
                return arr.map(function(item){
                    var newKey = '_' + key;
                    var date = self.toUtcDate(new Date(item[key]));//convert to utc, strip out time
                    item[newKey] = date;
                    return item;
                });
            },
            addProp:function(arr,propName, testFn){ //generic function to derive a new prop from existing
                return arr.map(function(item){
                    item[propName] = testFn(item);
                    return item;
                });
            }
        }
        modules.filters = filters;
        modules.converters = converters;
    }
})();
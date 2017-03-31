(function(){
    return function(modules){
        modules.loader = function(parent,fn){
            var elem;
            modules.render('loading.html', parent, null, function(){
                elem = document.getElementsByClassName('spinner')[0];
                fn(function(){
                    elem.remove();
                });
            });
        }
    }
})();
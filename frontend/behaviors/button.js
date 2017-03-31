(function(){
    return function(modules){
        modules.buttonBehavior = function(button){
            var rows = document.getElementById('contents').children;
            var noneMsg = document.getElementById('if-none');
            var buttonToggled = false;
            var today = modules.converters.toUtcDate(new Date(Date.now()));

            button.addEventListener('click',function(){
                var btn = this;  
                 Array.prototype.forEach.call(rows,function(el){
                    if (!buttonToggled){
                        btn.classList.add('active');
                        if (!checkDate(el))
                            el.setAttribute('hidden', true);
                    }else{
                        el.removeAttribute('hidden');
                        btn.classList.remove('active');
                    }
                });
                buttonToggled = !buttonToggled;
                var noRows = checkIfNone();
                if (noRows)
                    noneMsg.removeAttribute('hidden');
                else if (!noRows && !noneMsg.hasAttribute('hidden'))
                    noneMsg.setAttribute('hidden',true);


            });
            function checkDate(el){
                var elDate = el.children[2].dataset['expirationDate'];
                var date = modules.converters.toUtcDate(new Date(elDate));
                return date === today;
            }
            function checkIfNone(){
                return Array.prototype.every.call(rows, function(row){
                    return row.hasAttribute('hidden');
                });
            } 
        }
    }
})();
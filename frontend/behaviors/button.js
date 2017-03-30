(function(){
    return function(modules){
        modules.buttonBehavior = function(button){
            var rows = document.getElementById('contents').children;
            var buttonToggled = false;
            var today = Date.now();

            button.addEventListener('click',function(){
                var btn = this;  
                 Array.prototype.forEach.call(rows,function(el){
                    if (!buttonToggled){
                        el.setAttribute('hidden', true);
                        btn.classList.add('active');
                    }else{
                        el.removeAttribute('hidden');
                        btn.classList.remove('active');
                    }
                });
                buttonToggled = !buttonToggled;
            });
        }
    }
})();
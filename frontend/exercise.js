document.addEventListener('DOMContentLoaded', function(){
    templateRender('main.html', 'app',null,function(){
        //get the contents
        csApi.getData(function(res){
            console.log(res);
        })
    });
});
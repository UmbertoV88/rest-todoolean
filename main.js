$(document).ready(function() {
    // faccio la chiamata ajax per prendere i dati della Lista
    $.ajax({
        url:"http://157.230.17.132:3022/todos",
        method: "GET",
        success: function(data){
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
                var testo_todo = data[i].text;
                console.log(testo_todo);
            }
        },
        error:function(){
            alert("ERRORE")
        }
    });
});

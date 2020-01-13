$(document).ready(function() {
    stampa_todos();
    // intercetto il click sul bottone per aggiungere una nuova nota dall'input text
    // SOLUZIONE A (SENZA CHIAMATA AJAX)

    /*$("#todo-button").click(function(){
        var newNote = $("#todo-input").val();
        $("#todo-list").append("<li>" + newNote + "</li>");
        $("#todo-input").val(" ");
    })*/

    // SOLUZIONE B (ESEGUO UNA CHIAMATA AJAX CON POST)
    $("#todo-button").click(function(){
    // leggo cosa ha inserito l'utente nell'input
    var newNote = $("#todo-input").val();
    // svuoto dal testo l'input
    $("#todo-input").val(" ");

    creo_todo(newNote);

    });

    function stampa_todos(){
        // svuoto la lista prima di riempirla nuovamente, altrimenti me la stampa piu volte
        $("#todo-list").empty();
        // faccio la chiamata ajax per prendere i dati della Lista
        $.ajax({
            url:"http://157.230.17.132:3022/todos/",
            method: "GET",
            success: function(data){
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    var testo_todo = data[i].text;
                    var id_todo = data[i].id;
                     $("#todo-list").append('<li data-todo_id="' + id_todo + '">' + testo_todo + "</li>");
                }
            },
            error:function(){
                alert("ERRORE")
            }
        });
    };

    function creo_todo(newNote){
        // eseguo una chiamata Ajax con method POST per memorizzare la nota inserita dall'utente
        $.ajax({
            url:"http://157.230.17.132:3022/todos/",
            method: "POST",
            data: {
                text: newNote
            },
            success: function(data){
                stampa_todos()
            },
            error:function(){
                alert("ERRORE")
            }
        });
    };
});
